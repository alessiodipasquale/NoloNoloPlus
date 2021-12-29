import * as React from "react";
import { Box, Flex } from "@chakra-ui/react";

import { Outlet } from "react-router-dom";
import Sidebar from "./components/Navbar/Navbar";

import { FaClipboardList, FaDollyFlatbed, FaIdBadge, FaUserFriends } from "react-icons/fa"
import Navlink from "./components/Navbar/Navlink";

export const App = () => (
  <Box bg="gray.100">
    <Sidebar>
      <Navlink  to="/clients" icon={FaUserFriends}>clients</Navlink>
      <Navlink to="/inventory" icon={FaDollyFlatbed}>inventory</Navlink>
      <Navlink to="/employees" icon={FaIdBadge}>employees</Navlink>
      <Navlink to="/rentals" icon={FaClipboardList}>rentals</Navlink>
    </Sidebar>
    <Box marginLeft="5rem" width="auto">
      <Outlet />
    </Box>
  </Box>
);
