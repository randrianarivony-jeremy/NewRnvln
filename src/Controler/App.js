import { Box, Heading, Image, Spinner, Stack } from "@chakra-ui/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Styles/App.css";
import "swiper/css";
import "swiper/css/pagination";
import Routes from "./Routes";
import { createContext, useEffect, useState } from "react";
import { publicationContext } from "./Context";
import axios from "axios";
import io from "socket.io-client";
import logo from "../Assets/RANAVALONA.png";
import RealtimeSocketContext from "./Socketio/RealtimeSocketContext";

export const apiCall = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api/",
  withCredentials: true,
});

export const socket = io(process.env.REACT_APP_SOCKET_URL);

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [content, setContent] = useState();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      await apiCall
        .get(process.env.REACT_APP_API_URL + "/jwtid", {
          withCredentials: true,
        })
        .then(
          (res) => {
            socket.emit("start", res.data._id);
            setCurrentUser(res.data);
            setInitializing(false);
          },
          (err) => {
            console.log("tsisy token: " + err);
            setInitializing(false);
          }
        );
    };
    fetchToken();
    localStorage.setItem("home_slide_position", 0);
  }, []);

  return (
    <Box
      maxW={420}
      minH="calc(100vh - 100px)"
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
            <RealtimeSocketContext>
              <Routes />
            </RealtimeSocketContext>
          )}
        </publicationContext.Provider>
      </currentUserContext.Provider>
    </Box>
  );
}

export default App;

export const currentUserContext = createContext();
