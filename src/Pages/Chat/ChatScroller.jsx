import { Box, Flex, HStack } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { ellipseOutline } from "ionicons/icons";
import React, { useContext, useEffect, useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { socket } from "../../Controler/App";
import { chatContext } from "./Chat";
import DataDisplay from "./DataDisplay";
import SingleMessage from "./SingleMessage";

const ChatScroller = () => {
  const { messages, scrollRef, setMessages, submitting, draft } =
    useContext(chatContext);

  useEffect(() => {
    socket.on("new message", (newMessage) => {
      setMessages([...messages, newMessage.newMessage]);
    });
  }, [socket]);

  return (
    <Box paddingY={2} height="100%" overflowY={"hidden"}>
      <ScrollableFeed
        forceScroll={true}
        className="scrollablefeed"
        ref={scrollRef}
      >
        {messages.map((elt, key) => (
          <SingleMessage message={elt} key={key} />
        ))}
        {submitting && (
          <HStack justify="flex-end" align="flex-end">
            <DataDisplay data={draft.current} />
            <Box fontSize="xs">
              <IonIcon icon={ellipseOutline} />
            </Box>
          </HStack>
        )}
      </ScrollableFeed>
    </Box>
  );
};

export default ChatScroller;
