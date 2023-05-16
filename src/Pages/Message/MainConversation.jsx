import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { apiCall, socket } from "../../Controler/App";
import { Loader } from "../../Controler/Routes";
import { socketContext } from '../../Controler/Socketio/RealtimeSocketContext';
import { Scroll } from '../../Styles/Theme';
import ConversationCard from './ConversationCard';

const MainConversation = () => {
    const navigate = useNavigate();
    const {setNewMainMessage}=useContext(socketContext);
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchConversation = async () => {
      await apiCall.get("conversation/main").then(
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
      setNewMainMessage(0);
    }, []);

    useEffect(()=>{
      socket.on('new message',()=>{
          fetchConversation()
      })
    })

    return (
        <div>
            {loading ? (
          <Loader />
        ) : (
          <Scroll height="100%">
            {conversation?.map((convers, key) => (
              <ConversationCard conversation={convers} key={key}/>
            ))}
          </Scroll>
        )}
        </div>
    );
};

export default MainConversation;