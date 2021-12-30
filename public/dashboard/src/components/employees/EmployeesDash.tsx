import {
  Box,
  Grid,
  GridItem,
  IconButton,
  useDisclosure,
  Text,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Employee, Rental, UserRevenue } from "../../@types/db-entities";
import { gridItemStyle } from "../rentals/RentalsDash";
import RentalsList from "../rentals/RentalsList";
import RevenueChart from "./CountRevenueChart";
import EmployeesList from "./EmployeesList";
import RentalDetails from "../rentals/RentalDetails";
import CardHeader from "../cards/CardHeader";
import Card from "../cards/Card";
import useFetch, { IncomingOptions } from "use-http";
import RentalsNoBarChart from "./RentalsNoBarChart";

type menuScreen = "details" | "employees" | "rentals";



function EmployeesDash() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<number>();
  const [selectedRental, setSelectedRental] = useState<number>();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [menu, setMenu] = useState<menuScreen>("employees");
  const [revenues, setRevenues] = useState<UserRevenue[]>([]);

  const options = {
    headers: {
      authorization: "Bearer " + process.env.REACT_APP_TOKEN,
    },
    responseType: "json",
  } as IncomingOptions;

  const employeesReq = useFetch("users/employers", options);
  useEffect(() => {
    
    async function fetchEmployees() {
      const {get, loading} = employeesReq
      const data = await employeesReq.get();
      if (employeesReq.response.ok) setEmployees(data);
    }
    fetchEmployees();
  }, []);

  const usersReq = useFetch("users", options)
  useEffect(() => {
    async function fetchRentals() {
      if (!selectedRental || !employees) return
      const data = await usersReq.get(`${employees[selectedRental]._id}/rentals`);
      if (usersReq.response.ok) setRentals(data);
    }
    fetchRentals();
  }, [employees, selectedRental, usersReq]);


  useEffect(() => {
    fetch("users/employers/revenue", {
      headers: {
        authorization: "bearer " + process.env.REACT_APP_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((json) => setRevenues(json))
      .then((json) => console.log(json));
  }, []);

  let header;
  let content;

  if (menu === "employees") {
    header = <Text fontSize="lg">Employees</Text>;
    content = (
      <EmployeesList
        isLoading={false}
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
        onClickRow={() => {
          setMenu("details");
        }}
        isLoading={usersReq.loading}
        variant="withHover"
      />
    );
  } else {
    header = (
      <>
        <IconButton
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
    content = selectedRental ? <RentalDetails rental={rentals[selectedRental]}/> : null;
  }

  return (
    <Grid
      minWidth="0"
      w="100%"
      h="100vh"
      templateColumns="Repeat(12, 1fr)"
      templateRows="Repeat(12, 1fr)"
      gap={3}
      padding={3}
    >
      <GridItem colSpan={6} rowSpan={12} as={Card}>
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
      <GridItem colSpan={6} rowSpan={6} as={Card}>
        <RevenueChart data={revenues} />
      </GridItem>

      <GridItem colSpan={6} rowSpan={6} as={Card}>
        <RentalsNoBarChart data={employees} />
      </GridItem>
    </Grid>
  );
}

export default EmployeesDash;
