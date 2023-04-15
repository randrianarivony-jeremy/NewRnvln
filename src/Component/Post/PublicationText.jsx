import { Button, Text, useColorMode } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import { postContext } from "./PostContainer";

const PublicationText = () => {
  const textContainer = useRef();
  const { textOverflow, setTextOverflow, postSwiper, post } =
    useContext(postContext);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (
      textContainer.current.clientHeight < textContainer.current.scrollHeight
    ) {
      setTextOverflow(true);
    }
  }, []);
  return (
    <>
      <Text
        ref={textContainer}
        maxHeight="calc(100% - 100px)"
        fontSize="xl"
        marginX={3} width='100%'
        marginY={2}
        position="relative"
        color={post.bg !== "transparent" && "black"}
        // overflowY="hidden"
        mixBlendMode="hard-light"
        _after={
          textOverflow && {
            position: "absolute",
            top: 0,
            left: 0,
            bg:
              (colorMode === "dark" && post.bg==='transparent')
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
        {textOverflow && (
          <Button
            position="absolute"
            zIndex={1}
            color={post.bg !== "transparent" && "black"}
            bottom={0}
            left="50%"
            transform="auto"
            translateX="-50%"
            onClick={() => postSwiper.current.swiper.slideNext()}
          >
            Suite
          </Button>
        )}
      </Text>
    </>
  );
};

export default PublicationText;
