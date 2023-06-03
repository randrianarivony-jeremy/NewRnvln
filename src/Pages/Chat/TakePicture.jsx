import { Box, Button, Flex, HStack, Image, Stack } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import {
  cameraOutline,
  cameraReverseOutline,
  close,
  radioButtonOn,
} from "ionicons/icons";
import React, { useContext, useRef, useState } from "react";
import WebCam from "react-webcam";
import { apiCall, currentUserContext, socket } from "../../Controler/App";
import { storage } from "../../Controler/firebase.config";
import { chatContext } from "./Chat";
import Compressor from "compressorjs";

const TakePicture = () => {
  const [camera, setCamera] = useState(false);
  const {
    messages,
    conversationId,
    setMessages,
    userB,
    newConversation,
    setNewConversation,
    setSubmitting,
    draft,
  } = useContext(chatContext);
  const { currentUser } = useContext(currentUserContext);
  const [cameraReady, setCameraReady] = useState(false);
  const [imagePreview, setImagePreview] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const webcamRef = useRef();
  const imageRef = useRef();
  const urlRef = useRef();

  const capture = () => {
    imageRef.current = webcamRef.current.getScreenshot();
    setImagePreview(true);
  };

  const storePicture = () => {
    setCamera(false);
    setCameraReady(false);
    if (newConversation) setNewConversation(false);
    draft.current = {
      content: imageRef.current,
      contentType: "image",
      sender: currentUser._id,
    };
    setSubmitting(true);
    fetch(imageRef.current)
      .then((response) => response.blob())
      .then((blob) => {
        imageRef.current = new File([blob], "sample.png", { type: blob.type });
        new Compressor(imageRef.current, {
          quality: 0.6,
          success(result) {
            const fileName = new Date().getTime() + `${currentUser._id}`;
            const storageRef = ref(storage, "conversation/image/" + fileName);
            uploadBytes(storageRef, result).then((snapshot) =>
              getDownloadURL(snapshot.ref).then((url) => {
                urlRef.current = url;
                handleSubmit();
              })
            );
          },
          error(err) {
            console.log({ Error: "Image compression error " + err.message });
          },
        });
      });
  };

  const handleSubmit = async () => {
    await apiCall
      .post("message", {
        sender: currentUser._id,
        recipient: userB._id,
        content: urlRef.current,
        contentType: "image",
        conversationId: newConversation ? null : conversationId.current,
      })
      .then(
        (res) => {
          setMessages([...messages, res.data.newMessage]);
          conversationId.current = res.data.newMessage.conversationId;
          socket.emit("message sent", res.data, userB._id);
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => setSubmitting(false));
  };

  return (
    <Flex>
      <Button variant="float" onClick={() => setCamera(!camera)}>
        <IonIcon icon={cameraOutline} />
      </Button>

      {camera && (
        <Stack
          position="absolute"
          zIndex={3}
          top={0}
          left={0}
          spacing={0}
          height="100%"
        >
          {cameraReady && (
            <Box minH={10} width="100%" bgColor="white">
              {!imagePreview && (
                <Flex justify="space-between" height={10} width="100%">
                  <Button
                    fontSize="xl"
                    onClick={() => {
                      setCamera(false);
                      setCameraReady(false);
                    }}
                  >
                    <IonIcon icon={close} />
                  </Button>
                  <Button
                    fontSize="xl"
                    onClick={() =>
                      facingMode === "user"
                        ? setFacingMode("environment")
                        : setFacingMode("user")
                    }
                  >
                    <IonIcon icon={cameraReverseOutline} />
                  </Button>
                </Flex>
              )}
            </Box>
          )}

          {imagePreview && (
            <Box position="absolute" top={10} left={0}>
              <Image src={imageRef.current} alt="image preview" />
            </Box>
          )}
          <WebCam
            ref={webcamRef}
            onUserMedia={() => setCameraReady(true)}
            mirrored={facingMode === "user" ? true : false}
            videoConstraints={{ facingMode, height: "100vh", width: "100vw" }}
            // videoConstraints={{ facingMode, aspectRatio: 1 / 1 }} ty ny tena izy
            onUserMediaError={() => setCamera(false)}
            screenshotFormat="image/jpeg"
            style={{
              width: "100vw",
              height: "100vh",
              // aspectRatio: 1 / 1,
              objectFit: "cover",
            }}
            audio={false}
          />

          {cameraReady && (
            <Flex align="center" justify="center" height="100%" bgColor="white">
              {!imagePreview ? (
                <Button
                  width={100}
                  bgColor="transparent"
                  fontSize={40}
                  onClick={capture}
                >
                  <IonIcon icon={radioButtonOn} />
                </Button>
              ) : (
                <HStack width="100%">
                  <Button width="100%" onClick={() => setImagePreview(false)}>
                    Reprendre
                  </Button>
                  <Button width="100%" variant="primary" onClick={storePicture}>
                    Envoyer
                  </Button>
                </HStack>
              )}
            </Flex>
          )}
        </Stack>
      )}
    </Flex>
  );
};

export default TakePicture;
