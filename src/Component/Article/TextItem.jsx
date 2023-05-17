import { Button, Stack, Text, useColorMode } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FreeMode, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { postContext } from "../Post/PostContainer";

const TextItem = () => {
  const { post } = useContext(postContext);
  const {colorMode}=useColorMode();
  const textContainer = useRef();
  const articleSlideRef = useRef();
  const [textOverflow, setTextOverflow] = useState(false);

  useEffect(() => {
    if (textContainer.current.clientHeight < textContainer.current.scrollHeight) {
      setTextOverflow(true);
    } else setTextOverflow(false);
  }, []);

  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={"auto"}
      freeMode={{enabled:true,momentum:false}}
      mousewheel={{enabled:true,forceToAxis:true}}
      modules={[FreeMode, Mousewheel]}
      className='article-swiper'
    >
      <SwiperSlide className="article-slide" ref={articleSlideRef}>
        <Stack>
          <Text textAlign="left"
            ref={textContainer} overflowY='hidden'
            // height={"calc(100vh - 120px)"}
          mixBlendMode="hard-light"
          _after={{
              position: "absolute",
              bottom: 0,
              left: 0,
              bg: colorMode==='dark' ? "linear-gradient(transparent 50%,#1a202c 90%)" :
              "linear-gradient(transparent 50%,white 90%)",
              content: "''",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }
          }>
            {post.content}
            {post.content}
            {/* {post.content}
            {post.content}
            {post.content}
            {post.content}
            {post.content}
            {post.content}
            {post.content} */}
            </Text>
            {/* {textOverflow && ( */}
              <Button
                // position="absolute"
                // zIndex={1}
                // bottom={0}
                // left="50%"
                // transform="auto"
                // translateX="-50%"
                onClick={() => setTextOverflow(false)}
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
