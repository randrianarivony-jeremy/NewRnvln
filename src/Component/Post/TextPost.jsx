import { Box, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FreeMode, Mousewheel, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Question from "../Question";
import { postContext } from "./PostContainer";
import "./style.css";

const TextPost = () => {
  const { post } = useContext(postContext);
  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={"auto"}
      freeMode={true}
      mousewheel={true}
      modules={[FreeMode, Mousewheel]}
      className="mySwiper"
    >
      <SwiperSlide>
        <Box marginX={3} marginTop={150}>
          {post.type === "interview" && (
            <Box position="absolute" zIndex={1} top={10} left={0} marginX={3}>
              <Question question={post.question} />
            </Box>
          )}
          <Text textAlign="left">{post.content}</Text>
        </Box>
      </SwiperSlide>
    </Swiper>
  );
};

export default TextPost;
