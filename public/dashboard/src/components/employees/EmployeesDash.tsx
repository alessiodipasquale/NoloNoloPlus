import { Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Employee } from "../../@types/db-entities";
import { gridItemStyle } from "../rentals/RentalsDash";
import EmployeesList from "./EmployeesList";

function EmployeesDash() {

    const [employees, setEmployees] = useState<Employee[]>([])
    const [isLoading, setIsLoading] = useState(true);

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
          <EmployeesList isLoading={isLoading} employees={employees} onOpen={undefined} />
      </GridItem>
      <GridItem colSpan={6} rowSpan={6} {...gridItemStyle}></GridItem>

      <GridItem colSpan={6} rowSpan={6} {...gridItemStyle}></GridItem>
    </Grid>
  );
}

export default EmployeesDash;
