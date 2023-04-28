import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useLongPress } from "use-long-press";
import { currentUserContext } from "../../Controler/App";
import { chatContext } from "./Chat";
import DataDisplay from "./DataDisplay";

const SingleMessage = ({ message }) => {
  const { currentUser } = useContext(currentUserContext);
  const { messages,setMessages } = useContext(chatContext);
  const [deleteFooter, setDeleteFooter] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const bind = useLongPress(() => setDeleteFooter(true), {
    threshold: 1000,
    captureEvent: true,
    cancelOnMovement: true,
  });

  const deleteMessage = async () => {
    setSubmitting(true);
    await axios
      .delete(process.env.REACT_APP_API_URL + `/api/message/` + message._id +'/'+ message.conversationId)
      .then(
        (res) => {
          setMessages(messages.filter(msg=>msg._id!==res.data))
          setDeleteFooter(false)
          setSubmitting(false);
        },
        (err) => {
          console.log(err);
          setSubmitting(false);
        }
      );
  };
  return (
    <Flex
      justify={message.sender === currentUser._id ? "flex-end" : "flex-start"}
      marginBottom={2} align='flex-end'
      marginX={3}
      {...(message.sender === currentUser._id ? bind() : null)}
    >
      <DataDisplay data={message} />
      {deleteFooter && (
        <ButtonGroup size='sm'>
          <Button className="bi-x-lg" onClick={() => setDeleteFooter(false)}></Button>
          <Button
            isLoading={submitting}
            variant="outline"
            onClick={deleteMessage}
            className="bi-trash"
          >
          </Button>
        </ButtonGroup>
      )}
    </Flex>
  );
};

export default SingleMessage;
