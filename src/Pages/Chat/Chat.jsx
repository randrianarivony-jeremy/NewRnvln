import { Button, Flex, Skeleton, useToast } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { createContext, useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { currentUserContext } from "../../Controler/App";
import { useFetchUserQuery } from "../../Controler/Redux/Features/userSlice";
import { Scroll } from "../../Styles/Theme";
import ChatInput from "./ChatInput";
import ChatScroller from "./ChatScroller";

export const chatContext = createContext();

const Chat = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(currentUserContext);
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newConversation, setNewConversation] = useState(false);
  // const [submitting, setSubmitting] = useState(false);
  const submitting = useRef(false);
  const [userB, setUserB] = useState();
  const toast = useToast();
  let draft = useRef();
  let mediaRef = useRef();
  const conversationId = useRef();
  const { data: user, isLoading, isSuccess } = useFetchUserQuery(userId);

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

  let display;

  if (isLoading) display = <Skeleton height={5} width="50vw" />;
  if (isSuccess) {
    display = (
      <Button size={"lg"}>
        {user.name} &nbsp;{" "}
        <Flex fontStyle="italic" fontWeight="normal">
          {user.job}
        </Flex>
      </Button>
    );
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
          // setSubmitting,
          draft,
          mediaRef,
        }}
      >
        <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
          <Button size={"lg"} onClick={() => navigate(-1)}>
            <IonIcon icon={arrowBack} />
          </Button>
          {display}
        </Flex>
        <ChatScroller />
        <ChatInput />
      </chatContext.Provider>
    </Scroll>
  );
};

export default Chat;
