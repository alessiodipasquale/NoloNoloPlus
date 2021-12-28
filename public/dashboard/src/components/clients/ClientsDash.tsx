import { Box, Grid, GridItem, Text } from "@chakra-ui/layout";
import React, { useEffect, useMemo, useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";

import type {
  Client,
  ClientWithRevenueAndDamage,
  Item,
  Rental,
} from "../../@types/db-entities";
import { NewClients } from "./NewClients";
import DamagesScatterPlot from "./DamagesScatterPlot";
import useFetch, { IncomingOptions } from "use-http";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import Card from "../cards/Card";
import CardHeader from "../cards/CardHeader";
import { CardMenu } from "../cards/CardMenu";
import ClientsBarChart from "./ClientsBarChart";
import CurrentlyRenting from "./CurrentlyRenting";
import RentalsNo from "./RentalsNo";

function ClientsDash() {
  const sortOrder = ["byRevenue", "byDamage"] as const;

  const [clients, setClients] = useState<ClientWithRevenueAndDamage[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [selectedOrder, setSelectedOrder] =
    useState<typeof sortOrder[number]>("byRevenue");

  const options = {
    headers: {
      authorization: "Bearer " + process.env.REACT_APP_TOKEN,
    },
    responseType: "json",
  } as IncomingOptions;

  const { get, response } = useFetch(options);

  useEffect(() => {
    async function fetchClients() {
      const clients = (await get(
        "users/clients/revenue"
      )) as ClientWithRevenueAndDamage[];
      if (response.ok) setClients(clients);
    }
    fetchClients();
  }, [get, response]);

  useEffect(() => {
    async function fetchRentals() {
      const rentals = (await get("rentals")) as Rental[];
      if (response.ok) setRentals(rentals);
    }
    fetchRentals();
  }, [get, response]);

  const sortedClients = useMemo(() => {
    return clients
      .slice()
      .sort((a, b) => {
        if (selectedOrder === "byRevenue") {
          return a.totalRevenue - b.totalRevenue;
        } else if (selectedOrder === "byDamage") {
          return a.totalDamage - b.totalDamage;
        }
        return 0;
      })
      .reverse();
  }, [clients, selectedOrder]);

  useEffect(() => console.log(sortedClients), [selectedOrder, sortedClients]);

  return (
    <>
      <Grid
        w="auto"
        h="100vh"
        templateColumns="Repeat(12, 1fr)"
        templateRows="Repeat(12, 1fr)"
        gap={3}
        padding={3}
      >
        <GridItem colSpan={4} rowSpan={4} as={Card}>
          <NewClients clients={clients.map((client) => client.user)} />
        </GridItem>
        <GridItem colSpan={4} rowSpan={4} as={Card}>
          <CurrentlyRenting rentals={rentals} />
        </GridItem>

        <GridItem colSpan={4} rowSpan={4} as={Card}></GridItem>

        <GridItem colSpan={8} rowSpan={8} as={Card}>
          <CardHeader>
            <Text variant="card-header">Revenue and Damage</Text>
            <Box>
              <CardMenu
                selected={selectedOrder}
                setSelected={setSelectedOrder}
                options={sortOrder}
              />
            </Box>
          </CardHeader>
          <ClientsBarChart clients={sortedClients} />
        </GridItem>

        <GridItem colSpan={4} rowSpan={8} as={Card}>
          <CardHeader>
            <Text variant="card-header">Number of Rentals</Text>
          </CardHeader>
          <RentalsNo data={clients} />
        </GridItem>
      </Grid>
    </>
  );
}

export default ClientsDash;
