import { Box, Heading, Image, Spinner, Stack, Text } from "@chakra-ui/react";
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
import { useDispatch } from "react-redux";
import { addPublication } from "./Redux/publication.reducer";
import { addInterview } from "./Redux/interview.reducer";
import { addContentFeeds } from "./Redux/thread.reducer";
import RealtimeSocketContext from "./Socketio/RealtimeSocketContext";
import { apiSlice, useFetchContentsQuery } from "./Redux/Features/apiSlice";

export const apiCall = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api/",
  withCredentials: true,
});

export const socket = io(process.env.REACT_APP_SOCKET_URL);

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [content, setContent] = useState();
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();

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
            dispatch(apiSlice.endpoints.fetchContents.initiate());
            setInitializing(false);
          },
          (err) => {
            console.log("tsisy token: " + err);
            setInitializing(false);
          }
        );
    };
    fetchToken();
    localStorage.setItem("for_you_page_current_slide", 0);
  }, []);

  return (
    <Box
      maxW={420}
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
              <Heading size={"xl"}>Ranavalona</Heading>
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
