import "../Styles/App.css";
import { Box, Heading, Image, Spinner, Stack } from "@chakra-ui/react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "swiper/css";
import "swiper/css/pagination";
import logo from "../Assets/RANAVALONA.png";
import RealtimeNotification from "../Component/RealtimeNotification";
import { publicationContext } from "./Context";
import { useInitiateQuery } from "./Redux/Features/authSlice";
import Routes from "./Routes";

export const currentUserContext = createContext();
export const apiCall = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api/",
  withCredentials: true,
});

export const socket = io(process.env.REACT_APP_SOCKET_URL);

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [content, setContent] = useState();
  const [initializing, setInitializing] = useState(true);
  const minHeight = useRef(window.innerHeight);
  const { data, isSuccess, isLoading, isUninitialized } = useInitiateQuery(
    "app",
    { refetchOnReconnect: true }
  );

  useEffect(() => {
    localStorage.setItem("home_slide_position", 0);
  }, []);

  useEffect(() => {
    if (isSuccess && data !== null) setCurrentUser(data.user);
  }, [isSuccess]);

  useEffect(() => {
    if (!isUninitialized && !isLoading) setInitializing(false);
  }, [isLoading, isUninitialized]);

  return (
    <Box
      maxW={420}
      minH={minHeight.current}
      className="app"
      height="100%"
      boxSizing="border-box"
      position="relative"
      margin="auto"
    >
      <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <publicationContext.Provider value={{ content, setContent }}>
          {initializing ? (
            <Stack justify="center" height="100%" align="center">
              <Image src={logo} alt="logo" width="100px" />
              <Heading size={"xl"}>Plusvaloo</Heading>
              <Spinner speed="0.7s" />
            </Stack>
          ) : (
            <Routes />
          )}
        </publicationContext.Provider>
      </currentUserContext.Provider>
      <RealtimeNotification />
    </Box>
  );
}

export default App;
