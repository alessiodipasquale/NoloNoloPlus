import { Grid, GridItem, Text } from "@chakra-ui/layout";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import RentalsList from "./RentalsList";
import type { Rental } from "../../@types/db-entities";
import LineChartCard from "./LineChartCard";
import { useDisclosure } from "@chakra-ui/hooks";
import RevenueCard from "./RevenueCard";
import RentalConclusionsPie from "./RentalConclusionsPie";
import Card from "../cards/Card";
import useFetch, { IncomingOptions } from "use-http";
import CardHeader from "../cards/CardHeader";
import { useAuth } from "../Login/AuthProvider";
import useDefaultOptions from "../../useDefaultOptions";

function RentalsDash() {
  const {user, token} = useAuth()

  const [rentals, setRentals] = useState<Rental[]>([]);

  const options = useDefaultOptions(token)

  const { get, response, loading } = useFetch(options);

  useEffect(() => {
    if (!token) return
    console.log(token)
    async function fetchRentals() {
      const rentals = (await get("rentals")) as Rental[];
      if (response.ok) setRentals(rentals);
    }
    fetchRentals();
  }, [get, response, options, token]);

  console.log(user);
  

  return (
    <>
      <Grid
        templateColumns={{base: "1fr", lg: "repeat(3, 1fr)"}}
        autoRows={{base: "240px", lg: "1fr"}}
        w="100%"
        h={{base: "auto", lg:"100vh"}}
        gap={3}
        padding={3}
      >
        <GridItem as={Card} colSpan={1} rowSpan={1} >
          <RevenueCard rentals={rentals} />
        </GridItem>

        <GridItem colSpan={1} rowSpan={1}  as={Card}>
          <CardHeader>
            <Text variant="card-header">Rentals by status</Text>
          </CardHeader>
          <RentalConclusionsPie rentals={rentals} />
        </GridItem>

        <GridItem colSpan={1} rowSpan={{base: "auto", md: 3}}  as={Card} overflowX="auto" alignItems="flex-start">
          <RentalsList
            rentals={rentals}
            // onClickRow={(e) => {console.log(e.target)}}
          />
        </GridItem>

        <GridItem colSpan={{base: 1, lg: 2}} rowSpan={2} as={Card}>
          <LineChartCard rentals={rentals} />
        </GridItem>
      </Grid>
    </>
  );
}

export default RentalsDash;
