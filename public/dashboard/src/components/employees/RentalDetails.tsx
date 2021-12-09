import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/layout";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import type { Rental } from "../../@types/db-entities";
import Note from "../Note"

function RentalDetails({ rental, isOpen, onClose }: { rental: Rental, isOpen: boolean, onClose: any}) {

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Id: {rental._id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Box flex="2">
                <HStack>{rental.tags}</HStack>
                <Text>Item: {rental.itemId}</Text>
                {rental.kitId && <Text>From kit: {rental.kitId}</Text>}

                <Text>Start: {rental.startDate}</Text>
                <Text>End: {rental.endDate}</Text>
              </Box>

              <VStack flex="1">
                {rental.notes && rental.notes.map((note) => (
                  <Note author={note.author}>{note.text}</Note>
                ))}
                <Input></Input>
              </VStack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RentalDetails;
