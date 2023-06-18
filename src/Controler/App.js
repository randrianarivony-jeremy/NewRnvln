import { Box, Heading, Image, Spinner, Stack } from "@chakra-ui/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Styles/App.css";
import "swiper/css";
import "swiper/css/pagination";
import Routes from "./Routes";
import { createContext, useEffect, useRef, useState } from "react";
import { publicationContext } from "./Context";
import axios from "axios";
import io from "socket.io-client";
import logo from "../Assets/RANAVALONA.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewMainMessage,
  setNewNotification,
  setNewSecondMessage,
} from "./Redux/Features/credentialSlice";

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
  const { newMainMessage, newSecondMessage, newNotification } = useSelector(
    (state) => state.token
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = () => {
      axios
        .get(process.env.REACT_APP_API_URL + "/check_user", {
          withCredentials: true,
        })
        .then(
          (res) => {
            if (res.data !== "") {
              //refresh token present
              dispatch(setNewMainMessage(res.data.newMainMessage));
              dispatch(setNewSecondMessage(res.data.newSecondMessage));
              dispatch(setNewNotification(res.data.newNotification));
              socket.emit("start", res.data.user._id);
              setCurrentUser(res.data.user);
            }
          },
          (err) => {
            //bad refresh token
            console.log("bad token: " + err);
          }
        )
        .finally(() => setInitializing(false));
    };
    fetchToken();
    localStorage.setItem("home_slide_position", 0);
  }, []);

  useEffect(() => {
    socket.on("new message", ({ category }) => {
      if (category == "main") dispatch(setNewMainMessage(newMainMessage + 1));
      else dispatch(setNewSecondMessage(newSecondMessage + 1));
    });
    socket.on("new notification", () =>
      dispatch(setNewNotification(newNotification + 1))
    );
  });

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
    </Box>
  );
}

export default App;
