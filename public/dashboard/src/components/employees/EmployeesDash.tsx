import {
  Grid,
  GridItem,
  IconButton,
  Text,
} from "@chakra-ui/react";
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

type menuScreen = "details" | "employees" | "rentals";



function EmployeesDash() {
  const [selectedEmployee, setSelectedEmployee] = useState<number>();
  const [selectedRental, setSelectedRental] = useState<number>();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [menu, setMenu] = useState<menuScreen>("employees");

  const options = {
    headers: {
      authorization: "Bearer " + process.env.REACT_APP_TOKEN,
    },
    responseType: "json",
  } as IncomingOptions;
  
  //TODO questa roba è troppo incasinata. È difficile dare nomi sensati ed evitare fetch infiniti


  const { data: employees = [], loading : loadingEmployees } = useFetch<Employee[]>("users/employers", options, [])
  const { data: revenues = [], loading: revenuesLoading } = useFetch<UserRevenue[]>("users/employers/revenue", options, [])

  const { get,  loading : loadingUsers, response } = useFetch<Rental[]>("/users", options)
  useEffect(() => {
    async function fetchEmployees() {
      if(!selectedEmployee) return
      const data = await get(`/${employees[selectedEmployee]._id}/rentals`) as Rental[];
      console.log(data)

      if (response.ok) setRentals(data)
    }
    fetchEmployees();
  }, [employees, get, response.ok, selectedEmployee])



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
        <IconButton autoFocus
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
