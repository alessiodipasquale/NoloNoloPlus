import { Grid, GridItem } from '@chakra-ui/layout'
import { StatGroup, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Spinner } from '@chakra-ui/react'
import { border } from '@chakra-ui/styled-system'
import React from 'react'
import RentalsList from '../employees/RentalsList'
import RentalDetails from '../employees/RentalDetails'

function RentalDash() {
    return (
        <Grid
          minWidth="0"
          h="100vh"
          templateColumns="Repeat(3, 1fr)"
          templateRows="Repeat(3, 1fr)"
          gap={3}
          padding={3}
        >
            <GridItem bgColor="black" style={border}>
                <p> hi </p>
            </GridItem>
            <GridItem bgColor="grey.500" style={border}>
                <p> hi </p>
            </GridItem>
            <GridItem bgColor="grey.500" style={border}>
                <p> hi </p>
            </GridItem>
 
        </Grid>
    )
}

export default RentalDash
