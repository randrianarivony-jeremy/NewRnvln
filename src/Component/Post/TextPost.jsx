import { Box, Button, HStack, Input, Stack, Text, useColorMode } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FreeMode, Mousewheel, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Question from "../../Pages/Question/Question";
import LikePost from "./LikePost";
import { postContext } from "./PostContainer";
import "./style.css";

const TextPost = () => {
  const { post } = useContext(postContext);
  const {colorMode}=useColorMode();
  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={"auto"}
      freeMode={{enabled:true,momentum:false}}
      mousewheel={true}
      modules={[FreeMode, Mousewheel]}
      className="mySwiper"
    >
      <SwiperSlide>
        <Stack marginX={3}>
          <Text textAlign="left"
          mixBlendMode="hard-light"
          _after={{
              position: "absolute",
              bottom: 0,
              left: 0,
              bg: colorMode==='dark' ? "linear-gradient(transparent 50%,#1a202c 90%)" :
              "linear-gradient(transparent 50%,white 90%)",
              content: "''",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }
          }>
            {post.content}
            {post.content}
          </Text>
          <Text textAlign="left" fontSize="sm" fontStyle="italic">
            15k likes <span className="bi-heart"></span>
          </Text>
          <HStack>
            <Button className="bi-heart"></Button>
            <Input placeholder="Ajouter un commentaire" />
            <Button variant="float" className="bi-send"></Button>
          </HStack>
        </Stack>
      </SwiperSlide>
    </Swiper>
  );
};

export default TextPost;
