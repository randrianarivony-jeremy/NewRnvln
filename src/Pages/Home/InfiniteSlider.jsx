import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PostContainer from "../../Component/Post/PostContainer";
import { data } from "../../Controler/App";

const InfiniteSlider = () => {
  const homeSliderRef = useRef();

  return (
    <Swiper ref={homeSliderRef} className="feed-slides" direction="vertical">
      {data.map((elt, key) => (
        <SwiperSlide key={key}>
          <PostContainer post={elt} homeSlider={homeSliderRef}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default InfiniteSlider;
