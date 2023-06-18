import {
  ChakraProvider,
  ColorModeScript,
  createStandaloneToast,
} from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./Controler/App";
import { apiSlice } from "./Controler/Redux/Features/apiSlice";
import credentialReducer from "./Controler/Redux/Features/credentialSlice";
import { theme } from "./Styles/Theme";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

const { ToastContainer } = createStandaloneToast();
const store = configureStore({
  reducer: {
    token: credentialReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([apiSlice.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
