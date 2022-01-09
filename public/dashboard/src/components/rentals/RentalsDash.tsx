import { Grid, GridItem, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import RentalsList from "./RentalsList";
import type { Rental } from "../../@types/db-entities";
import LineChartCard from "./LineChartCard";
import RevenueCard from "./RevenueCard";
import RentalConclusionsPie from "./RentalConclusionsPie";
import Card from "../cards/Card";
import CardHeader from "../cards/CardHeader";
import useExtendedKy from "../../utils/useExtendedKy";
import { useQuery } from "react-query";
// import ky from "ky";

function RentalsDash() {
  const [rentals, setRentals] = useState<Rental[]>([]);

  const ky = useExtendedKy();
  const {
    isLoading,
    isError,
    data = [],
    isFetched,
  } = useQuery<Rental[]>("rentals", () => ky.get("/rentals").json<Rental[]>());

  useEffect(() => {
    if (isFetched) setRentals(data);
  }, [data, isFetched]);

  return (
    <>
      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        autoRows={{ base: "240px", lg: "1fr" }}
        w="100%"
        h={{ base: "auto", lg: "100vh" }}
        gap={3}
        padding={3}
      >
        <GridItem as={Card} colSpan={1} rowSpan={1}>
          <RevenueCard rentals={rentals} />
        </GridItem>

        <GridItem colSpan={1} rowSpan={1} as={Card}>
          <CardHeader>
            <Text variant="card-header">Rentals by status</Text>
          </CardHeader>
          <RentalConclusionsPie rentals={rentals} />
        </GridItem>

        <GridItem
          colSpan={1}
          rowSpan={{ base: "auto", md: 3 }}
          as={Card}
          overflowX="auto"
          alignItems="flex-start"
        >
          <RentalsList
            rentals={rentals}
            // onClickRow={(e) => {console.log(e.target)}}
          />
        </GridItem>

        <GridItem colSpan={{ base: 1, lg: 2 }} rowSpan={2} as={Card}>
          <LineChartCard rentals={rentals} />
        </GridItem>
      </Grid>
    </>
  );
}

export default RentalsDash;
