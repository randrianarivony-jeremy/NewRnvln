import { Flex, Stack } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import { FreeMode, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import textFit from "textfit";
import { dataContext, postContext } from "./PostContainer";
import QuestionSlider from "./QuestionSlider";

const ShortPost = () => {
  const { data,index } = useContext(dataContext);
  const {post}=useContext(postContext);
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
          <Stack
              height="calc(100% - 50px)">
            {post.type==='interview' && <QuestionSlider question={post.question} index={index}/>}
            <Flex className="hey"
              ref={shortContainer}
              justify="center" align={'center'}
              marginX={3} height={post.type==='interview' ? 'calc(100% - 46px)' : '100%'}
              textAlign="center"
            >
              {data.content}
            </Flex>
          </Stack>
          </SwiperSlide>
      </Swiper>
  );
};

export default ShortPost;
