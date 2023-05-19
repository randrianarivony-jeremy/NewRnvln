import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FreeMode, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import textFit from "textfit";
import { postContext } from "../Post/PostContainer";

const TextItem = () => {
  const { post, containerRef } = useContext(postContext);
  const textContainer = useRef();
  const [height, setHeight] = useState("100%");
  const shortContainer = useRef();
  const articleSwiperRef = useRef();
  const [expand, setExpand] = useState(false);
  const [textOverflow, setTextOverflow] = useState(false);

  useEffect(() => {
    let nbLine = Math.trunc((containerRef.current.clientHeight - 100) / 24);
    setHeight(24 * nbLine);
  }, []);

  useEffect(() => {
    if (
      textContainer.current.clientHeight < textContainer.current.scrollHeight
    ) {
      setTextOverflow(true);
    } else setTextOverflow(false);
    articleSwiperRef.current.swiper.update();
  }, [expand, height]);

  return (
    <Box height={height}>
      <Swiper
        ref={articleSwiperRef}
        direction={"vertical"}
        touchReleaseOnEdges={true}
        slidesPerView={"auto"}
        freeMode={{ enabled: true, momentum: false }}
        mousewheel={true}
        grabCursor={true}
        modules={[FreeMode, Mousewheel]}
        className="article-swiper"
      >
        <SwiperSlide className="text-slide">
          <Stack height={expand ? "100%" : height} marginX={3} spacing={0}>
            <Text
              textAlign="left"
              onClick={() => setExpand(false)}
              ref={textContainer}
              overflowY="clip"
              height={"100%"}
            >
              {post.content}
              {post.content}
              {post.content}
            </Text>
            {textOverflow && (
              <Button
                variant="link"
                width="fit-content"
                onClick={() => setExpand(true)}
              >
                Suite
              </Button>
            )}
          </Stack>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default TextItem;
