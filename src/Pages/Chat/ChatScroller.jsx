import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScrollableFeed from "react-scrollable-feed";
import { ErrorRender, Loader } from "../../Component/Miscellanous";
import { useFetchMessagesQuery } from "../../Controler/Redux/Features/chatSlice";
import { useFetchUserQuery } from "../../Controler/Redux/Features/userSlice";
import SingleMessage from "./SingleMessage";

const ChatScroller = () => {
  const { userId } = useParams();
  const toast = useToast();
  let scrollRef = useRef();
  const navigate = useNavigate();
  const { data: user } = useFetchUserQuery(userId);
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data: messages,
  } = useFetchMessagesQuery(userId);

  useEffect(() => {
    if (
      isSuccess &&
      messages !== null &&
      messages.ids.every(
        (id) => messages.entities[id].contentType === "deleted"
      )
    ) {
      toast({
        title: "Conversation vide",
        description: `Votre conversation avec ${user.name} a été vide.`,
        status: "info",
        isClosable: true,
        duration: 5000,
      });
      // navigate("/message");
    }
  }, [messages]);

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
          {messages === null || messages?.ids.length === 0 ? (
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
