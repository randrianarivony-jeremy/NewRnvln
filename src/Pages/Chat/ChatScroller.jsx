import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ScrollableFeed from "react-scrollable-feed";
import { ErrorRender, Loader } from "../../Component/Miscellanous";
import {
  useCheckUnseenMessageMutation,
  useFetchConversationQuery,
  useFetchMessagesQuery,
} from "../../Controler/Redux/Features/chatSlice";
import SingleMessage from "./SingleMessage";

const ChatScroller = () => {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  let scrollRef = useRef();
  const { data: conversation, isSuccess: conversationSuccess } =
    useFetchConversationQuery(userId);
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data: messages,
  } = useFetchMessagesQuery(userId);
  const [checkUnseenMessage] = useCheckUnseenMessageMutation();

  useEffect(() => {
    if (conversationSuccess && conversation !== null)
      checkUnseenMessage({ conversationId: conversation._id, category });
  }, [conversationSuccess, messages]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorRender isError={isError} error={error} />;
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
          {messages.ids.length === 0 ? (
            <Flex justify="center" alignItems="center" height="100%">
              <Text>Démarrez une nouvelle conversation</Text>
            </Flex>
          ) : (
            messages.ids.map((id) => <SingleMessage messageId={id} key={id} />)
          )}
        </ScrollableFeed>
      </Box>
    );
};

export default ChatScroller;
