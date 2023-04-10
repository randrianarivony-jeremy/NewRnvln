import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { theme } from "./Styles/Theme";
import App from "./Controler/App";

const { ToastContainer } = createStandaloneToast();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
      <ToastContainer />
    </ChakraProvider>
  </React.StrictMode>
);
