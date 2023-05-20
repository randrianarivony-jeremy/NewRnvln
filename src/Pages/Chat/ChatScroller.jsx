import { Box, Flex, HStack } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { socket } from "../../Controler/App";
import { chatContext } from "./Chat";
import DataDisplay from "./DataDisplay";
import SingleMessage from "./SingleMessage";

const ChatScroller = () => {
  const {messages,setMessages,submitting,draft}=useContext(chatContext);

  useEffect(()=>{
    socket.on('new message',(newMessage)=>{
      setMessages([...messages,newMessage.newMessage])
    })
  })

  return (
    <Box paddingY={2} height='100%'>
    <ScrollableFeed forceScroll={true}
    >
      {messages.map((elt, key) => (
        <SingleMessage message={elt} key={key}/>
      ))}
        {submitting && <HStack justify="flex-end" align='flex-end'>
          <Box maxW="80%"
          >
            <DataDisplay data={draft.current}/>
          </Box>
          <Box className="bi-circle" fontSize='xs'></Box>
        </HStack>}
    </ScrollableFeed>
    </Box>
  );
};

export default ChatScroller;
