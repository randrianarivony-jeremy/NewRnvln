import { Button } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import QuestionCard from "../Question/QuestionCard";
import PostContainer from "../StandalonePost/PostContainer";

const ForYouPage = () => {
  const homeSliderRef = useRef();
  const data = useSelector((state) => state.thread[0]);

  useEffect(() => {
    homeSliderRef.current.swiper.setProgress(
      localStorage.getItem("for_you_page_current_slide"),
      0
    );
  }, []);

  return (
    <Swiper
      ref={homeSliderRef}
      className="feed-slides"
      direction="vertical"
      modules={[Keyboard, Mousewheel]}
      keyboard={true}
      onSlideChange={({ activeIndex }) =>
        localStorage.setItem(
          "for_you_page_current_slide",
          activeIndex / data.length
        )
      }
      mousewheel={{ enabled: true, forceToAxis: true }}
    >
      {data?.map((elt) => (
        <SwiperSlide key={elt._id}>
          {elt.type === "question" ? (
            <QuestionCard questions={elt} />
          ) : (
            <PostContainer post={elt} homeSlider={homeSliderRef} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ForYouPage;
