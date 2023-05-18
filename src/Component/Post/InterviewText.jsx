import { Button, Flex, Stack, Text, useColorMode } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FreeMode, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import textFit from "textfit";
import { postContext } from "./PostContainer";

const InterviewText = () => {
  const { post, containerRef } = useContext(postContext);
  const { colorMode } = useColorMode();
  const textContainer = useRef();
  const [height, setHeight] = useState("100%");
  const shortContainer = useRef();
  const articleSwiperRef = useRef();
  const [expand, setExpand] = useState(false);
  const [textOverflow, setTextOverflow] = useState(false);

  useEffect(() => {
    if (post.contentType === "short")
      textFit(shortContainer.current, {
        minFontSize: 16,
        maxFontSize: 25,
        reProcess: false,
      });
    else setHeight(containerRef.current.clientHeight - 160);
  }, []);

  // useEffect(() => {
  //   if (post.contentType !== "short")
  //     textFit(textContainer.current, {
  //       minFontSize: 16,
  //       maxFontSize: 20,
  //     });
  // }, [height]);

  useEffect(() => {
    if (post.contentType !== "short") {
      if (
        textContainer.current.clientHeight < textContainer.current.scrollHeight
      ) {
        setTextOverflow(true);
      } else setTextOverflow(false);
      articleSwiperRef.current.swiper.update();
    }
  }, [expand,height]);

  return (
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
      {post.contentType === "short" ? (
        <SwiperSlide className="short-slide">
          <Flex
            ref={shortContainer}
            justify="center"
            // className="item"
            height="100%" fontSize={'19px'}
            marginX={3}
            textAlign='center'
          >
            {post.content}
          </Flex>
        </SwiperSlide>
      ) : (
        <SwiperSlide className="text-slide">
          <Stack 
        marginX={3}>
            <Text
              textAlign="left"
              onClick={() => setExpand(false)}
              height={expand ? "100%" : height}
              ref={textContainer}
              mixBlendMode="hard-light"
              _after={
                textOverflow && {
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  bg:
                    colorMode === "dark"
                      ? "linear-gradient(transparent 50%,#1a202c 100%)"
                      : "linear-gradient(transparent 50%,white 100%)",
                  content: "''",
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }
              }
            >
              {post.content}
            </Text>
            {textOverflow && (
              <Button
                position="absolute"
                zIndex={1}
                bottom={0}
                left="50%"
                transform="auto"
                translateX="-50%"
                onClick={() => setExpand(true)}
              >
                Suite
              </Button>
            )}
          </Stack>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default InterviewText;
