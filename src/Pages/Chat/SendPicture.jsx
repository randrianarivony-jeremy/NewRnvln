import { Button, Input } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageOutline } from "ionicons/icons";
import React, { useContext, useEffect, useRef } from "react";
import { apiCall, currentUserContext, socket } from "../../Controler/App";
import { storage } from "../../Controler/firebase.config";
import { chatContext } from "./Chat";
import Compressor from "compressorjs";
import {
  useAddMessageMutation,
  useFetchConversationQuery,
} from "../../Controler/Redux/Features/chatSlice";
import { useParams } from "react-router-dom";

const SendPicture = () => {
  const fileInputRef = useRef();
  const urlRef = useRef();
  const { userId } = useParams();
  const { data: conversation } = useFetchConversationQuery(userId);
  const [addMessage, { isLoading, isSuccess, data }] = useAddMessageMutation();
  const { newConversation, setNewConversation, draft } =
    useContext(chatContext);
  const { currentUser } = useContext(currentUserContext);

  const storePicture = ({ currentTarget }) => {
    // setSubmitting(true);
    if (newConversation) setNewConversation(false);
    draft.current = {
      content: URL.createObjectURL(currentTarget.files[0]),
      contentType: "image",
      sender: currentUser._id,
    };
    new Compressor(currentTarget.files[0], {
      quality: 0.6,
      success(result) {
        console.log({ result, original: currentTarget.files[0].size });
        const fileName = new Date().getTime() + `${currentUser._id}`;
        const storageRef = ref(storage, "conversation/image/" + fileName);
        uploadBytes(storageRef, result).then((snapshot) =>
          getDownloadURL(snapshot.ref).then((url) => {
            urlRef.current = url;
            // handleSubmit();
            addMessage({
              _id: 1,
              sender: currentUser._id,
              recipient: userId, //this conversationId from params would be the userId
              content: urlRef.current,
              conversationId: conversation._id,
              contentType: "image",
              createdAt: new Date().toJSON(),
            });
          })
        );
      },
      error(err) {
        console.log({ Error: "Image compression error " + err.message });
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      // setNewConversation(false);
      socket.emit("message sent", data, userId);
    }
  }, [isSuccess, isLoading]);

  // const handleSubmit = async () => {
  //   await apiCall
  //     .post("message", {
  //       sender: currentUser._id,
  //       recipient: userB._id,
  //       content: urlRef.current,
  //       contentType: "image",
  //       conversationId: newConversation ? null : conversationId.current,
  //     })
  //     .then(
  //       (res) => {
  //         setMessages([...messages, res.data.newMessage]);
  //         conversationId.current = res.data.newMessage.conversationId;
  //         socket.emit("message sent", res.data, userB._id);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     )
  //     .finally(() => setSubmitting(false));
  // };
  return (
    <>
      <Button variant="float" onClick={() => fileInputRef.current.click()}>
        <IonIcon icon={imageOutline} />
      </Button>
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
