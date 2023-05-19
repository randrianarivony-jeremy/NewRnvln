import React, { useContext } from "react";
import { Mousewheel, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { interviewContext } from "./Interview";
import InterviewSlide from "./InterviewSlide";

const InterviewSwiper = () => {
  const { questions, swiperRef } = useContext(interviewContext);

  return (
    <Swiper
      ref={swiperRef}
      mousewheel={{ enabled: true, forceToAxis: true }}
      modules={[Pagination, Mousewheel]}
      pagination={{ type: "progressbar" }}
    >
      {questions.data.map((question, index) => (
        <SwiperSlide
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InterviewSlide index={index}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default InterviewSwiper;
