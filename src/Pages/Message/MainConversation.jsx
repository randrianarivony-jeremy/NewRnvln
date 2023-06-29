import { Flex, Text } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ErrorRender, Loader, Scroll } from "../../Component/Miscellanous";
import { useFetchConversationsQuery } from "../../Controler/Redux/Features/chatSlice";
import { setNewMainMessage } from "../../Controler/Redux/Features/credentialSlice";
import ConversationCard from "./ConversationCard";

const MainConversation = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, error } =
    useFetchConversationsQuery("main");

  useEffect(() => {
    dispatch(setNewMainMessage(0));
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorRender isError={isError} error={error} />;
  if (isSuccess) {
    if (data.ids.length === 0)
      return (
        <Flex height={"100%"} justify="center" align={"center"}>
          <Text
            opacity={0.7}
            fontStyle="italic"
            width="75%"
            textAlign={"center"}
          >
            Appuyez sur l'icône <IonIcon icon={addCircleOutline} /> pour créer
            de nouvelle conversation
          </Text>
        </Flex>
      );
    return (
      <Scroll height="100%">
        {data.ids.map((conversationId) => (
          <ConversationCard
            conversationId={conversationId}
            category={"main"}
            key={conversationId}
          />
        ))}
      </Scroll>
    );
  }
};

export default MainConversation;
