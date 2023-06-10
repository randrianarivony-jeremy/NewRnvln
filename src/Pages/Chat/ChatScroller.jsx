import { Box, Flex } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ScrollableFeed from "react-scrollable-feed";
import { socket } from "../../Controler/App";
import {
  selectMessagesIds,
  useFetchMessagesQuery,
} from "../../Controler/Redux/Features/chatSlice";
import { Loader } from "../../Controler/Routes";
import { chatContext } from "./Chat";
import SingleMessage from "./SingleMessage";

const ChatScroller = () => {
  const { userId } = useParams();
  const { isLoading, isSuccess, isError } = useFetchMessagesQuery(userId);
  const { messages, setMessages, submitting, draft, userB } =
    useContext(chatContext);
  let scrollRef = useRef();
  const messageIds = useSelector((state) => selectMessagesIds(state, userId));

  useEffect(() => {
    socket.on("new message", (newMessage) => {
      setMessages([...messages, newMessage.newMessage]);
    });
  }, [socket]);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <Flex
        align={"center"}
        justify="center"
        height={"100%"}
        textAlign="center"
      >
        <p>
          Une erreur est survenue lors du chargement. Veuillez réessayer plus
          tard.
        </p>
      </Flex>
    );
  if (isSuccess)
    // if (data === undefined) {
    //   display = (
    //     <Flex justify="center" alignItems="center" height="100%">
    //       <Text>Démarrez une nouvelle conversation</Text>
    //     </Flex>
    //   );
    // }
    return (
      <Box
        paddingY={2}
        height="100%"
        overflowY={"hidden"}
        onLoad={() => scrollRef.current.scrollToBottom()}
      >
        <ScrollableFeed
          forceScroll={true}
          className="scrollablefeed"
          ref={scrollRef}
        >
          {messageIds.map((id) => (
            <SingleMessage messageId={id} key={id} />
          ))}
        </ScrollableFeed>
      </Box>
    );
};

export default ChatScroller;
