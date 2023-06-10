import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ScrollableFeed from "react-scrollable-feed";
import {
  selectMessagesIds,
  useFetchMessagesQuery,
} from "../../Controler/Redux/Features/chatSlice";
import { Loader } from "../../Controler/Routes";
import SingleMessage from "./SingleMessage";

const ChatScroller = () => {
  const { userId } = useParams();
  const { isLoading, isSuccess, isError } = useFetchMessagesQuery(userId);
  let scrollRef = useRef();
  const messageIds = useSelector((state) => selectMessagesIds(state, userId));

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
          {messageIds.length > 0 ? (
            messageIds.map((id) => <SingleMessage messageId={id} key={id} />)
          ) : (
            <Flex justify="center" alignItems="center" height="100%">
              <Text>Démarrez une nouvelle conversation</Text>
            </Flex>
          )}
        </ScrollableFeed>
      </Box>
    );
};

export default ChatScroller;
