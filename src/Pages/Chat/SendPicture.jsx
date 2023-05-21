import { Button, Input } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageOutline } from "ionicons/icons";
import React, { useContext, useRef } from "react";
import { apiCall, currentUserContext, socket } from "../../Controler/App";
import { storage } from "../../Controler/firebase.config";
import { chatContext } from "./Chat";

const SendPicture = () => {
  const fileInputRef = useRef();
  const urlRef = useRef();
  const {messages,setMessages,conversationId,userB,newConversation,setNewConversation,setSubmitting,draft}=useContext(chatContext);
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
    await apiCall
      .post( "message",{
        sender:currentUser._id,
        recipient:userB._id,
        content:urlRef.current,
        contentType:'image',
        conversationId: newConversation ? null : conversationId.current
      })
      .then(
        (res) => {
          setMessages([...messages,res.data.newMessage]);
          conversationId.current = res.data.newMessage.conversationId;
          socket.emit('message sent',res.data,userB._id)
          },
          (err) => {
          console.log(err);
        }
      )
      .finally(()=>setSubmitting(false));
  };
  return (
    <>
      <Button variant='float'
        onClick={() => fileInputRef.current.click()}
      ><IonIcon icon={imageOutline}/></Button>
      <Input
        ref={fileInputRef}
        type="file"
        display="none"
        accept=".png,.jpg,.jpeg"
        onChange={storePicture}
      />
    </>
  );
};

export default SendPicture;
