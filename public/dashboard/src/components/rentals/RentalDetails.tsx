import {
  Flex,
  Box,
  HStack,
  VStack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import {Text} from "@chakra-ui/layout"
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
      header: "End",
      value: format(new Date(rental.endDate), "yyyy-MM-dd"),
    },
    {
      header: "Start",
      value: format(new Date(rental.startDate), "yyyy-MM-dd"),
    },
    {
      header: "Kit",
      value: rental.kitId,
    },
    {
      header: "Was returned?",
      value: rental.returnCertification ? "yes" : "no",
    },
    {
      header: "Status",
      value: rental.state,
    },
  ];

  const notes = rental.notes.filter((note) => note.text && note.text.trim());
  console.log(notes)

  return (
    <Flex width="full" marginTop="1rem">
      <Box flex="3">
        <HStack>{rental.tags}</HStack>
        <VStack align="left">
          <UnorderedList
            listStyleType="none"
            display="flex"
            flexDirection="column"
            sx={{ gap: "1rem" }}
          >
            {details.map(({ header, value }) => (
              <ListItem key={`key-${header}`}  >
                <Text
                  fontWeight="600"
                  color="gray.500"
                  w="12rem"
                  display="inline-block"
                >
                  {header}
                </Text>
                <Text as="span">{value}</Text>
              </ListItem>
            ))}
          </UnorderedList>
        </VStack>
      </Box>

      <VStack flex="1" spacing="12px">
        {notes.length ? (
          notes.map((note) => <Note author={note.author}>{note.text}</Note>)
        ) : (
          <Text>No notes to display</Text>
        )}
      </VStack>
    </Flex>
  );
}

export default RentalDetails;
