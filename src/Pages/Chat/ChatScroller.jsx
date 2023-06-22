import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ScrollableFeed from "react-scrollable-feed";
import { Loader } from "../../Component/Miscellanous";
import {
  chatSlice,
  useFetchMessagesQuery,
} from "../../Controler/Redux/Features/chatSlice";
import { useFetchUserQuery } from "../../Controler/Redux/Features/userSlice";
import SingleMessage from "./SingleMessage";

const ChatScroller = () => {
  const { userId } = useParams();
  const toast = useToast();
  let scrollRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: user } = useFetchUserQuery(userId);
  const {
    isLoading,
    isSuccess,
    isError,
    data: messages,
  } = useFetchMessagesQuery(userId);

  useEffect(() => {
    if (
      messages !== null &&
      messages?.ids.every(
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
      dispatch(
        chatSlice.util.invalidateTags([{ type: "Messages", id: userId }])
      );
      navigate("/message");
    }
  }, [messages]);

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
