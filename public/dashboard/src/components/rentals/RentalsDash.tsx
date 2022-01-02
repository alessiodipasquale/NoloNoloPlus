import { Grid, GridItem, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import RentalsList from "./RentalsList";
import type { Rental } from "../../@types/db-entities";
import LineChartCard from "./LineChartCard";
import { useDisclosure } from "@chakra-ui/hooks";
import RevenueCard from "./RevenueCard";
import RentalConclusionsPie from "./RentalConclusionsPie";
import Card from "../cards/Card";
import useFetch, { IncomingOptions } from "use-http";
import CardHeader from "../cards/CardHeader";

function RentalsDash() {
  const [rentals, setRentals] = useState<Rental[]>([]);

  const options = {
    headers: {
      authorization: "Bearer " + process.env.REACT_APP_TOKEN,
    },
    responseType: "json",
  } as IncomingOptions;

  const { get, response, loading } = useFetch(options);

  useEffect(() => {
    async function fetchRentals() {
      const rentals = (await get("rentals")) as Rental[];
      if (response.ok) setRentals(rentals);
    }
    fetchRentals();
  }, [get, response]);

  return (
    <>
      <Grid
        w="100%"
        h="100vh"
        templateColumns="Repeat(auto-fit, min-max(240px, 1fr))"
        autoRows="240px"
        gap={3}
        padding={3}
      >
        <GridItem as={Card} colSpan={4} rowSpan={4} order="1">
          <RevenueCard rentals={rentals} />
        </GridItem>

        <GridItem colSpan={4} rowSpan={4} order="2" as={Card}>
          <CardHeader>
            <Text variant="card-header">Rentals by status</Text>
          </CardHeader>
          <RentalConclusionsPie rentals={rentals} />
        </GridItem>

        <GridItem colSpan={4} rowSpan={12} order="3" as={Card}>
          <RentalsList
            rentals={rentals}
            onClickRow={undefined}
          />
        </GridItem>

        <GridItem colSpan={8} rowSpan={8} order="4" as={Card}>
          <LineChartCard rentals={rentals} />
        </GridItem>
      </Grid>
    </>
  );
}

export default RentalsDash;
