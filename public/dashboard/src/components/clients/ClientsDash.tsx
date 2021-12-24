import { Grid, GridItem } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
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

const gridItemStyle = {
  padding: "24px",
  margin: "0",
  backgroundColor: "white",
  borderRadius: "md",
  overflow: "hidden",
};

function ClientsDash() {
  const [clients, setClients] = useState<ClientWithRevenueAndDamage[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  //const [selectedRental, setSelectedRental] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const activeRentals = rentals.filter((rental) => rental.state === "in corso");
  const rentingUsers = Array.from(
    new Set(activeRentals.map((rental) => rental.clientId))
  );

  return (
    <>
      <Grid
        minWidth="0"
        w="100%"
        h="100vh"
        templateColumns="Repeat(12, 1fr)"
        templateRows="Repeat(12, 1fr)"
        gap={3}
        padding={3}
      >
        <GridItem colSpan={4} rowSpan={4} as={Card}>
          <NewClients clients={clients.map((client) => client.user)} />
        </GridItem>
        <GridItem colSpan={4} rowSpan={4} as={Card}></GridItem>

        <GridItem colSpan={4} rowSpan={4} as={Card}></GridItem>

        <GridItem colSpan={4} rowSpan={8} as={Card}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              width={500}
              height={300}
              data={clients}
              margin={{
                top: 5,
                right: 30,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="totalRevenue" />
              <YAxis dataKey="user.username" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalRevenue" barSize={20} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </GridItem>
        <GridItem colSpan={4} rowSpan={8} as={Card}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              width={500}
              height={300}
              data={clients}
              margin={{
                top: 5,
                right: 30,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="totalDamage" />
              <YAxis dataKey="user.username" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalDamage" barSize={20} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </GridItem>
        <GridItem colSpan={4} rowSpan={8} as={Card}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              width={500}
              height={300}
              data={clients}
              margin={{
                top: 5,
                right: 30,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="user.rentals.length" />
              <YAxis dataKey="user.username" type="category" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="user.rentals.length"
                name="number of rentals"
                barSize={20}
                fill="#8884d8"
              />
            </BarChart>
          </ResponsiveContainer>
        </GridItem>
      </Grid>
    </>
  );
}

export default ClientsDash;
