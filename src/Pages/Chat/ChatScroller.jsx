import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ScrollableFeed from "react-scrollable-feed";
import notification from "../../Assets/notification1.mp3";
import { Loader } from "../../Component/Miscellanous";
import { socket } from "../../Controler/App";
import {
  chatSlice,
  useFetchMessagesQuery,
} from "../../Controler/Redux/Features/chatSlice";
import { useFetchUserQuery } from "../../Controler/Redux/Features/userSlice";
import SingleMessage from "./SingleMessage";

const ChatScroller = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  let scrollRef = useRef();
  const ringtoneRef = useRef();
  const navigate = useNavigate();
  const { data: user } = useFetchUserQuery(userId);
  const {
    isLoading,
    isSuccess,
    isError,
    data: messages,
  } = useFetchMessagesQuery(userId);

  useEffect(() => {
    socket.on("new message", () => ringtoneRef.current.play());
    if (
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
      // dispatch(
      //   chatSlice.util.invalidateTags([{ type: "Messages", id: userId }])
      // );
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
        <audio
          src={notification}
          ref={ringtoneRef}
          style={{ display: "none" }}
        ></audio>
      </Box>
    );
};

export default ChatScroller;
