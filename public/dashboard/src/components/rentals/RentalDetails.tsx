import { Flex, Box, HStack, VStack, Input, Text } from "@chakra-ui/react";
import React from "react";
import { Rental } from "../../@types/db-entities";
import Note from "../Note";

function RentalDetails({ rental }: {rental: Rental}) {
  return (
    <Flex>
      <Box flex="2">
        <HStack>{rental.tags}</HStack>
        <Text>Item: {rental.itemId}</Text>
        {rental.kitId && <Text>From kit: {rental.kitId}</Text>}

        <Text>Start: {rental.startDate}</Text>
        <Text>End: {rental.endDate}</Text>
      </Box>

      <VStack flex="1">
        {rental.notes &&
          rental.notes.map((note) => (
            <Note author={note.author}>{note.text}</Note>
          ))}
        <Input></Input>
      </VStack>
    </Flex>
  );
}

export default RentalDetails;
