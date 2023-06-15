import { Flex, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { Loader } from "../../Component/Miscellanous";
import { useFetchConversationsQuery } from "../../Controler/Redux/Features/chatSlice";
import { socketContext } from "../../Controler/Socketio/RealtimeSocketContext";
import { Scroll } from "../../Styles/Theme";
import ConversationCard from "./ConversationCard";

const MainConversation = () => {
  const { setNewMainMessage } = useContext(socketContext);
  const { data, isLoading, isSuccess, isError } =
    useFetchConversationsQuery("main");

  useEffect(() => {
    setNewMainMessage(0);
  }, []);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p>
        Une erreur est survenue lors du chargement. Veuillez réessayer plus
        tard.
      </p>
    );
  if (isSuccess) {
    if (data.length === 0)
      return (
        <Flex align="center" justify={"center"} boxSize="100%">
          <Text textAlign="center">Empty state</Text>
        </Flex>
      );
    return (
      <Scroll height="100%">
        {data.map((convers, key) => (
          <ConversationCard conversation={convers} key={key} />
        ))}
      </Scroll>
    );
  }
};

export default MainConversation;
