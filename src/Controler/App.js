import { Box, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Styles/App.css";
import "swiper/css";
import "swiper/css/pagination";
import Routes from "./Routes";
import audio from "../Assets/audio.m4a";
import video from "../Assets/video.mp4";
import image from "../Assets/image.jpg";
import { createContext, useEffect, useState } from "react";
import { publicationContext } from "./Context";
import axios from "axios";
import io from "socket.io-client";
import logo from "../Assets/RANAVALONA.png";
import { useDispatch } from "react-redux";
import { addPublication } from "./Redux/publication.reducer";
import { addInterview } from "./Redux/interview.reducer";
import { addContentFeeds } from "./Redux/thread.reducer";

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
    console.log('fetch')
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
            <Routes />
          )}
        </publicationContext.Provider>
      </currentUserContext.Provider>
    </Box>
  );
}

export default App;

export const data = [
  {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dolorem officiis illum accusantium. Necessitatibus delectus modi est, temporibus quos, libero suscipit vero tempora sint mollitia fugit et. Corrupti ratione ab, nisi illum aut ad laudantium odio qui repellendus eius iure, aliquid necessitatibus numquam blanditiis, harum natus explicabo in? Odit ullam eos voluptatum sunt! Minus soluta saepe tempora inventore. Incidunt dolorem labore reiciendis! Asperiores minima ea sunt, modi reiciendis sapiente ipsum possimus inventore amet similique? Nostrum atque nulla natus dolor minus! Dignissimos laborum praesentium voluptatibus in. Voluptate delectus commodi consequatur error quos cupiditate consequuntur? Reiciendis totam modi voluptatum illum fugit nesciunt?",
    contentType: "string",
    bg: "gradient1",
    type: "interview",
    question:{
      "_id": "643994845f6aadfbe77f9bd4",
      "interviewer": {
        "_id": "643889777872bd7062e4bf53",
        "name": "Ranavalona",
        "picture": "http://localhost:9199/v0/b/rnvln-611b7.appspot.com/o/profile%2Fpicture%2F168240269886564422e3de720c9c9c685e667?alt=media&token=d70620ce-3c51-4c92-8a89-e7882e3acb8a"
      },
      "data": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dolorem officiis illum accusantium. Necessitatibus delectus modi",
      "bg": "transparent",
      "interviewees": [],
      "createdAt": "2023-04-14T17:59:32.268Z",
      "updatedAt": "2023-04-14T17:59:32.268Z",
      "__v": 0
    }},
  {
    content: video,
    contentType: "video_url",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim!",
    type: "publication",
  },
  {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora sed,dolorum velit inventore eius praesentium minima repudiandae atque placeatlaborum error, doloribus illum vero, libero tempore, esse facilisconsectetur similique. Inventore pariatur, voluptate dolorem recusandae ad, nesciunt minima labore ut modi quia excepturi ducimus, eius porro,corrupti saepe quod voluptatum iure quisquam non error. Corrupti dolorem,quaerat impedit nostrum minus inventore eius. Et quae fuga, est architecto,perferendis, ratione voluptatibus suscipit vero ipsa at, veritatis non!,Esse corporis velit, officiis atque hic dolore molestias fuga deleniti sit,temporibus officia provident dignissimos blanditiis saepe alias,exercitationem odio facilis. Animi, atque blanditiis.,exercitationem",
    contentType: "string",
    bg: "transparent",
    type: "publication",
  },
  {
    content: "interview Slide 3",
    contentType: "string",
    bg: "gradient2",
    type: "publication",
    question: "question quesitons",
  },
  {
    content: audio,
    contentType: "audio_url",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim!",
    type: "interview",
    question:{
      "_id": "643994845f6aadfbe77f9bd4",
      "interviewer": {
        "_id": "643889777872bd7062e4bf53",
        "name": "Ranavalona",
        "picture": "https://firebasestorage.googleapis.com/v0/b/rnvln-611b7.appspot.com/o/profile%2Fpicture%2F1681426804576?alt=media&token=04e991ca-a3d8-41b8-80f9-33e9e18aee27"
      },
      "data": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dolorem officiis illum accusantium. Necessitatibus delectus modi",
      "bg": "transparent",
      "interviewees": [],
      "createdAt": "2023-04-14T17:59:32.268Z",
      "updatedAt": "2023-04-14T17:59:32.268Z",
      "__v": 0
    }},
  {
    content: "Slide 4",
    contentType: "string",
    bg: "gradient3",
    type: "publication",
  },
  {
    content: image,
    contentType: "image_url",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim!",
    type: "interview",
    question:{
      "_id": "643994845f6aadfbe77f9bd4",
      "interviewer": {
        "_id": "643889777872bd7062e4bf53",
        "name": "Ranavalona",
        "picture": "https://firebasestorage.googleapis.com/v0/b/rnvln-611b7.appspot.com/o/profile%2Fpicture%2F1681426804576?alt=media&token=04e991ca-a3d8-41b8-80f9-33e9e18aee27"
      },
      "data": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dolorem officiis illum accusantium. Necessitatibus delectus modi",
      "bg": "transparent",
      "interviewees": [],
      "createdAt": "2023-04-14T17:59:32.268Z",
      "updatedAt": "2023-04-14T17:59:32.268Z",
      "__v": 0
    }},
  {
    content: "Slide 5",
    contentType: "string",
    bg: "gradient4",
    type: "publication",
  },
];

export const followers = [
  { name: "randrianandrasana", job: "cyber" },
  { name: "Rakotomandimby", job: "boucher" },
  { name: "Ravaojanahary", job: "sécurité" },
];
export const followings = [
  { name: "Cédric", job: "juriste" },
  { name: "Ravaonasolo", job: "mpampianatra" },
  { name: "Stéphanie Ravelo" },
  { name: "Jean Narivony", job: "mpanoratra" },
  { name: "Gaelle Roman", job: "dessinatrice" },
];
export const subscribers = [
  { name: "Vahao ny oloko", job: "pasteur" },
  { name: "Andry Rajoelina" },
  { name: "Sylvanno", job: "mpianatra" },
  { name: "Tsiliva" },
];
export const subscriptions = [
  { name: "Microsopt Corp", job: "software engineer" },
  { name: "Mamy Ravatomanga", job: "Sodiat" },
];

export const currentUserContext = createContext();
