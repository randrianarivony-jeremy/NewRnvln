import { Flex } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import { FreeMode, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import textFit from "textfit";
import { postContext } from "./PostContainer";

const ShortPost = () => {
  const { post } = useContext(postContext);
  const shortContainer = useRef();
  const articleSwiperRef = useRef();

  useEffect(() => {
      textFit(shortContainer.current, {
        minFontSize: 16,
        maxFontSize: 25,
        reProcess: false,
      });
  }, []);

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
          <SwiperSlide>
            <Flex
              ref={shortContainer}
              justify="center"
              height="calc(100% - 40px)"
              marginX={3}
              textAlign="center"
            >
              {post.content}
            </Flex>
          </SwiperSlide>
      </Swiper>
  );
};

export default ShortPost;
