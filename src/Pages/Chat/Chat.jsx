import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatScroller from "./ChatScroller";
import ChatInput from "./ChatInput";
import { Scroll } from "../../Styles/Theme";
import { Loader } from "../../Controler/Routes";
import { apiCall, currentUserContext } from "../../Controler/App";

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
  let draft=useRef();
  const conversationId=useRef();

  const fetchMessages = async () => {
    await apiCall
      .get( "message/"+userId)
      .then(
        (res) => {
          console.log(res.data)
          if(res.data.messages==undefined){
          setNewConversation(true);
          setUserB(res.data.user)
          }else {
            conversationId.current = res.data.messages._id
            setMessages(res.data.messages.messages);
            setUserB(
              res.data.messages.members.filter((u) => u._id !== currentUser._id)[0]
            );
          }
        },
        (err) => {
          console.log(err);
          toast({
            status:'error',
            duration:5000,
            isClosable:true,
            title:'Error',
            description:'Une erreur est survenue'
          })
        }
        ).finally(()=>
        setLoading(false)
      );
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <Scroll
      height="100%"
      className="chat" paddingBottom={2}
      position="relative"
    >
      <chatContext.Provider value={{ messages, setMessages, userB,conversationId
        ,newConversation,setNewConversation,submitting, setSubmitting,draft }}>
        <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
          <Button
            variant="float"
            className="bi-arrow-left"
            onClick={() => navigate(-1)}
          ></Button>
          <Button>{userB?.name} &nbsp; <Flex fontStyle='italic' fontWeight='normal'>{userB?.job}</Flex></Button>
        </Flex>
        {loading ? (
          <Loader />
        ) : newConversation ? (
          <Flex justify="center" alignItems="center" height="100%">
            <Text>Démarrez une nouvelle conversation</Text>
          </Flex>
        ) : (
          <ChatScroller />
        )}
        <ChatInput />
      </chatContext.Provider>
    </Scroll>
  );
};

export default Chat;
