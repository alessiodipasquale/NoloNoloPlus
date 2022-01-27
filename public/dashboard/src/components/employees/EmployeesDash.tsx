import { Grid, GridItem, IconButton, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Employee, Rental, UserRevenue } from "../../@types/db-entities";
import RentalsList from "../rentals/RentalsList";
import RevenueChart from "./CountRevenueChart";
import EmployeesList from "./EmployeesList";
import RentalDetails from "../rentals/RentalDetails";
import CardHeader from "../cards/CardHeader";
import Card from "../cards/Card";
import RentalsNoBarChart from "./RentalsNoBarChart";
import { useAuth } from "../Login/AuthProvider";
import { useQuery } from "react-query";
import useExtendedKy from "../../utils/useExtendedKy";

type menuScreen = "details" | "employees" | "rentals";

function EmployeesDash() {
  const [selectedEmployee, setSelectedEmployee] = useState<number>();
  const [selectedRental, setSelectedRental] = useState<number>();
  const [menu, setMenu] = useState<menuScreen>("employees");

  const ky = useExtendedKy();
  const employeesQuery = useQuery("employees", () =>
    ky.get("/users/employees").json<Employee[]>()
  );
  const revenuesQuery = useQuery("revenues", () =>
    ky.get("/users/employees/revenue").json<UserRevenue[]>()
  );
  const rentalsQuery = useQuery("rentals", () =>
    ky.get(`/rentals`).json<Rental[]>()
  );

  let header;
  let content;

  if (menu === "employees") {
    header = <Text fontSize="lg">Employees</Text>;
    content = (
      <EmployeesList
        employees={employeesQuery.data ?? []}
        setSelected={setSelectedEmployee}
        onClickRow={() => setMenu("rentals")}
      />
    );
  } else if (menu === "rentals") {
    header = (
      <>
        <IconButton
          aria-label="go back to employees"
          icon={<FaChevronLeft />}
          onClick={() => {
            setSelectedEmployee(undefined);
            setMenu("employees");
          }}
        />
        <Text fontSize="lg">Rentals</Text>
      </>
    );
    content = (
      <RentalsList
        rentals={rentalsQuery.data ?? []}
        setSelected={setSelectedRental}
        employeeId={
          selectedEmployee !== undefined && employeesQuery.data
            ? employeesQuery.data[selectedEmployee]._id
            : undefined
        }
        onClickRow={(e) => {
          setMenu("details");
        }}
        variant="withHover"
      />
    );
  } else {
    header = (
      <>
        <IconButton
          autoFocus
          aria-label="go back to rentals"
          icon={<FaChevronLeft />}
          onClick={() => {
            setSelectedRental(undefined);
            setMenu("rentals");
          }}
        />
        <Text Text fontSize="lg">
          Details
        </Text>
      </>
    );
    content =
      ((selectedRental || selectedRental === 0)  && rentalsQuery.data) ? (
        <RentalDetails rental={rentalsQuery.data[selectedRental]} />
      ) : undefined;
  }

  return (
    <Grid
      minWidth="0"
      w="100%"
      h={{ base: "auto", lg: "100vh" }}
      templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      autoRows={{ base: "240px", lg: "1fr" }}
      gap={3}
      padding={3}
    >
      <GridItem
        colSpan={1}
        rowSpan={2}
        as={Card}
        alignItems="flex-start"
        overflowX="auto"
      >
        <CardHeader
          marginBottom="2rem"
          justifyContent="left"
          alignItems="baseline"
          sx={{ gap: "1rem" }}
        >
          {header}
        </CardHeader>
        {content}
      </GridItem>
      <GridItem colSpan={1} rowSpan={1} as={Card}>
        <CardHeader>
          <Text id="revenue-header" variant="card-header">
            Revenue by employee
          </Text>
        </CardHeader>
        <RevenueChart
          data={revenuesQuery.data ?? []}
          aria-labelledby="revenue-header"
        />
      </GridItem>

      <GridItem colSpan={1} rowSpan={1} as={Card}>
        <CardHeader>
          <Text id="revenue-header" variant="card-header">
            Rentals per employeed
          </Text>
        </CardHeader>
        <RentalsNoBarChart data={employeesQuery.data ?? []} />
      </GridItem>
    </Grid>
  );
}

export default EmployeesDash;
