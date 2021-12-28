import { IconProps } from "@chakra-ui/icon";
import {
  Box,
  Container,
  Flex,
  ListItem,
  UnorderedList,
  VStack,
} from "@chakra-ui/layout";
import {
  Avatar,
  Button,
  Divider,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { ComponentWithAs } from "@chakra-ui/system";
import React, { ReactNode, useState } from "react";
import { FiMenu } from "react-icons/fi";
import NavItem from "./NavItem";
import palette from "../../palette.json";

import type { NavItemContent } from "./NavItem";
import { FaIcons } from "react-icons/fa";
import styled from "@emotion/styled";

export function Sidebar({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!isOpen);

  return (
    <Box
      bgColor="gray.500"
      as="nav"
      width="5rem"
      height="100vh"
      position="fixed"
      _hover={{
        width: "16rem",
      }}
      sx= {{
        "&:hover .link-text" : {
          display: "block"
        }
      }}
      transition={"width 200ms ease"}
      zIndex="1"
      overflow="hidden"
    >
      <Flex
        h="full"
        as={UnorderedList}
        margin="0"
        padding="0"
        styleType="none"
        direction="column"
        alignItems="center"
      >
        {React.Children.map(children, (child) => (
          <ListItem width="full">{child}</ListItem>
        ))}
      </Flex>
    </Box>
  );
}

export default Sidebar
