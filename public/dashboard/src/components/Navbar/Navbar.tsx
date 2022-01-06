import { Box, Flex, ListItem, UnorderedList } from "@chakra-ui/layout";
import React, { ReactNode } from "react";

export function Sidebar({ children }: { children: ReactNode }) {
  return (
    <Box
      bgColor="gray.500"
      as="nav"
      width={{ base: "100vw", md: "5rem" }}
      height={{ base: "5rem", md: "100vh" }}
      position="fixed"
      bottom={{base: 0, md: undefined}}
      _hover={{
        md: {
          width: "16rem",
        },
      }}
      sx={
        {
          "&:hover .link-text": {
            display: {md: "block"}
        }
      }}
      transition="width 200ms ease"
      zIndex="1"
      overflow="hidden"
    >
      <Flex
        h="full"
        as={UnorderedList}
        margin="0"
        padding="0"
        styleType="none"
        direction={{ md: "column" }}
        alignItems="center"
        justifyContent={{base: "space-around", md: "flex-start"}}
      >
        {React.Children.map(children, (child) => (
          <ListItem key={"key-"+child?.toString} width={{base: 'auto', md: "full"}}>{child}</ListItem>
        ))}
      </Flex>
    </Box>
  );
}

export default Sidebar;
