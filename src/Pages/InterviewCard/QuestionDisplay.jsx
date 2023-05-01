import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FreeMode, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const QuestionDisplay = ({ question }) => {
  const [expandQuestion, setExpandQuestion] = useState(false);
  const questionContainer = useRef();
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    if (
      questionContainer.current.clientHeight <
      questionContainer.current.scrollHeight
    ) {
      setOverflow(true);
    }
  }, []);
  return (
    <>
      {expandQuestion ? (
        <Box
          height="50%"
        //   height="calc(100% - 120px)"
          position="absolute"
          zIndex={2}  marginX={3}
          bgColor="white"
          border="1px solid"
          rounded="lg"
          padding={1}
          onClick={() => setExpandQuestion(!expandQuestion)}
          top={10}
        >
          <Swiper
            direction="vertical"
            slidesPerView={"auto"}
            freeMode={{ enabled: true }}
            mousewheel={{ enabled: true, forceToAxis: true }}
            modules={[FreeMode, Mousewheel]}
          >
            <SwiperSlide>{question}</SwiperSlide>
          </Swiper>
        </Box>
      ) : (
        <Text
          ref={questionContainer}
          position="absolute"
          zIndex={2}
          bgColor="white"
          top={10} marginX={3}
          noOfLines={!expandQuestion && 2}
          border="1px solid"
          rounded="lg"
          padding={1}
          onClick={() => setExpandQuestion(!expandQuestion)}
        >
          {question}
        </Text>
      )}
    </>
  );
};

export default QuestionDisplay;
