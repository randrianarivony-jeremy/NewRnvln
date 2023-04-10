import { Button, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import ChatScroller from "./ChatScroller";
import ChatInput from "./ChatInput";

const Chat = () => {
  const navigate = useNavigate();
  let messages = [
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
  return (
    <Stack height='100%' padding='0 12px 8px 12px' position='relative'>
      <Flex borderBottom='1px solid' borderBottomColor='whiteAlpha.500'>
        <Button variant='float' className="bi-arrow-left" onClick={() => navigate(-1)}></Button>
        <Button>Usename</Button>
      </Flex>
      <ChatScroller data={messages} />
      <ChatInput />
    </Stack>
  );
};

export default Chat;
