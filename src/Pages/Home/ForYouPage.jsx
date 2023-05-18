import { Box } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import PostContainer from "../../Component/Post/PostContainer";
import QuestionCard from "../Question/QuestionCard";

const ForYouPage = () => {
  const homeSliderRef = useRef();
  const data = useSelector((state) => state.thread[0]);
  return (
    <Swiper ref={homeSliderRef} className="feed-slides" direction="vertical">
      {data?.map((elt) => (
        <SwiperSlide key={elt._id}>
          {elt.type === "question" ? (
            <QuestionCard question={elt} />
          ) : (
            <PostContainer post={elt} homeSlider={homeSliderRef} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ForYouPage;
