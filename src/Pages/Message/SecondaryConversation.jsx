import React, { useContext, useEffect, useState } from 'react';
import { Scroll } from "../../Styles/Theme";
import { apiCall, socket } from "../../Controler/App";
import { Loader } from "../../Controler/Routes";
import ConversationCard from './ConversationCard';
import { socketContext } from '../../Controler/Socketio/RealtimeSocketContext';

const SecondaryConversation = () => {
    const {setNewSecondMessage}=useContext(socketContext);
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchConversations = async () => {
      await apiCall.get("conversation/second").then(
        (res) => {
          setConversations(res.data);
        },
        (err) => {
          console.log(err);
        }
      ).finally(()=>setLoading(false));
    };
  
    useEffect(() => {
      setNewSecondMessage(0)
      fetchConversations();
    }, []);

    useEffect(()=>{
      socket.on('new message',()=>{
          fetchConversations()
      })
    })

    return (
        <>
            {loading ? (
          <Loader />
        ) : (
          <Scroll height="100%">
            {conversations?.map((convers, key) => (
              <ConversationCard conversation={convers} key={key}/>
            ))}
          </Scroll>
        )}
        </>
    );
};

export default SecondaryConversation;