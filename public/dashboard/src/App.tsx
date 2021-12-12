import * as React from "react"
import {
  Box,
  ChakraProvider, Container, Flex,
} from "@chakra-ui/react"

import RentalsList from "./components/employees/RentalsList";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";




export const App = () => (
  <Flex
  bg="gray.100">
      <Flex 
      as={'nav'}
      direction="column"
      width="258px"
      height="100vh"
      top="0"
      bg="gray.100">
        <Link to="/clients">Clients</Link>
        <Link to="/inventory" >Inventory</Link>
        <Link to="/employees" >Employees</Link>
        <Link to="/rentals" >Rentals</Link>
      </Flex>
        <Outlet />

  </Flex>
)
