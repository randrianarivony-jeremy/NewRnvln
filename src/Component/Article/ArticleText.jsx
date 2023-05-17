import { Box, Button, Flex, useColorMode } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { postContext } from "../Post/PostContainer";
import textFit from "textfit";
import { FreeMode, Mousewheel } from "swiper";

const ArticleText = () => {
  const { post } = useContext(postContext);
  const textContainer = useRef();
  const articleSwiperRef = useRef();
  const [expand, setExpand] = useState(false);
  const [textOverflow, setTextOverflow] = useState(false);
  const {colorMode}=useColorMode();

  useEffect(() => {
    textFit(textContainer.current, {
      minFontSize: 16,
      maxFontSize: 25,
      reProcess: false,
    });
  }, []);

  useEffect(() => {
    if (textContainer.current.clientHeight < textContainer.current.scrollHeight) {
      setTextOverflow(true);
    } else setTextOverflow(false);
    articleSwiperRef.current.swiper.update();
  }, [expand]);

  return (
    <Swiper
      ref={articleSwiperRef}
      modules={[FreeMode,Mousewheel]}
      freeMode={{ enabled: true, momentum: false }}
      mousewheel={true}
      className="article-swiper"
      slidesPerView="auto"
      direction="vertical"
      grabCursor={true}
    >
      <SwiperSlide className="article-slide">
        {post.contentType === "short" ? (
          <Flex
            ref={textContainer}
            justify="center"
            textAlign="left"
            align={textOverflow ? "flex-start" : "center"}
            className="tex"
            width={"calc(100% - 24px)"}
            height={"calc(100% - 80px)"}
          >
            {post.content}
          </Flex>
        ) : (
          <Flex
            ref={textContainer}
            justify="center"
            textAlign="left"
            align={textOverflow ? "flex-start" : "center"}
            className="tex"
            //  onClick={()=>expand && setExpand(false)}
            height={expand ? "100%" : "calc(100vh - 120px)"}
            overflowY="hidden"
            mixBlendMode="hard-light"
            _after={
              textOverflow && {
                position: "absolute",
                top: 0,
                left: 0,
                bg: colorMode==='dark' ? "linear-gradient(transparent 50%,#1a202c 90%)" :
                "linear-gradient(transparent 50%,white 90%)",
                content: "''",
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }
            }
          >
            {post.content}
            {post.content}
            {post.content}
            {post.content}
            {post.content}
            {post.content}
            {post.content}
            {post.content}
            {textOverflow && (
              <Button
                position="absolute"
                zIndex={1}
                bottom={0}
                left="50%"
                transform="auto"
                translateX="-50%"
                onClick={() => setExpand(!expand)}
              >
                Suite
              </Button>
            )}
          </Flex>
        )}
      </SwiperSlide>
    </Swiper>
  );
};

export default ArticleText;
