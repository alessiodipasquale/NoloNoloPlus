import {
  Flex,
  Box,
  HStack,
  VStack,
  Input,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";
import { Rental } from "../../@types/db-entities";
import Note from "./Note";

function RentalDetails({ rental }: { rental: Rental }) {
  const details = [
    {
      header: "Items",
      value: rental.itemId,
    },
    {
      header: "End Date",
      value: rental.endDate,
    },
    {
      header: "Items",
      value: rental.itemId,
    },
  ];

  return (
    <Flex>
      <Box flex="2">
        <HStack>{rental.tags}</HStack>
        <VStack align="left">
          {details.map(({ header, value }) => (
            <UnorderedList>
              <ListItem
              variant="">
                <Text
                  fontWeight="600"
                  color="gray.500"
                  w="100px"
                  display="inline-block"
                >
                  {header}
                </Text>
                <Text as="span">{value}</Text>
              </ListItem>
            </UnorderedList>
          ))}
        </VStack>
      </Box>

      <VStack flex="1" spacing="12px">
        {rental.notes &&
          rental.notes.map((note) => <Note author={note.author} />)}
        <Input></Input>
      </VStack>
    </Flex>
  );
}

export default RentalDetails;
