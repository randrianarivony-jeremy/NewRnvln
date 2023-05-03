import React, { useContext, useEffect } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { questionContext } from "./AskQuestion";
import InputQuestion from "./InputQuestion";
import 'swiper/css/navigation'

const SliderQuestion = () => {
  const { swiperRef, swiperSlideArray } = useContext(questionContext);

  useEffect(() => {
    //each time slide get appended or pulled
    swiperRef.current.swiper.update();
    swiperRef.current.swiper.updateSlides();
    swiperRef.current.swiper.slideTo(swiperSlideArray.length);
  }, [swiperSlideArray]);

  return (
    <Swiper
      ref={swiperRef} navigation={true}
      modules={[Pagination,Navigation]}
      pagination={{ type: "progressbar" }}
    >
      {swiperSlideArray.map((slide, key) => (
        // <SwiperSlide key={key}><InputQuestion/></SwiperSlide>
        <SwiperSlide key={key}>{slide.slide}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderQuestion;
