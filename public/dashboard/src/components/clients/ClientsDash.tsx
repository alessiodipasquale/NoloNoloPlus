import { Box, Grid, GridItem, Text } from "@chakra-ui/layout";
import React, { useEffect, useMemo, useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";

import type {
  Client,
  ClientWithRevenueAndDamage,
  Item,
  Rental,
  Review,
} from "../../@types/db-entities";
import { NewClients } from "./NewClients";
import DamagesScatterPlot from "./DamagesScatterPlot";
import useFetch, { IncomingOptions } from "use-http";
import {
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
import ClientsList from "./ClientsList";
import StarRating from "./starRating/StarRating";
import { Flex } from "@chakra-ui/react";
import { useAuth } from "../Login/AuthProvider";
import useDefaultOptions from "../../useDefaultOptions";

function ClientsDash() {
  const { token } = useAuth();

  const sortOrder = ["byRevenue", "byDamage"] as const;

  const [clients, setClients] = useState<ClientWithRevenueAndDamage[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [selectedOrder, setSelectedOrder] =
    useState<typeof sortOrder[number]>("byRevenue");

  const options = useDefaultOptions(token);

  const { get, response } = useFetch(options);

  useEffect(() => {
    async function fetchClients() {
      const clients = (await get(
        "users/clients/revenue"
      )) as ClientWithRevenueAndDamage[];
      console.log(clients);
      if (response.ok) setClients(clients);
    }
    fetchClients();
  }, [get, response]);

  useEffect(() => {
    async function fetchRentals() {
      const rentals = (await get("rentals")) as Rental[];
      console.log(rentals);
      if (response.ok) setRentals(rentals);
    }
    fetchRentals();
  }, [get, response]);

  const { data: reviews } = useFetch<Review[]>("reviews", options, []);
  const avgRating = useMemo(
    () =>
      reviews
        ? reviews.reduce((acc, review) => acc + review.stars, 0) /
          reviews.length
        : 0,
    [reviews]
  );
  console.log(reviews);
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
        h={{ base: "auto", lg: "100vh" }}
        templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        autoRows={{ base: "240px", lg: "1fr" }}
        gap={3}
        padding={3}
      >
        <GridItem as={Card}>
          <NewClients clients={clients.map((client) => client.user)} />
        </GridItem>
        <GridItem as={Card}>
          <CurrentlyRenting rentals={rentals} />
        </GridItem>

        <GridItem as={Card}>
          <CardHeader>
            <Text variant="card-header">Avarage review score</Text>
          </CardHeader>
          <Flex
            h="100%"
            align="center"
            aria-label={`avarage review rating: ${avgRating}`}
          >
            <StarRating rating={avgRating} />
          </Flex>
        </GridItem>

        <GridItem colSpan={{ lg: 2 }} rowSpan={2} as={Card}>
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

        <GridItem colSpan={1} rowSpan={2} as={Card}>
          <CardHeader>
            <Text variant="card-header">Number of Rentals</Text>
          </CardHeader>
          {/* <RentalsNo data={clients} />
           */}
          <ClientsList clients={clients} />
        </GridItem>
      </Grid>
    </>
  );
}

export default ClientsDash;
