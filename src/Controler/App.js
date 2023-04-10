import { Box } from "@chakra-ui/react";
import "../Styles/App.css";
import "swiper/css";
import Routes from "./Routes";
import audio from "../Assets/audio.m4a";
import video from "../Assets/video.mp4";
import image from "../Assets/image.jpg";
import { useState } from "react";
import { publicationContext } from "./Context";

function App() {
  const [content, setContent] = useState();
  return (
    <Box
      width="100%"
      maxW={420}
      className="app"
      height="100vh"
      position="relative"
      margin="auto"
    >
      <publicationContext.Provider value={{ content, setContent }}>
        <Routes />
      </publicationContext.Provider>
    </Box>
  );
}

export default App;

export const data = [
  {
    content: "Slide 1",
    contentType: "string",
    bg: "gradient1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim! Lorem ipsum do sit amet consectetur adipisicing elit. Provident, enim!",
  },
  {
    content: audio,
    contentType: "audio_url",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim!",
  },
  {
    content: "Slide 1",
    contentType: "string",
    bg: "gradient2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim!",
  },
  {
    content: video,
    contentType: "video_url",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim!",
  },
  {
    content: "Slide 1",
    contentType: "string",
    bg: "gradient3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim!",
  },
  {
    content: image,
    contentType: "image_url",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim!",
  },
  {
    content: "Slide 1",
    contentType: "string",
    bg: "gradient4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim!",
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
