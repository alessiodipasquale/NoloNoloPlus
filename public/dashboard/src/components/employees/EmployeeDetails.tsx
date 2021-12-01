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
import { subDays } from 'date-fns'


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

    function getRevenue(since?: Date) : number {
      let toReduce: Rental[];
      if (since) {
        toReduce = rentals.filter(rental => {
          return (new Date(rental.endDate) >= since)
        })
        
      } else {
        toReduce = rentals;
      }
      return toReduce.reduce((prev, curr) => prev + curr.finalPrice, 0)
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
          console.log(rentals)
          setIsLoading(false)
          return json;
        })
        .then(json => console.log(json))
    }, [])


    const options = ["All", "Last 30 days", "Last week"];
    const timeframe = [undefined, subDays(new Date(), 30), subDays(new Date(), 7)]
    const values = timeframe.map(t => getRevenue(t))
    
    const revenueStat = options.map( (e, i) => {
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
            <StatCard label="label" stats={revenueStat}/>
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
