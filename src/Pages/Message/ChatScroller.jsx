import { Box, Flex, Stack } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

const ChatScroller = () => {
//   const [messages, setMessages] = useState([
  const messages=[
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora sed",
    "dolorum velit inventore eius praesentium minima repudiandae atque placeat",
    "laborum error, doloribus illum vero, libero tempore, esse facilis",
    "consectetur similique. Inventore pariatur, voluptate dolorem recusandae",
    "ad, nesciunt minima labore ut modi quia excepturi ducimus, eius porro",
    "corrupti saepe quod voluptatum iure quisquam non error. Corrupti dolorem",
    "quaerat impedit nostrum minus inventore eius. Et quae fuga, est architecto",
    "perferendis, ratione voluptatibus suscipit vero ipsa at, veritatis non!",
    "Esse corporis velit, officiis atque hic dolore molestias fuga deleniti sit",
    "temporibus officia provident dignissimos blanditiis saepe alias",
    "exercitationem odio facilis. Animi, atque blanditiis.",
    "exercitationem",
  ];
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <Stack height="100%" overflowY="scroll" paddingBottom={2}
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      {messages.map((elt, key) => (
        <Flex key={key} justify={key % 2 === 1 ? "flex-end" : "flex-start"}>
          <Box ref={scrollRef} maxW="80%" whiteSpace="pre-wrap" padding="4px 8px" rounded="lg"
            bgColor={key % 2 === 0 ? "bleu" : ""}
            border={key % 2 === 1 ? "1px solid" : ""}
            borderBottomLeftRadius={key % 2 === 0 && 0}
            borderBottomRightRadius={key % 2 === 1 && 0}
          >
            {elt}
          </Box>
        </Flex>
      ))}
    </Stack>
  );
};

export default ChatScroller;
