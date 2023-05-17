import { Box, Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import { postContext } from "./PostContainer";
import textFit from "textfit";

const PublicationText = () => {
  const textContainer = useRef();
  const { textOverflow, setTextOverflow, postSwiper, post } =
    useContext(postContext);
  const { colorMode } = useColorMode();

    useEffect(() => {
      textFit(textContainer.current, {
        minFontSize: 16,
        maxFontSize: 25,
        reProcess: false,
      });
        if (
          textContainer.current.clientHeight < textContainer.current.scrollHeight
        ) {
          setTextOverflow(true);
        }
  }, []);
  return (
      <Flex
        ref={textContainer}
        justify="center" textAlign='left'
        align={textOverflow ? "flex-start" : "center"}
        className="tex"
        width={"calc(100% - 24px)"}
        height={"calc(100% - 80px)"}
        overflowY="hidden"
        mixBlendMode="hard-light"
        _after={
          textOverflow && {
            position: "absolute",
            top: 0,
            left: 0,
            bg:"linear-gradient(transparent 50%,#1a202c 90%)",
            // bg:"linear-gradient(transparent 50%,white 100%)",
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
            bottom={8}
            left="50%"
            transform="auto"
            translateX="-50%"
            onClick={() => postSwiper.current.swiper.slideNext()}
          >
            Suite
          </Button>
        )}
      </Flex>
  );
};

export default PublicationText;
