import { Center, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { Rental } from '../types/bd-entities'
import Note from './Note'

function RentalDetails( {rental} : {rental: Rental}) {
    return (
        <Container>
            <Flex 
            id="notes"
            direction="column" >
                {rental && rental.notes? rental.notes.map(note => <Note>{note}</Note>) : <span>Such empty</span>}
            </Flex>
        </Container>
    )
}

export default RentalDetails
