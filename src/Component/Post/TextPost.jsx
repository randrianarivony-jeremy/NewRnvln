import { Box, Button, Flex, HStack, Input, Stack, Text, useColorMode } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FreeMode, Mousewheel, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Question from "../../Pages/Question/Question";
import LikePost from "./LikePost";
import { postContext } from "./PostContainer";
import textFit from "textfit";
import "./style.css";

const TextPost = () => {
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
    <Swiper ref={articleSwiperRef}
      direction={"vertical"}
      slidesPerView={"auto"}
      freeMode={{enabled:true,momentum:false}}
      mousewheel={true}
      modules={[FreeMode, Mousewheel]}
      className="mySwiper"
    >
      <SwiperSlide>
        {/* <Stack marginX={3}>
          <Text textAlign="left">{post.content}</Text>
          <Text textAlign="left" fontSize="sm" fontStyle="italic">
            15k likes <span className="bi-heart"></span>
          </Text>
          <HStack>
            <Button className="bi-heart"></Button>
            <Input placeholder="Ajouter un commentaire" />
            <Button variant="float" className="bi-send"></Button>
          </HStack>
        </Stack> */}
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
                bottom: 0,
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
      </SwiperSlide>
    </Swiper>
  );
};

export default TextPost;
