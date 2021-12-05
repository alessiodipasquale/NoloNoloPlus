import { Box, Container, Flex, Heading, HStack, VStack } from '@chakra-ui/layout'
import React from 'react'

import type { Rental } from '../../types/bd-entities'
 
function RentalDetails({ Rental } : {Rental : Rental}) {
    return (
        <Flex>
            <Box flex="2">
                <Heading>{Rental._id}</Heading>
                <HStack>{Rental.tags}</HStack>
            </Box>


            <VStack flex="1">
                {Rental.notes.map(note=> <p>{note}</p>)}

            </VStack>
            
        </Flex>
    )
}

export default RentalDetails