import { Button, Input } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import Compressor from "compressorjs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageOutline } from "ionicons/icons";
import React, { useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { currentUserContext } from "../../Controler/App";
import { storage } from "../../Controler/firebase.config";
import {
  chatAdapter,
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
  const patchResult = useRef();
  const dispatch = useDispatch();

  const storePicture = ({ currentTarget }) => {
    const now = Date.now();
    patchResult.current = dispatch(
      chatSlice.util.updateQueryData("fetchMessages", userId, (draft) => {
        chatAdapter.addOne(draft, {
          _id: now,
          createdAt: new Date().toJSON(),
          sender: currentUser._id,
          recipient: userId,
          content: URL.createObjectURL(currentTarget.files[0]),
          conversationId: conversation?._id ?? null,
          contentType: "image",
          category,
        });
      })
    );
    new Compressor(currentTarget.files[0], {
      quality: 0.6,
      success(result) {
        const fileName = new Date().getTime() + `${currentUser._id}`;
        const storageRef = ref(storage, "conversation/image/" + fileName);
        uploadBytes(storageRef, result).then((snapshot) =>
          getDownloadURL(snapshot.ref).then((url) => {
            urlRef.current = url;
            addMessage({
              _id: now,
              sender: currentUser._id,
              recipient: userId,
              content: urlRef.current,
              conversationId: conversation?._id ?? null,
              contentType: "image",
              category,
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
    if (isError) patchResult.current.undo();
  }, [error, isError]);

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
