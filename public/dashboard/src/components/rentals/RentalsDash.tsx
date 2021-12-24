import { Box, Center, Container, Grid, GridItem } from "@chakra-ui/layout";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/stat";
import React, { useEffect, useMemo, useState } from "react";
import GenericTable from "../GenericTable";
import RentalsList from "./RentalsList";
import type { Rental } from "../../@types/db-entities";
import RentalDetails from "./RentalDetailsModal";
import StatCard from "../cards/StatCard";
import {
  format,
  getWeek,
  getYear,
  startOfISOWeek,
  subDays,
  differenceInCalendarWeeks,
  startOfMonth,
  startOfWeek,
  startOfQuarter,
  minTime,
} from "date-fns";
import LineChartCard from "../cards/LineChartCard";
import { addWeeks, startOfYear } from "date-fns/esm";
import { dateFormat, getRevenuePerWeek } from "./fillMissingMissing";
import { compareDateString } from "./compareDateString.1";
import { useDisclosure } from "@chakra-ui/hooks";
import RevenueCard from "../cards/RevenueCard";
import RentalConclusionsPie from "./RentalConclusionsPie";
import Card from "../cards/Card";
import { Flex } from "@chakra-ui/react";
import { CardMenu } from "../cards/CardMenu";
import useFetch, { IncomingOptions } from "use-http";

export const gridItemStyle = {
  padding: "24px",
  margin: "0",
  backgroundColor: "white",
  borderRadius: "md",
  overflow: "hidden",
};

function RentalsDash() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRental, setSelectedRental] = useState<number>();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        minWidth="0"
        w="100%"
        h="100vh"
        templateColumns="Repeat(12, 1fr)"
        templateRows="Repeat(12, 1fr)"
        gap={3}
        padding={3}
      >
        <GridItem as={Card} colSpan={4} rowSpan={4}>
          <RevenueCard rentals={rentals} />
        </GridItem>
        <GridItem colSpan={4} rowSpan={4} {...gridItemStyle}></GridItem>

        <GridItem colSpan={4} rowSpan={4} {...gridItemStyle}>
          <RentalConclusionsPie rentals={rentals} />
        </GridItem>

        <GridItem colSpan={8} rowSpan={8} {...gridItemStyle}>
          <LineChartCard rentals={rentals} />
        </GridItem>
        <GridItem colSpan={4} rowSpan={8} {...gridItemStyle}>
          <RentalsList
            rentals={rentals}
            isLoading={isLoading}
            setSelected={setSelectedRental}
            onClickRow={onOpen}
          ></RentalsList>
        </GridItem>
      </Grid>
    </>
  );
}

export default RentalsDash;
