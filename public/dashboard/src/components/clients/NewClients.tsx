import {
  addWeeks,
  differenceInCalendarWeeks,
  parse,
  startOfISOWeek,
} from "date-fns";
import React, { useState } from "react";
import { Client } from "../../@types/db-entities";
import CardHeader from "../cards/CardHeader";
import { CardMenu } from "../cards/CardMenu";
import getPercentHelper from "../cards/getPercentHelper";
import { groupByInterval } from "../cards/groupByInterval";
import StatCard from "../cards/StatCard";
import { Text } from "@chakra-ui/react";

const periods = {
  all: {},
  "last year": { years: 1 },
  "last 6 months": { months: 6 },
  "last 30 days": { days: 30 },
  "last week": { days: 7 },
} as { [key: string]: Duration };

function groupClientsByInterval(clients: Client[], period: Duration) {
  return groupByInterval(
    clients,
    clients.map((client) => new Date(client.registrationDate)),
    period
  );
}

function getNewClientsPerPeriod(clients: Client[]) {
  const clientsByInterval = {} as { [key: string]: Map<Interval, Client[]> };
  const countByInterval = {} as { [key: string]: number[] };

  for (let key of Object.keys(periods)) {
    clientsByInterval[key] = groupClientsByInterval(clients, periods[key]);
    countByInterval[key] = Array.from(clientsByInterval[key]).map(
      ([_, clients]) => clients.length
    );
  }

  const values = Object.fromEntries(
    Object.keys(periods).map((key) => {
      return [
        key,
        {
          value: countByInterval[key][0],
          helper: getPercentHelper(
            countByInterval[key][1],
            countByInterval[key][0]
          ),
        },
      ];
    })
  );

  return values;
}

export function NewClients({ clients }: { clients: Client[] }) {
  const [selected, setSelected] = useState("all");
  const values = getNewClientsPerPeriod(clients);

  return (
    <>
      <CardHeader>
        <Text variant="card-header">New Clients</Text>
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
