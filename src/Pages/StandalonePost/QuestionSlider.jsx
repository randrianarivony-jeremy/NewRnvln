import { Avatar, HStack, Image, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../Styles/swipers.css";

const QuestionSlider = ({question,index}) => {
  // slider transition speed
  //counting word number inside the question, divide by two supposed user reads 2 words per second
  const speed = (question.data[index].split(" ").length / 1.5) * 1000;
  const { colorMode } = useColorMode();
  const swiperRef = useRef();
  const slideRef = useRef();
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    if (swiperRef.current.clientWidth < slideRef.current.clientWidth) {
      setAutoplay(true);
      swiperRef.current.swiper.autoplay.start();
    }
  }, [autoplay]);

  return (
    <HStack
      width={"100%"}
      bgColor={colorMode === "light" ? "whiteAlpha.500" : "blackAlpha.500"}
      height={12}
      paddingX={3}
    >
      {question.interviewer.picture ? (
        <Image
          src={question.interviewer.picture}
          alt="profile_pic"
          boxSize={10}
          minW={10}
          rounded="full"
          objectFit="cover"
        />
      ) : (
        <Avatar size="md" />
      )}
      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={100}
        direction="horizontal"
        loop={true}
        speed={speed}
        className="question-swiper"
        grabCursor={true}
        autoplay={
          autoplay
            ? {
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
      >
        {/* yes both swiperslides are the same but loop won't work with just one */}
        <SwiperSlide className="question-slide" ref={slideRef}>
          {question.data[index]} &nbsp;
          <span style={{ fontStyle: "italic", fontWeight: "normal" }}>
            /{question.interviewer.name}_
            {question.interviewer.job && question.interviewer.job}
          </span>
        </SwiperSlide>
        {autoplay && (
          <SwiperSlide className="question-slide">
            {question.data[index]} &nbsp;
            <span style={{ fontStyle: "italic", fontWeight: "normal" }}>
              /{question.interviewer.name}_
              {question.interviewer.job && question.interviewer.job}
            </span>
          </SwiperSlide>
        )}
      </Swiper>
    </HStack>
  );
};

export default QuestionSlider;
