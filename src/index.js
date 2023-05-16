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

const { ToastContainer } = createStandaloneToast();
const store = configureStore({
  reducer: { thread: threadReducer,interviews:interviewReducer },
});
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
