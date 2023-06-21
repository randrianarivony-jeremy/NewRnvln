import { Button, Input } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import Compressor from "compressorjs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageOutline } from "ionicons/icons";
import React, { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { currentUserContext } from "../../Controler/App";
import { storage } from "../../Controler/firebase.config";
import {
  useAddMessageMutation,
  useFetchConversationQuery,
} from "../../Controler/Redux/Features/chatSlice";

const SendPicture = () => {
  const fileInputRef = useRef();
  const urlRef = useRef();
  const { userId } = useParams();
  const { data: conversation } = useFetchConversationQuery(userId);
  const [addMessage] = useAddMessageMutation();
  const { currentUser } = useContext(currentUserContext);

  const storePicture = ({ currentTarget }) => {
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
              conversationId: conversation?._id ?? null,
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
