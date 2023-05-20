import { Box, Text, useColorMode } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FreeMode, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { dataContext } from "./PostContainer";

const Description = () => {
  const { data } = useContext(dataContext);
  const [longDescription, setLongDescription] = useState(false);
  const { colorMode } = useColorMode();
  const swiperRef=useRef();

  useEffect(() => {
    swiperRef.current.swiper.update();
  }, [longDescription]);
  return (
    <Box h={"50vh"}>
      <Swiper
      ref={swiperRef}
        modules={[FreeMode,Mousewheel]}
        freeMode={{ enabled: longDescription, momentum: false }}
        mousewheel={true}
        direction='vertical'
        grabCursor={true}
        slidesPerView={"auto"}
      >
        <SwiperSlide style={{height:'fit-content'}}>
          <Text
            fontSize="sm"
            onClick={() => setLongDescription(!longDescription)}
            noOfLines={!longDescription && 2}
            bgColor={
                longDescription &&
                (colorMode === "light" ? "whiteAlpha.800" : "blackAlpha.800")
            }
            paddingX={2}
            paddingY={1}
            rounded="md"
            >
            {data.description}
          </Text>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default Description;
