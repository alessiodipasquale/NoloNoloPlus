import * as React from "react"
import {
  ChakraProvider,
} from "@chakra-ui/react"

import EmployeeHistory from "./components/employees/EmployeeHistory";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";




export const App = () => (
  <>
      <nav>
        <Link to="/clients">Clients</Link>
        <Link to="/inventory" >Inventory</Link>
        <Link to="/employees" >Employees</Link>
      </nav>
      <Outlet />
  </>
)
