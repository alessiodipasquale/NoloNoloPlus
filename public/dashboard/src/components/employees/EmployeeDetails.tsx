import { Box, Center, Container, Grid, GridItem } from '@chakra-ui/layout'
import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup } from '@chakra-ui/stat';
import React, { useEffect, useMemo, useState } from 'react'
import GenericTable from '../GenericTable'
import EmployeeHistory from './EmployeeHistory'
import type { Rental }  from '../../types/bd-entities'
import { add } from 'lodash';
import { Spinner } from '@chakra-ui/react';


const border = {
    border: "solid"
}

function EmployeeDetails({ employeeId } : {employeeId: string}) {

    const [rentals, setRentals] = useState([]) as [Rental[], any]
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


    return (
      <>
        <Grid
          minWidth="0"
          h="100vh"
          templateColumns="Repeat(12, 1fr)"
          templateRows="Repeat(5, 1fr)"
          gap={3}
          padding={3}
        >
          <GridItem minWidth="0" rowSpan={3} colSpan={8} style={border}>
            <EmployeeHistory 
            employeeId="User1"
            isLoading={isLoading}
            data={rentals} />
          </GridItem>
          <GridItem style={border} colSpan={4} >
          <StatGroup>
            <Stat>
                <StatLabel>Total rentals</StatLabel>
                <StatNumber>{rentals.length}</StatNumber>
                <StatHelpText>
                <StatArrow type="increase" />
                23.36%
                </StatHelpText>
            </Stat>

            <Stat>
                <StatLabel>Active rentals</StatLabel>
                <StatNumber>{rentals.filter(r => r.state === "in corso").length}</StatNumber>
                <StatHelpText>
                <StatArrow type="decrease" />
                9.05%
                </StatHelpText>
            </Stat>
            </StatGroup>
          </GridItem>
          <GridItem colSpan={2} style={border}>
            <Stat>
                <StatLabel>Avarage price</StatLabel>
                {rentals? <StatNumber>{getAvgPrice()}</StatNumber> : <Spinner />}
                <StatHelpText>
                <StatArrow type="decrease" />
                9.05%
                </StatHelpText>
            </Stat>
          </GridItem>
          <GridItem colSpan={2} style={border} />
          <GridItem colSpan={2}  />
          <GridItem colSpan={2}  />
          <GridItem rowSpan={2} colSpan={4} >
          </GridItem>
          <GridItem rowSpan={2} colSpan={4} />
          <GridItem rowSpan={2} colSpan={4} />
        </Grid>
      </>
    );
}

export default EmployeeDetails
