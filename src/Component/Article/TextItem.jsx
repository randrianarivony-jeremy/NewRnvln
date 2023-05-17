import { Button, Stack, Text, useColorMode } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FreeMode, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { postContext } from "../Post/PostContainer";

const TextItem = () => {
  const { post } = useContext(postContext);
  const { colorMode } = useColorMode();
  const textContainer = useRef();
  const articleSwiperRef = useRef();
  const [textOverflow, setTextOverflow] = useState(false);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (textContainer.current.clientHeight < textContainer.current.scrollHeight) {
      setTextOverflow(true);
    } else setTextOverflow(false);
    // if (expand) articleSwiperRef.current.swiper.update();
  }, []);

  return (
    <Swiper
    // ref={articleSwiperRef}
      direction={"vertical"}
      slidesPerView={"auto"}
      freeMode={{ enabled: true, momentum: false }}
      mousewheel={true}
      grabCursor={true}
      modules={[FreeMode, Mousewheel]}
      className="article-swiper"
    >
      <SwiperSlide className="article-slide">
        <Stack>
          <Text
            textAlign="left"
            height={"calc(100vh - 120px)"}
            ref={textContainer} overflowY='hidden'
            mixBlendMode="hard-light"
            _after={{
              position: "absolute",
              bottom: 0,
              left: 0,
              bg:colorMode === "dark"
                  ? "linear-gradient(transparent 50%,#1a202c 100%)"
                  : "linear-gradient(transparent 50%,white 100%)",
              content: "''",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >c
            {post.content}
            {post.content}
            {/* {post.content}
            {post.content}
            {post.content}
            {post.content}
            {post.content} */}
          </Text>
          {/* {textOverflow && ( */}
              <Button
                position="absolute"
                zIndex={1}
                bottom={0}
                left="50%"
                transform="auto"
                translateX="-50%"
                // onClick={()=>setTextOverflow(!textOverflow)}
              >
                Suite
              </Button>
            {/* )} */}
        </Stack>
      </SwiperSlide>
    </Swiper>
  );
};

export default TextItem;
