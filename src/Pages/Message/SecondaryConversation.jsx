import { Flex, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useFetchConversationsQuery } from "../../Controler/Redux/Features/chatSlice";
import { Loader } from "../../Controler/Routes";
import { socketContext } from "../../Controler/Socketio/RealtimeSocketContext";
import { Scroll } from "../../Styles/Theme";
import ConversationCard from "./ConversationCard";

const SecondaryConversation = () => {
  const { setNewSecondMessage } = useContext(socketContext);
  const { data, isLoading, isSuccess, isError } =
    useFetchConversationsQuery("second");

  useEffect(() => {
    setNewSecondMessage(0);
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

export default SecondaryConversation;
