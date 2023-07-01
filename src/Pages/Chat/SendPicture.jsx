import { Button, Input } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import Compressor from "compressorjs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageOutline } from "ionicons/icons";
import React, { useContext, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ErrorRender } from "../../Component/Miscellanous";
import { currentUserContext } from "../../Controler/App";
import { storage } from "../../Controler/firebase.config";
import {
  chatSlice,
  useAddMessageMutation,
} from "../../Controler/Redux/Features/chatSlice";

const SendPicture = () => {
  const fileInputRef = useRef();
  const urlRef = useRef();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { userId } = useParams();
  const { data: conversation } =
    chatSlice.endpoints.fetchConversation.useQueryState(userId);
  const [addMessage, { isError, error }] = useAddMessageMutation();
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
              _id: Date.now(),
              sender: currentUser._id,
              recipient: userId,
              content: urlRef.current,
              conversationId: conversation?._id ?? null,
              contentType: "image",
              category,
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
  if (isError) return <ErrorRender isError={isError} error={error} />;

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
