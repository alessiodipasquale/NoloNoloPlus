import { maxTime, minTime, sub } from "date-fns";
import { isWithinInterval } from "date-fns/esm";
import React from "react";
import { Rental, Rental as T } from "../../@types/db-entities";
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
    rentals: T[];
  }[];
};

type RevenuesByInterval = {
  [key: string]: number[];
};

function groupByInterval<T>(
  things: T[],
  dates: Date[],
  period: Duration,
  howMany: number = 2
) {
  if (_.isEqual(period, {})) {
    return new Map<Interval, T[]>([[{ start: minTime, end: maxTime }, things]]);
  }

  let groupedByInterval = new Map<Interval, T[]>();

  let latest = new Date();
  let earliest = sub(latest, period);

  for (let i = 0; i < howMany; i++) {
    let interval = { start: earliest, end: latest };
    console.log(things)
    let groups = things.filter((thing, index) =>
      isWithinInterval(dates[index], interval)
    );
    console.log(interval)
    console.log(groups)
    groupedByInterval.set(interval, groups);

    latest = earliest;
    earliest = sub(earliest, period);
  }
  console.log(groupedByInterval);
  return groupedByInterval;
}

function groupRentalsByInterval(rentals: Rental[], period: Duration) {
  return groupByInterval(
    rentals,
    rentals.map((rental) => new Date(rental.endDate)),
    period
  );
}

function RevenueCard({ rentals }: { rentals: Rental[] }) {
  const periods = {
    all: {},
    "last year": { years: 1 },
    "last 6 months": { months: 6 },
    "last 30 days": { days: 30 },
    "last week": { days: 7 },
  } as { [key: string]: Duration };

  const revenuesByInterval = {} as { [key: string]: number[] };
  const groupsByInterval = {} as { [key: string]: Map<Interval, Rental[]> };

  for (let key of Object.keys(periods)) {
    groupsByInterval[key] = groupRentalsByInterval(rentals, periods[key]);
    console.log(groupsByInterval[key])
    console.log(Array.from(groupsByInterval[key]))
    revenuesByInterval[key] = Array.from(groupsByInterval[key]).map(
      ([_, rentals]) => rentals.reduce((tot, curr) => tot + curr.finalPrice, 0)
    );
  }

  const values = Object.fromEntries(
    Object.keys(periods).map((key) => {
      return [
        key,
        {
          value: revenuesByInterval[key][0],
          helper: getPercentHelper(
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
      arrow = <ArrowUpIcon color="green" />;
    } else {
      arrow = <ArrowDownIcon color="red" />;
    }
    return (
      <HStack>
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
