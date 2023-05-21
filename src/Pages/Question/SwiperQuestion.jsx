import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { IonIcon } from "@ionic/react";
import { add, remove } from "ionicons/icons";
import { questionContext } from "./Question";
import InputCard from "./InputCard";

const SwiperQuestion = () => {
  const {
    swiperRef,
    questionsArray,
    setQuestionsArray,
    colorIndex,
    setColorIndex,
    colors,
    slideEvent,
  } = useContext(questionContext);

  const appendQuestion = () => {
    let mirror = [...questionsArray];
    mirror.splice(
      swiperRef.current.swiper.activeIndex + 1,
      0,
      "Ecrire quelque chose"
    );
    setQuestionsArray(mirror);
    slideEvent.current = "add";
  };

  const removeQuestion = () => {
    let mirror = [...questionsArray];
    mirror.splice(swiperRef.current.swiper.activeIndex, 1);
    setQuestionsArray(mirror);
    slideEvent.current = "remove";
  };

  useEffect(() => {
    if (slideEvent.current === "add")
      swiperRef.current.swiper.slideTo(
        swiperRef.current.swiper.activeIndex + 1
      );
  }, [questionsArray]);

  return (
    <Flex paddingX={3} height="100%">
      <Swiper
        ref={swiperRef}
        modules={[Pagination]}
        pagination={{ type: "progressbar" }}
      >
        {questionsArray.map((question, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <InputCard question={question} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Stack
        position={"absolute"}
        top={12}
        right={3}
        align="center"
        zIndex={1}
        spacing={3}
      >
        <Button
          onClick={appendQuestion}
          paddingX={0}
          boxSize={12}
          rounded="full"
          bgColor={'blackAlpha.400'}
        >
          <IonIcon icon={add} style={{ fontSize: "40px" }} />
        </Button>
        <Button
          onClick={removeQuestion}
          isDisabled={questionsArray.length < 2}
          boxSize={12}
          rounded="full"
          bgColor={'blackAlpha.400'}
          paddingX={0}
        >
          <IonIcon icon={remove} style={{ fontSize: "30px" }} />
        </Button>
        <Box
          bg={colors.current[colorIndex + 1]}
          rounded="full"
          onClick={() =>
            colorIndex == 9
              ? setColorIndex(0)
              : setColorIndex((current) => current + 1)
          }
          boxSize={12}
          border={"1px solid"}
        ></Box>
      </Stack>
    </Flex>
  );
};

export default SwiperQuestion;
