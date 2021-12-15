import icon from "@chakra-ui/icon/dist/declarations/src/icon";
import { Box, Grid, GridItem, IconButton, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Employee, Rental } from "../../@types/db-entities";
import { gridItemStyle } from "../rentals/RentalsDash";
import RentalsList from "../rentals/RentalsList";
import { CountRevenueChart } from "./CountRevenueChart";
import EmployeesList from "./EmployeesList";

function EmployeesDash() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<number>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rentals, setRentals] = useState<Rental[]>([]);

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
        {!isOpen && (
          <EmployeesList
            isLoading={isLoading}
            employees={employees}
            setSelected={setSelectedEmployee}
            onOpen={onOpen}
          />
        )}
        {isOpen && (
          <Box>
            <IconButton
              aria-label="go back to employees"
              icon={<FaChevronLeft />}
              onClick={()=> {setSelectedEmployee(undefined); onClose()}}
            />
            <RentalsList
              rentals={rentals}
              employeeId={
                selectedEmployee ? employees[selectedEmployee]._id : undefined
              }
              onOpen={undefined}
              isLoading={isLoading}
            />
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
