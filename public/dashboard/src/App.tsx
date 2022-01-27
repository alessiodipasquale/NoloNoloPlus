import * as React from "react";
import { Box, Button, Link } from "@chakra-ui/react";

import { Outlet } from "react-router-dom";
import Sidebar from "./components/Navbar/Navbar";

import {
  FaClipboardList,
  FaDollyFlatbed,
  FaIdBadge,
  FaUserFriends,
} from "react-icons/fa";
import Navlink from "./components/Navbar/Navlink";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "./components/Login/AuthProvider";

export const App = () => {
  const { signout } = useAuth();

  return (
    <Box bg="gray.100">
      <Sidebar>
        <Navlink to="/clients" icon={FaUserFriends}>
          clients
        </Navlink>
        <Navlink to="/inventory" icon={FaDollyFlatbed}>
          inventory
        </Navlink>
        <Navlink to="/employees" icon={FaIdBadge}>
          employees
        </Navlink>
        <Navlink to="/rentals" icon={FaClipboardList}>
          rentals
        </Navlink>

        <Navlink to="/" onClick={(e) => signout()} icon={AiOutlineLogout}>
          log out
        </Navlink>
      </Sidebar>

      <Box marginLeft={{ md: "5rem" }} marginBottom={{ base: "5rem", md: 0 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
