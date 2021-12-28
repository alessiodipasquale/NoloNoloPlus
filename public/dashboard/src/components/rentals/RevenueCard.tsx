import React, { useState } from "react";
import { Rental, Rental as T } from "../../@types/db-entities";
import StatCard from "../cards/StatCard";
import { getPercentDiff } from "./fillMissingMissing";
import { Text, HStack, Flex } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { groupByInterval } from "../cards/groupByInterval";
import getPercentHelper from "../cards/getPercentHelper";
import { CardMenu } from "../cards/CardMenu";
import CardHeader from "../cards/CardHeader";

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

function groupRentalsByInterval(rentals: Rental[], period: Duration) {
  return groupByInterval(
    rentals,
    rentals.map((rental) => new Date(rental.endDate)),
    period
  );
}

function RevenueCard({ rentals }: { rentals: Rental[] }) {
  const [selected, setSelected] = useState("all");

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

  return (
    <>
      <CardHeader>
        <Text variant="card-header">
          Revenue
        </Text>
        <CardMenu
          selected={selected}
          setSelected={setSelected}
          options={Object.keys(periods)}
        />
      </CardHeader>
      {values[selected] && (
        <StatCard
          value={values[selected].value}
          helper={values[selected].helper}
        />
      )}
    </>
  );
}

export default RevenueCard;
