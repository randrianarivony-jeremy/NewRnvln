import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { close, trashOutline } from "ionicons/icons";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLongPress } from "use-long-press";
import { ErrorRender } from "../../Component/Miscellanous";
import { currentUserContext } from "../../Controler/App";
import {
  useDeleteMessageMutation,
  useFetchMessagesQuery,
} from "../../Controler/Redux/Features/chatSlice";
import DataDisplay from "./DataDisplay";

const SingleMessage = ({ messageId }) => {
  const { userId } = useParams();
  const { currentUser } = useContext(currentUserContext);
  const [deleteFooter, setDeleteFooter] = useState(false);
  const [deleteMessage, { error, isError }] = useDeleteMessageMutation();

  // Dinamically get selectors based on parent query

  // Use selectors based on parent id 1
  // const message = useSelector(selectById(messageId));
  const { message } = useFetchMessagesQuery(userId, {
    selectFromResult: ({ data }) => ({
      message: data?.entities[messageId],
    }),
  });

  const bind = useLongPress(() => setDeleteFooter(true), {
    threshold: 1000,
    captureEvent: true,
    cancelOnMovement: true,
  });

  if (isError) return <ErrorRender isError={isError} error={error} />;

  return (
    <Flex
      justify={message.sender === currentUser._id ? "flex-end" : "flex-start"}
      marginBottom={2}
      align="flex-end"
      marginX={3}
      {...(message.sender === currentUser._id ? bind() : null)}
    >
      <DataDisplay message={message} />
      {deleteFooter && (
        <ButtonGroup size="sm">
          <Button onClick={() => setDeleteFooter(false)}>
            <IonIcon icon={close} />
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              deleteMessage({
                userId,
                messageId,
                conversationId: message.conversationId,
              })
            }
          >
            <IonIcon icon={trashOutline} />
          </Button>
        </ButtonGroup>
      )}
    </Flex>
  );
};

export default SingleMessage;
