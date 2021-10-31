import * as React from "react"
import {
  ChakraProvider,
} from "@chakra-ui/react"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LoginForm from "./components/LoginForm"
import NavItem from "./components/Navbar/NavItem"
import {ViewIcon} from "@chakra-ui/icons" 
import Sidebar from "./components/Navbar/Navbar"
import NavbarItems from "./components/Navbar/SidebarData";


export const App = () => (
  
  <ChakraProvider>
    <Router>
      <LoginForm/>
      <Switch>
      </Switch>
    </Router>
  </ChakraProvider>
)
