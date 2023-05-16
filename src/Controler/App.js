import { Box, Image, Spinner, Stack, Text } from "@chakra-ui/react";
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

export const apiCall = axios.create({
  baseURL: process.env.REACT_APP_API_URL+'/api/',
  withCredentials:true
})

export const socket = io(process.env.REACT_APP_SOCKET_URL);

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [content, setContent] = useState();
  const [initializing, setInitializing] = useState(true);
  const [step, setStep] = useState(['initial']);
  const dispatch = useDispatch();
  
  const fetchToken = async () => {
    setStep([...step,'fetchtoken']);
    await apiCall
      .get(process.env.REACT_APP_API_URL + "/jwtid", { withCredentials: true })
      .then(
        (res) => {
          setStep([...step,'fetchtoken success']);
          fetchData();
          socket.emit("start", res.data._id);
          setCurrentUser(res.data);
        },
        (err) => {
          setStep([...step,'fetchtoken failed']);
          console.log("tsisy token: " + err);
          setInitializing(false);
        }
        );
      };
      
      const fetchData = async () => {
        setStep([...step,'fetchdata']);
        await apiCall.get("publication")
        .then((res) => {
          setStep([...step,'fetchdata success']);
          if (res.data.length!==0){
            dispatch(addContentFeeds(res.data));
            dispatch(addPublication(res.data));
            dispatch(addInterview(res.data));
          }
          setInitializing(false);
        },err=>{
          setStep([...step,'fetchdata failed']);
          setInitializing(false);
        console.log(err)
      });
  };

  useEffect(()=>{
    fetchToken();
  },[])

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
              <Spinner speed="0.7s" />
              {step.map((elt,key)=><Text key={key}>{elt}</Text>)}
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
