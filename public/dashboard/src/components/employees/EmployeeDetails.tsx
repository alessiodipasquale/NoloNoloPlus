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
import EmployeeHistory from "./EmployeeHistory";
import type { Rental } from "../../types/bd-entities";
import RentalDetails from "../RentalDetails";
import StatCard from "../cards/StatCard";
import {
  format,
  getWeek,
  getYear,
  startOfISOWeek,
  subDays,
  parse,
  differenceInCalendarWeeks,
  differenceInWeeks,
} from "date-fns";
import LineChartCard from "../cards/LineChartCard";
import { addWeeks } from "date-fns/esm";

const gridItemStyle = {
  padding: "24px",
  margin: "0",
  backgroundColor: "white",
  borderRadius: "md",
  overflow: "hidden",
};

const dateFormat = "yyyy-MMM-dd";
function EmployeeDetails({ employeeId }: { employeeId: string }) {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function getAvgPrice(): number {
    if (rentals)
      return (
        rentals
          .map((rental) => rental.finalPrice)
          .reduce((pre, curr) => pre + curr, 0) / rentals.length
      );
    else return 0;
  }

  function getRevenue(since?: Date): number {
    let toReduce: Rental[];
    if (since) {
      toReduce = rentals.filter((rental) => {
        return new Date(rental.endDate) >= since;
      });
    } else {
      toReduce = rentals;
    }
    return toReduce.reduce((prev, curr) => prev + curr.finalPrice, 0);
  }

  useEffect(() => {
    fetch(`users/${employeeId}/rentals`, {
      headers: {
        authorization: "bearer " + process.env.REACT_APP_TOKEN,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setRentals(json); //TODO: define type for database objects
        console.log(rentals);
        setIsLoading(false);
        return json;
      })
      .then((json) => console.log(json));
  }, []);

  function getRevenuePerWeek(
    rentals: Rental[]
  ): { date: string; revenue: number }[] {
    let rentalsByWeek = rentals.reduce<{ [key: string]: Rental[] }>(
      (rentalsByWeek, curr, index) => {
        let endDate = new Date(curr.endDate);
        let weekDate = startOfISOWeek(endDate);
        const key = format(weekDate, "yyyy-MMM-dd");

        if (!rentalsByWeek[key]) {
          rentalsByWeek[key] = [];
        }
        rentalsByWeek[key].push(curr);

        return rentalsByWeek;
      },
      {}
    );

    let weekTotals = [] as { date: string; revenue: number }[];

    Object.keys(rentalsByWeek).map((week) => {
      weekTotals.push({
        date: week,
        revenue: rentalsByWeek[week].reduce(
          (tot, curr) => tot + curr.finalPrice,
          0
        ),
      });
      return null;
    });

    function fillMissingWeeks(
      revenueByWeek: { date: string; revenue: number }[]
    ): { date: string; revenue: number }[] {
      let copy = revenueByWeek.slice().sort(compareDateString);
      let added = 0
      for (let i = 0; i < revenueByWeek.length - 1; i++) {
        const dateA = parse(revenueByWeek[i].date, dateFormat, new Date());
        const dateB = parse(revenueByWeek[i + 1].date, dateFormat, new Date());
        console.log(dateA)
        console.log(differenceInCalendarWeeks(dateB, dateA))

        for (let j = 1; j < (differenceInWeeks(dateB, dateA,)); j++) {
          let date = format(addWeeks(dateA, j), dateFormat)
          console.log(date)
          copy.push({
            date: date,
            revenue: 0,
          });
        }
      }

      return copy;
    }


    let filledWeeks = fillMissingWeeks(weekTotals);

    function compareDateString(a: {date: string}, b: {date: string}) {
      let dateA = parse(a.date, "yyyy-MMM-dd", new Date());
      let dateB = parse(b.date, "yyyy-MMM-dd", new Date());
      console.log(dateA, dateB);
      if (dateA > dateB) {
        return 1;
      } else if (dateA < dateB) {
        return -1;
      } else {
        return 0;
      }
    }

    console.log(filledWeeks.sort(compareDateString));
    return filledWeeks.sort(compareDateString)
  }

  function getAvgRentalPrice(rentals: Rental[]): number {
    if (rentals.length === 0) {
      return 0;
    }
    return (
      rentals.reduce((acc, curr) => acc + curr.finalPrice, 0) / rentals.length
    );
  }

  const avgPrice = {
    option: "avarage",
    value: getAvgPrice(),
  };

  const options = ["All", "Last 30 days", "Last week"];
  const timeframe = [
    undefined,
    subDays(new Date(), 30),
    subDays(new Date(), 7),
  ];
  const values = timeframe.map((t) => getRevenue(t));

  const revenueStat = options.map((e, i) => {
    return { option: e, value: values[i] };
  });

  const chartData = getRevenuePerWeek(rentals);

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
          <StatCard label="Total revenue" stats={revenueStat} />
        </GridItem>
        <GridItem colSpan={4} rowSpan={4} {...gridItemStyle}>
          <StatCard label="Avarage" stats={[avgPrice]} />
        </GridItem>

        <GridItem colSpan={4} rowSpan={4} {...gridItemStyle}>
          <StatCard label="label" stats={revenueStat} />
        </GridItem>

        <GridItem colSpan={8} rowSpan={8} {...gridItemStyle}>
          <LineChartCard data={chartData} />
        </GridItem>
        <GridItem colSpan={4} rowSpan={8} {...gridItemStyle}>
          <EmployeeHistory
            data={rentals}
            isLoading={isLoading}
            employeeId={employeeId}
          ></EmployeeHistory>
        </GridItem>
      </Grid>
    </>
  );
}

export default EmployeeDetails;
