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
import { Employee, Rental } from "../../@types/db-entities";
import { gridItemStyle } from "../rentals/RentalsDash";
import RentalsList from "../rentals/RentalsList";
import { CountRevenueChart } from "./CountRevenueChart";
import EmployeesList from "./EmployeesList";
import RentalDetails from "../rentals/RentalDetails";
import CardHeader from "../cards/CardHeader";

type menuScreen = "details" | "employees" | "rentals";

function EmployeesDash() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<number>();
  const [selectedRental, setSelectedRental] = useState<number>();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [menu, setMenu] = useState<menuScreen>("employees");

  useEffect(() => {
    fetch(`users/employers`, {
      headers: {
        authorization: "bearer " + process.env.REACT_APP_TOKEN,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setEmployees(json); //TODO: define type for database objects
        setIsLoading(false);
        return json;
      })
      .then((json) => console.log(json));
  }, []);

  useEffect(() => {
    if (!selectedEmployee) return;
    fetch(`users/${employees[selectedEmployee]._id}/rentals`, {
      headers: {
        authorization: "bearer " + process.env.REACT_APP_TOKEN,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setRentals(json); //TODO: define type for database objects
        setIsLoading(false);
        return json;
      })
      .then((json) => console.log(json));
  }, [employees, selectedEmployee]);

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
      <GridItem colSpan={6} rowSpan={12} {...gridItemStyle}>
        {menu === "employees" && (
          <>
            <CardHeader
              marginBottom="2rem"
              justifyContent="left"
              alignItems="baseline"
              sx={{ gap: "1rem" }}
            >
              <Text fontSize="lg">Employees</Text>
            </CardHeader>
            <EmployeesList
              isLoading={isLoading}
              employees={employees}
              setSelected={setSelectedEmployee}
              onClickRow={() => setMenu("rentals")}
            />
          </>
        )}

        {menu === "rentals" && (
          <>
            <CardHeader
              marginBottom="2rem"
              justifyContent="left"
              alignItems="baseline"
              sx={{ gap: "1rem" }}
            >
              <IconButton
                aria-label="go back to employees"
                icon={<FaChevronLeft />}
                onClick={() => {
                  setSelectedEmployee(undefined);
                  setMenu("employees");
                }}
              />
              <Text fontSize="lg">Rentals</Text>
            </CardHeader>

            <RentalsList
              rentals={rentals}
              setSelected={setSelectedRental}
              employeeId={
                selectedEmployee ? employees[selectedEmployee]._id : undefined
              }
              onClickRow={() => {
                setMenu("details");
              }}
              isLoading={isLoading}
              variant="withHover"
            />
          </>
        )}
        {menu === "details" && (
          <Box>
            <CardHeader
              marginBottom="2rem"
              justifyContent="left"
              alignItems="baseline"
              sx={{ gap: "1rem" }}
            >
              <IconButton
                aria-label="go back to rentals"
                icon={<FaChevronLeft />}
                onClick={() => {
                  setSelectedRental(undefined);
                  setMenu("rentals");
                }}
              />
              <Text>Details</Text>
            </CardHeader>
            <RentalDetails rental={rentals[selectedRental!]} />
          </Box>
        )}
      </GridItem>
      <GridItem colSpan={6} rowSpan={6} {...gridItemStyle}>
        <CountRevenueChart />
      </GridItem>

      <GridItem colSpan={6} rowSpan={6} {...gridItemStyle}></GridItem>
    </Grid>
  );
}

export default EmployeesDash;
