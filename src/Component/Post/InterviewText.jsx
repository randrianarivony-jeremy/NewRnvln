import { Box, Button, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import Question from "../Question";
import { postContext } from "./PostContainer";

const InterviewText = ({ post }) => {
  const textContainer = useRef();
  const { textOverflow, setTextOverflow,postSwiper } = useContext(postContext);

  useEffect(() => {
    if (
      textContainer.current.clientHeight < textContainer.current.scrollHeight
    ) {
      setTextOverflow(true);
    }
  }, []);

  return (
    <>
      <Box position="absolute" zIndex={1} top={10} left={0} marginX={3}>
        <Question question={post.question} />
      </Box>
      <Box
        position="relative"
        color={post.bg !== "transparent" && "black"}
        overflowY="hidden"
        mixBlendMode="hard-light"
        fontSize="xl"
        ref={textContainer}
        maxHeight="calc(100% - 200px)"
        width="100%"
        marginBottom={10}
        marginX={3}
        _after={
          textOverflow && {
            position: "absolute",
            top: 0,
            left: 0,
            bg: "linear-gradient(transparent 50%,gray 100%)",
            content: "''",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }
        }
      >
        {post.content}
        {textOverflow && (
          <Button
            position="absolute"
            zIndex={1}
            color="black"
            bottom={0}
            left="50%"
            transform="auto"
            translateX="-50%"
            onClick={()=>postSwiper.current.swiper.slideNext()}
          >
            Suite
          </Button>
        )}
      </Box>
    </>
  );
};

export default InterviewText;
