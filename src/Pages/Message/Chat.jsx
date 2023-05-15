import { Button, Flex, Text } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatScroller from "./ChatScroller";
import ChatInput from "./ChatInput";
import { Scroll } from "../../Styles/Theme";
import { Loader } from "../../Controler/Routes";
import { apiCall, currentUserContext } from "../../Controler/App";
import { useSelector } from "react-redux";

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
  let draft=useRef()
  const chatReducer = useSelector(state=>state.chat);

  const fetchMessages = async () => {
    await apiCall
      .get( "message/"+userId)
      .then(
        (res) => {
          console.log(res.data);
          if(res.data==null){
          setNewConversation(true);
          }else {
            setMessages(res.data.messages);
            setUserB(
              res.data.members.filter((u) => u._id !== currentUser._id)[0]
            );
          }
        },
        (err) => {
          console.log(err);
          navigate(-1);
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
      <chatContext.Provider value={{ messages, setMessages, userB,newConversation,setNewConversation,submitting, setSubmitting,draft }}>
        <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
          <Button
            variant="float"
            className="bi-arrow-left"
            onClick={() => navigate(-1)}
          ></Button>
          <Button>{userB?.name}</Button>
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
