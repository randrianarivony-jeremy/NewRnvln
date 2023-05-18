import { Avatar, HStack, Image, useColorMode } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Autoplay, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { postContext } from "../../Component/Post/PostContainer";
import "../../Styles/swipers.css";

const QuestionSlider = () => {
  // slider transition speed
  //counting word number inside the question, divide by two supposed user reads 2 words per second
  const { post, showReaction } = useContext(postContext);
  const speed = (post.question.data.split(" ").length / 2) * 1000;
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
      width={
        !showReaction || post.type === "interview"
          ? "100%"
          : "calc(100% - 50px)"
      }
      bgColor={colorMode === "light" ? "whiteAlpha.500" : "blackAlpha.500"}
      height={12}
      paddingX={2}
    >
      {post.question.interviewer.picture ? (
        <Image
          src={post.question.interviewer.picture}
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
        modules={[FreeMode, Autoplay]}
        slidesPerView="auto"
        spaceBetween={100}
        direction="horizontal"
        freeMode={{ enabled: true, momentum: false }}
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
        {/* yes all swiperslides are the same but loop won't work with just one */}
        <SwiperSlide className="question-slide" ref={slideRef}>
          {post.question.data}
        </SwiperSlide>
        {autoplay && (
          <SwiperSlide className="question-slide">{post.question.data}</SwiperSlide>
        )}
      </Swiper>
    </HStack>
  );
};

export default QuestionSlider;
