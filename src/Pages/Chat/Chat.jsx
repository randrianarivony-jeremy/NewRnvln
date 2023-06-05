import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatScroller from "./ChatScroller";
import ChatInput from "./ChatInput";
import { Scroll } from "../../Styles/Theme";
import { Loader } from "../../Controler/Routes";
import { apiCall, currentUserContext } from "../../Controler/App";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useFetchMessagesQuery } from "../../Controler/Redux/Features/chatSlice";

export const chatContext = createContext();

const Chat = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(currentUserContext);
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newConversation, setNewConversation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userB, setUserB] = useState();
  const toast = useToast();
  let draft = useRef();
  let mediaRef = useRef();
  const conversationId = useRef();
  const { data, isLoading, isSuccess, isError } = useFetchMessagesQuery(userId);

  // const fetchMessages = async () => {
  //   await apiCall
  //     .get("message/" + userId)
  //     .then(
  //       (res) => {
  //         if (res.data.messages === undefined) {
  //           setNewConversation(true);
  //           setUserB(res.data.user);
  //         } else {
  //           conversationId.current = res.data.messages._id;
  //           setMessages(res.data.messages.messages);
  //           setUserB(
  //             res.data.messages.members.filter(
  //               (u) => u._id !== currentUser._id
  //             )[0]
  //             );
  //           }
  //         },
  //         (err) => {
  //           console.log(err);
  //         toast({
  //           status: "error",
  //           duration: 5000,
  //           isClosable: true,
  //           title: "Error",
  //           description: "Une erreur est survenue",
  //         });
  //       }
  //     )
  //     .finally(() => setLoading(false));
  // };

  useEffect(() => {
    if (isSuccess) {
      if (data.messages === undefined) {
        setUserB(data.user);
        setNewConversation(true);
      } else {
        setUserB(
          data.messages.members.filter((u) => u._id !== currentUser._id)[0]
        );
        setMessages(data.messages.messages);
        conversationId.current = data.messages._id;
      }
    }
  }, [isSuccess]);

  let display;

  if (isLoading) display = <Loader />;
  if (isError)
    display = (
      <p>
        Une erreur est survenue lors du chargement. Veuillez réessayer plus
        tard.
      </p>
    );
  if (isSuccess) {
    if (data.messages === undefined) {
      display = (
        <Flex justify="center" alignItems="center" height="100%">
          <Text>Démarrez une nouvelle conversation</Text>
        </Flex>
      );
    } else {
      display = <ChatScroller />;
    }
  }

  return (
    <Scroll
      height="100%"
      className="chat"
      paddingBottom={2}
      position="relative"
    >
      <chatContext.Provider
        value={{
          messages,
          setMessages,
          userB,
          conversationId,
          newConversation,
          setNewConversation,
          submitting,
          setSubmitting,
          draft,
          mediaRef,
        }}
      >
        <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
          <Button size={"lg"} onClick={() => navigate(-1)}>
            <IonIcon icon={arrowBack} />
          </Button>
          <Button size={"lg"}>
            {userB?.name} &nbsp;{" "}
            <Flex fontStyle="italic" fontWeight="normal">
              {userB?.job}
            </Flex>
          </Button>
        </Flex>
        {display}
        <ChatInput />
      </chatContext.Provider>
    </Scroll>
  );
};

export default Chat;
