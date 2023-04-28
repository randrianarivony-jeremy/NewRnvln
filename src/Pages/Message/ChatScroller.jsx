import { Box, Flex, HStack, Stack } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { currentUserContext } from "../../Controler/App";
import { chatContext } from "./Chat";
import DataDisplay from "./DataDisplay";
import SingleMessage from "./SingleMessage";

const ChatScroller = () => {
  const {messages,submitting,draft}=useContext(chatContext);
  const {currentUser}=useContext(currentUserContext);

  return (
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
  );
};

export default ChatScroller;
