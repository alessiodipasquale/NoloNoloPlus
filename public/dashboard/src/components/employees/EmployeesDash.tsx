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
import { IncomingOptions, useFetch } from "use-http";
import RentalsNoBarChart from "./RentalsNoBarChart";
import useDefaultOptions from "../../useDefaultOptions"
import { useAuth } from "../Login/AuthProvider";

type menuScreen = "details" | "employees" | "rentals";

function EmployeesDash() {
  const [selectedEmployee, setSelectedEmployee] = useState<number>();
  const [selectedRental, setSelectedRental] = useState<number>();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [menu, setMenu] = useState<menuScreen>("employees");
  const {token} = useAuth()
  
  const options = useDefaultOptions(token)

  //TODO questa roba è troppo incasinata. È difficile dare nomi sensati ed evitare fetch infiniti

  const { data: employees = [], loading: loadingEmployees } = useFetch<
    Employee[]
  >("users/employers", options, []);
  const { data: revenues = [], loading: revenuesLoading } = useFetch<
    UserRevenue[]
  >("users/employers/revenue", options, []);

  const {
    get,
    loading: loadingUsers,
    response,
  } = useFetch<Rental[]>("/users", options);
  useEffect(() => {
    async function fetchEmployees() {
      if (!selectedEmployee) return;
      const data = (await get(
        `/${employees[selectedEmployee]._id}/rentals`
      )) as Rental[];
      console.log(data);

      if (response.ok) setRentals(data);
    }
    fetchEmployees();
  }, [employees, get, response.ok, selectedEmployee]);

  let header;
  let content;

  if (menu === "employees") {
    header = <Text fontSize="lg">Employees</Text>;
    content = (
      <EmployeesList
        isLoading={loadingEmployees}
        employees={employees}
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
        rentals={rentals}
        setSelected={setSelectedRental}
        employeeId={
          selectedEmployee ? employees[selectedEmployee]._id : undefined
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
    content = selectedRental ? (
      <RentalDetails rental={rentals[selectedRental]} />
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
        <RevenueChart data={revenues} aria-labelledby="revenue-header" />
      </GridItem>

      <GridItem colSpan={1} rowSpan={1} as={Card}>
      <CardHeader>
          <Text id="revenue-header" variant="card-header">
            Rentals per employeed
          </Text>
        </CardHeader>
        <RentalsNoBarChart data={employees} />
      </GridItem>
    </Grid>
  );
}

export default EmployeesDash;
