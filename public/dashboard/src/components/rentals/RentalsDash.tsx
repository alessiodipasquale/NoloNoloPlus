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
import RentalDetails from "./RentalDetails";
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

export const gridItemStyle = {
  padding: "24px",
  margin: "0",
  backgroundColor: "white",
  borderRadius: "md",
  overflow: "hidden",
};


function RentalsDash({ employeeId }: { employeeId?: string }) {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRental, setSelectedRental] = useState<number>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch(employeeId?`users/${employeeId}/rentals`:"rentals", {
      headers: {
        authorization: "bearer " + process.env.REACT_APP_TOKEN,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setRentals(json); //TODO: define type for database objects
        console.log("Rentals:")
        console.log(rentals);
        setIsLoading(false);
        return json;
      })
      .then((json) => console.log(json));
  }, []);

  const chartData = getRevenuePerWeek(rentals).map(value => ({revenue: value.revenue, date: format(value.date, dateFormat)}));
  console.log(chartData);

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
        <GridItem colSpan={4} rowSpan={4} {...gridItemStyle}>
          <RevenueCard rentals={rentals} />
        </GridItem>
        <GridItem colSpan={4} rowSpan={4} {...gridItemStyle}></GridItem>

        <GridItem colSpan={4} rowSpan={4} {...gridItemStyle}>
          <RentalConclusionsPie rentals={rentals}/>
        </GridItem>

        <GridItem colSpan={8} rowSpan={8} {...gridItemStyle}>
          <LineChartCard data={chartData} />
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

      {(selectedRental || selectedRental === 0)   && (
        <RentalDetails
          rental={rentals[selectedRental]}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}

export default RentalsDash;
