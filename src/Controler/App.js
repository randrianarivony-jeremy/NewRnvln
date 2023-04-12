import { Box } from "@chakra-ui/react";
import "../Styles/App.css";
import "swiper/css";
import 'swiper/css/pagination';
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
      maxW={420}
      className="app"
      height="100%"
      boxSizing="border-box"
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
    content: "interview slide1",
    contentType: "string",
    bg: "gradient1",
    type:'interview'
  },
  {
    content: video,
    contentType: "video_url",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim!",
      type:'publication'
  },
  {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora sed,dolorum velit inventore eius praesentium minima repudiandae atque placeatlaborum error, doloribus illum vero, libero tempore, esse facilisconsectetur similique. Inventore pariatur, voluptate dolorem recusandae ad, nesciunt minima labore ut modi quia excepturi ducimus, eius porro,corrupti saepe quod voluptatum iure quisquam non error. Corrupti dolorem,quaerat impedit nostrum minus inventore eius. Et quae fuga, est architecto,perferendis, ratione voluptatibus suscipit vero ipsa at, veritatis non!,Esse corporis velit, officiis atque hic dolore molestias fuga deleniti sit,temporibus officia provident dignissimos blanditiis saepe alias,exercitationem odio facilis. Animi, atque blanditiis.,exercitationem",
    contentType: "string",
    bg: "transparent",
    type:'publication'
  },
  {
    content: "interview Slide 3",
    contentType: "string",
    bg: "gradient2",
    type:'interview'
  },
  {
    content: audio,
    contentType: "audio_url",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim!",
      type:'interview'
  },
  {
    content: "Slide 4",
    contentType: "string",
    bg: "gradient3",
    type:'publication'
  },
  {
    content: image,
    contentType: "image_url",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, enim!",
    type:'interview'
    },
  {
    content: "Slide 5",
    contentType: "string",
    bg: "gradient4",
    type:'publication'
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
