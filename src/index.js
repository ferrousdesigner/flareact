import { Honeybadger, HoneybadgerErrorBoundary } from "@honeybadger-io/react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import React from "react"
import App from "./App"
import "./index.css"
import reducer, { initialState } from "./reducer"
import reportWebVitals from "./reportWebVitals"
import { StateProvider } from "./StateProvider"
import { createRoot } from "react-dom/client"
require("dotenv").config()
const domNode = document.getElementById("root")
const root = createRoot(domNode)
const element = document.querySelector(".default")

const mainColor = getComputedStyle(element).getPropertyValue("--theme-color")

const config = {
  apiKey: process.env.REACT_APP_HONEYBADGER_KEY,
  environment: process.env.NODE_ENV,
}

const honeybadger = Honeybadger.configure(config)

let theme = createTheme({
  typography: {
    fontFamily: "Source Sans 3",
  },
  palette: {
    primary: {
      main: mainColor,
    },
  },
})

root.render(
  <HoneybadgerErrorBoundary honeybadger={honeybadger}>
    <StateProvider initialState={initialState} reducer={reducer}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StateProvider>
  </HoneybadgerErrorBoundary>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("firebase-messaging-sw.js")
    .then(register => {
      console.log("Register successfully")
    })
    .catch(() => {
      console.log("Unregister successfully")
    })
} else {
  console.log("Service Worker not supported")
}
