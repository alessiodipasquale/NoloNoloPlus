import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import theme from "./theme/index";
import ClientsDash from "./components/clients/ClientsDash";
import InventoryDash from "./components/inventory/InventoryDash";
import EmployeesDash from "./components/employees/EmployeesDash";
import RentalsDash from "./components/rentals/RentalsDash";
import AuthProvider from "./components/Login/AuthProvider";
import RequireAuth from "./components/Login/RequireAuth";
import LoginPage from "./components/Login/LoginPage";

console.log(process.env);

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter basename="/dashboard">
          <Routes>
            <Route path="/" element={<RequireAuth><App /></RequireAuth>}>
              <Route path="/clients" element={<ClientsDash />} />
              <Route path="/inventory" element={<InventoryDash />} />
              <Route path="/employees" element={<EmployeesDash />} />
              <Route path="/rentals" element={<RentalsDash />} />
              <Route index element={<Navigate to="/rentals" />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
