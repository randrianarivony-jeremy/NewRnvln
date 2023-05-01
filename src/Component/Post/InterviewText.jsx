import { Box, Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import Question from "../../Pages/Question/Question";
import { postContext } from "./PostContainer";

const InterviewText = () => {
  const textContainer = useRef();
  const {colorMode}=useColorMode();
  const { textOverflow, setTextOverflow,postSwiper,post } = useContext(postContext);

  useEffect(() => {
    if (
      textContainer.current.clientHeight < textContainer.current.scrollHeight
    ) {
      setTextOverflow(true);
    }
  }, []);

  return (
    <Flex height="calc(100% - 150px)" width='100%' align='center' justify='center'>
      {/* <Box position="absolute" textAlign='left' zIndex={1} top={10} left={0} marginX={3}>
        <Question question={post.content.question} />
      </Box> */}
      <Text
        position="relative"
        color={post.content.bg !== "transparent" && "black"}
        fontSize="xl"
        ref={textContainer} height='fit-content'
        maxH='100%'
        width="100%"
        marginX={3}
        mixBlendMode="hard-light"
        _after={
          textOverflow && {
            position: "absolute",
            top: 0,
            left: 0,
            bg:
              (colorMode === "dark" && post.content.bg==='transparent')
                ? "linear-gradient(transparent 40%,#1a202c 80%)"
                : "linear-gradient(transparent 40%,white 80%)",
            content: "''",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }
        }
      >
        {post.content.content}
        {textOverflow && (
          <Button
            position="absolute"
            zIndex={1}
            color="black"
            bottom={8}
            left="50%"
            transform="auto"
            translateX="-50%"
            onClick={()=>postSwiper.current.swiper.slideNext()}
          >
            Suite
          </Button>
        )}
      </Text>
    </Flex>
  );
};

export default InterviewText;
