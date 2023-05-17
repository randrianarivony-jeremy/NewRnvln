import { Avatar, HStack, Image } from "@chakra-ui/react";
import React from "react";
import { Autoplay, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../Styles/swipers.css";

const QuestionSlider = ({ question }) => {
  // slider transition speed 
  //counting word number inside the question, divide by two supposed user reads 2 words per second
  const speed = question.data.split(' ').length/2*1000;

  return (
    <HStack width="100%" bgColor={'blackAlpha.500'} height={12} paddingX={2}>
      {question.interviewer.picture ? (
            <Image
              src={question.interviewer.picture}
              alt="profile_pic"
              boxSize={10} minW={10}
              rounded="full"
              objectFit="cover"
            />
          ) : (
            <Avatar size="md"/>
          )}
      <Swiper
        modules={[FreeMode, Autoplay]}
        slidesPerView="auto"
        spaceBetween={100}
        direction="horizontal"
        freeMode={{ enabled: true, momentum: false }}
        loop={true}
        speed={speed}
        className="question-swiper"
        grabCursor={true}
        autoplay={{ delay: 0, disableOnInteraction: false,pauseOnMouseEnter:true }}
      >
        {/* yes both swiperslides are the same but loop won't work with just one */}
        <SwiperSlide className="question-slide">
            {question.data}
        </SwiperSlide>
        <SwiperSlide className="question-slide">
            {question.data}
        </SwiperSlide>
      </Swiper>
    </HStack>
  );
};

export default QuestionSlider;
