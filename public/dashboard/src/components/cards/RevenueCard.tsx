import { sub } from "date-fns";
import { isWithinInterval } from "date-fns/esm";
import React from "react";
import { Rental } from "../../@types/db-entities";
import StatCard from "./StatCard";
import { getPercentDiff } from "../employees/fillMissingMissing";
import _ from "lodash";
import { Text, HStack } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

type GroupsByInterval = {
  [key: string]: {
    interval?:
      | {
          start: Date;
          end: Date;
        }
      | undefined;
    rentals: Rental[];
  }[];
};

type RevenuesByInterval = {
  [key: string]: number[];
};

function groupRentalsByInterval(
  rentals: Rental[],
  period: Duration,
  howMany: number = 2
): { interval?: { start: Date; end: Date }; rentals: Rental[] }[] {
  if (_.isEqual(period, {})) {
    return [{ rentals: rentals }];
  }

  let groups: { interval: { start: Date; end: Date }; rentals: Rental[] }[] =
    [];

  const now = new Date();
  let latest = now;
  let earliest = sub(now, period);

  for (let i = 0; i < howMany; i++) {
    let interval = { start: earliest, end: latest };
    let groupedRentals = rentals.filter((rental) =>
      isWithinInterval(new Date(rental.endDate), interval)
    );
    groups.push({ interval: interval, rentals: groupedRentals });

    latest = earliest;
    earliest = sub(earliest, period);
  }

  console.log(groups);
  return groups;
}

function RevenueCard({ rentals }: { rentals: Rental[] }) {
  const periods = {
    all: {},
    "last year": { years: 1 },
    "last 6 months": { months: 6 },
    "last 30 days": { days: 30 },
    "last week": { days: 7 },
  } as { [key: string]: Duration };

  const revenuesByInterval = {} as RevenuesByInterval;
  const groupsByInterval = {} as GroupsByInterval;

  for (let key of Object.keys(periods)) {
    groupsByInterval[key] = groupRentalsByInterval(rentals, periods[key]);
    revenuesByInterval[key] = groupsByInterval[key].map((group) =>
      group.rentals.reduce((revenue, curr) => revenue + curr.finalPrice, 0)
    );
  }

  const values = Object.fromEntries(
    Object.keys(periods).map((key) => {
      return [
        key,
        {
          value: revenuesByInterval[key][0],
          helper:
          getPercentHelper(
              revenuesByInterval[key][1],
              revenuesByInterval[key][0]
            ),
        },
      ];
    })
  );

  function getPercentHelper(a: number, b: number) {
    if (!a || !b) {
      return <></>;
    }
    const diff = getPercentDiff(a, b);

    let arrow;
    if (diff >= 0) {
        arrow = <ArrowUpIcon color="green" />
    } else {
        arrow = <ArrowDownIcon color="red" />;
    }
      return (
          <HStack >
              {arrow} 
              <Text>{diff.toFixed(2).toString() + "%"}</Text>

          </HStack>

      );
    }


  console.log(groupsByInterval);
  console.log(revenuesByInterval);

  return (
    <StatCard label="Revenue" options={Object.keys(periods)} data={values} />
  );
}

export default RevenueCard;
