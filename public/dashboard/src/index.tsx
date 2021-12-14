import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import * as React from "react"
import ReactDOM from "react-dom"
import { App } from "./App"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Clients from "./routes/Clients"
import Inventory from "./routes/Inventory"
import Employees from "./routes/Employees"
import Rentals from "./routes/Rentals"

console.log(process.env)

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/clients" element={<Clients />}/>
            <Route path="/inventory" element={<Inventory />}/>
            <Route path="/employees" element={<Employees />}/>
            <Route path="/rentals" element={<Rentals />}/>

          </Route>
        </Routes>
      </BrowserRouter>

    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
