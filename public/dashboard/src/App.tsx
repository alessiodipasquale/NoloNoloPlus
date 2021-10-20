import * as React from "react"
import {
  ChakraProvider,
} from "@chakra-ui/react"
import LoginForm from "./components/LoginForm"

export const App = () => (
  <ChakraProvider>
    <LoginForm/>
  </ChakraProvider>
)
