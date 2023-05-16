import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Scroll } from "../../Styles/Theme";
import { apiCall, socket } from "../../Controler/App";
import { Loader } from "../../Controler/Routes";
import ConversationCard from './ConversationCard';

const SecondaryConversation = () => {
    const navigate = useNavigate();
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchConversation = async () => {
      await apiCall.get("conversation/second").then(
        (res) => {
          setConversation(res.data);
        },
        (err) => {
          console.log(err);
          navigate(-1);
        }
      ).finally(()=>setLoading(false));
    };
  
    useEffect(() => {
      fetchConversation();
    }, []);

    useEffect(()=>{
      socket.on('new message',()=>{
          fetchConversation()
      })
    })
    return (
        <>
            {loading ? (
          <Loader />
        ) : (
          <Scroll height="100%">
            {conversation?.map((convers, key) => (
              <ConversationCard conversation={convers} key={key}/>
            ))}
          </Scroll>
        )}
        </>
    );
};

export default SecondaryConversation;