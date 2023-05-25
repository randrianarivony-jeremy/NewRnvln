import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  ChakraProvider,
  ColorModeScript,
  createStandaloneToast,
} from "@chakra-ui/react";
import { theme } from "./Styles/Theme";
import App from "./Controler/App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import interviewReducer from "./Controler/Redux/interview.reducer";
import threadReducer from "./Controler/Redux/thread.reducer";
import { apiSlice } from "./Controler/Redux/Features/apiSlice";

const { ToastContainer } = createStandaloneToast();
const store = configureStore({
  reducer: {
    thread: threadReducer,
    interviews: interviewReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([apiSlice.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  // </StrictMode>
);
