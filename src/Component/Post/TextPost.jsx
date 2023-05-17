import { Box, Button, HStack, Input, Stack, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FreeMode, Mousewheel, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Question from "../../Pages/Question/Question";
import LikePost from "./LikePost";
import { postContext } from "./PostContainer";
import "./style.css";

const TextPost = () => {
  const { post } = useContext(postContext);
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
          <Text textAlign="left">{post.content}</Text>
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
