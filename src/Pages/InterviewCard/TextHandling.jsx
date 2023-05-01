import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FreeMode, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const TextHandling = ({ text }) => {
  const textContainer = useRef();
  const [expanded, setExpanded] = useState(false);
  const [textOverflow, setTextOverflow] = useState(false);

  useEffect(() => {
    if (
      textContainer.current.clientHeight < textContainer.current.scrollHeight
    ) {
      setTextOverflow(true);
    }
  }, []);
  return (
    <Box height="calc(100% - 100px)" pos="absolute" top={100} marginX={3}>
      <Swiper
        direction={expanded ? "vertical" : "horizontal"}
        slidesPerView={"auto"}
        freeMode={{ enabled: true }}
        mousewheel={{ enabled: true, forceToAxis: true }}
        modules={[FreeMode, Mousewheel]}
      >
        <SwiperSlide>
          <Text textAlign='left'
            ref={textContainer}
            mixBlendMode="hard-light"
            height="100%"
            _after={
                textOverflow && !expanded && {
                position: "absolute",
                top: 0,
                left: 0,
                bg: "linear-gradient(transparent 40%,white 90%)",
                content: "''",
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }
            }
            onClick={() => textOverflow ? setExpanded(false) : null}
          >
            {text}
          </Text>
          {textOverflow && !expanded && (
            <Button
              position="absolute"
              zIndex={1}
              color="black"
              bottom={0}
              left="50%"
              transform="auto"
              translateX="-50%"
              onClick={() => setExpanded(true)}
            >
              Suite
            </Button>
          )}
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default TextHandling;
