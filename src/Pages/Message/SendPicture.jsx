import { Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { currentUserContext } from "../../Controler/App";
import { storage } from "../../Controler/firebase.config";
import { chatContext } from "./Chat";

const SendPicture = () => {
  const fileInputRef = useRef();
  const { conversationId } = useParams();
  const urlRef = useRef();
  const {messages,setMessages,userB,newConversation,setNewConversation,setSubmitting,draft}=useContext(chatContext);
  const {currentUser}=useContext(currentUserContext);

  const storePicture=({currentTarget})=>{
    setSubmitting(true);
    if (newConversation) setNewConversation(false);
    draft.current = {content:URL.createObjectURL(currentTarget.files[0]),contentType:'image',sender:currentUser._id}
    const fileName = new Date().getTime() + `${currentUser._id}`;
    const storageRef = ref(storage, "conversation/image/" + fileName);
    uploadBytes(storageRef, currentTarget.files[0]).then((snapshot) =>
        getDownloadURL(snapshot.ref).then((url) => {
          urlRef.current = url;
          handleSubmit();
        })
      );
  }

  const handleSubmit = async() => {
    await axios
      .post(process.env.REACT_APP_API_URL + "/api/message",{
        sender:currentUser._id,
        recipient:newConversation ? conversationId : userB._id, //this conversationId from params would be the userId
        content:urlRef.current,
        contentType:'image',
        conversationId: newConversation ? null : conversationId
      })
      .then(
        (res) => {
          setMessages([...messages,res.data]);
          setSubmitting(false);
          },
          (err) => {
          setSubmitting(false);
          console.log(err);
        }
      );
  };
  return (
    <>
      <Button variant='float'
        className="bi-image"
        onClick={() => fileInputRef.current.click()}
      ></Button>
      <Input
        ref={fileInputRef}
        type="file"
        display="none"
        accept=".png,.jpg,.jpeg"
        onChange={storePicture}
        // onChange={(e)=>sendResponse(e.target.files[0],'image')}
      />
    </>
  );
};

export default SendPicture;
