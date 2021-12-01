import { Box, Center, Container, Grid, GridItem } from '@chakra-ui/layout'
import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup } from '@chakra-ui/stat';
import React, { useEffect, useMemo, useState } from 'react'
import GenericTable from '../GenericTable'
import EmployeeHistory from './EmployeeHistory'
import type { Rental }  from '../../types/bd-entities'
import { add } from 'lodash';
import { Spinner } from '@chakra-ui/react';
import RentalDetails from '../RentalDetails';
import StatCard from '../cards/StatCard';


const gridItemStyle = {
  padding: "24px",
  margin: "0",
  backgroundColor: "white",
  borderRadius:"md"
}


function EmployeeDetails({ employeeId } : {employeeId: string}) {

    const [rentals, setRentals] = useState<Rental[]>([])
    const [isLoading, setIsLoading] = useState(true)


    function getAvgPrice() : number {
        if (rentals)
            return rentals.map(rental => rental.finalPrice).reduce((pre, curr) => pre + curr, 0) / rentals.length; 
        else 
            return 0
    }
    
    useEffect(() => {
        fetch(`users/${employeeId}/rentals`, {
            headers: {
                authorization: "bearer " + process.env.REACT_APP_TOKEN
            }
        })
        .then((res) => {
            return res.json();
        })
        .then(json => {
            setRentals(json); //TODO: define type for database objects
            setIsLoading(false)
            return json;
        })
        .then(json => console.log(json))
    }, [employeeId])




    const options = ["All", "Last 30 days", "Last week"];
    const values = [1, 2, 3]
    
    const revenue = options.map( (e, i) => {
      return {option: e, value: values[i]}
    } )

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
            <GridItem colSpan={4} rowSpan={4} {...gridItemStyle} >
            <StatCard label="label" stats={revenue}/>
          </GridItem>

          <GridItem colSpan={4} rowSpan={4} 
          padding="24px"
          bg="white"
          borderRadius="base"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center">

            <Stat>
                <StatLabel>Active rentals</StatLabel>
                <StatNumber>
                  {rentals.filter(r => r.state === "in corso").length}
                </StatNumber>
                <StatHelpText>
                <StatArrow type="decrease" />
                9.05%
                </StatHelpText>
            </Stat>
          </GridItem>

          <GridItem colSpan={4} rowSpan={4} >
            <Stat 
            padding="24px"
            bg="white"
            borderRadius="base"
            display="flex"
            flexDirection="column"
            alignItems="center">
                <StatLabel>Active rentals</StatLabel>
                <StatNumber>
                  {rentals.filter(r => r.state === "in corso").length}
                </StatNumber>
                <StatHelpText>
                <StatArrow type="decrease" />
                9.05%
                </StatHelpText>
            </Stat>
          </GridItem>

        </Grid>
      </>
    );
}

export default EmployeeDetails
