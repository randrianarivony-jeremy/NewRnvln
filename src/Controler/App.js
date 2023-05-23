import { Box } from "@chakra-ui/react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import "swiper/css";
import "swiper/css/pagination";
import "../Styles/App.css";
import { publicationContext } from "./Context";
import { useFetchContentsQuery } from "./Redux/Features/apiSlice";
import { getContents } from "./Redux/thread.reducer";
import Routes, { Loader } from "./Routes";
import RealtimeSocketContext from "./Socketio/RealtimeSocketContext";

export const apiCall = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api/",
  withCredentials: true,
});

export const socket = io(process.env.REACT_APP_SOCKET_URL);

function App({ user }) {
  const [currentUser, setCurrentUser] = useState(user);
  const [content, setContent] = useState();
  const dispatch = useDispatch();
  const { isSuccess, isLoading, data } = useFetchContentsQuery();

  useEffect(() => {
    localStorage.setItem("for_you_page_current_slide", 0);
    console.log(currentUser);
  }, []);

  useEffect(() => {
    if (isSuccess) dispatch(getContents(data));
  }, [isSuccess]);

  if (isLoading) return <Loader />;
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
          <RealtimeSocketContext>
            <Routes />
          </RealtimeSocketContext>
        </publicationContext.Provider>
      </currentUserContext.Provider>
    </Box>
  );
}

export default App;

export const currentUserContext = createContext();
