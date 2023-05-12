import { Box, Button, Flex, HStack, Image, Stack } from "@chakra-ui/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import WebCam from "react-webcam";
import { apiCall, currentUserContext } from "../../Controler/App";
import { storage } from "../../Controler/firebase.config";
import { chatContext } from "./Chat";

const TakePicture = () => {
  const [camera, setCamera] = useState(false);
  const { conversationId } = useParams();
  const {messages,setMessages,userB,newConversation,setNewConversation, setSubmitting,draft}=useContext(chatContext);
  const {currentUser}=useContext(currentUserContext);
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
  
  const storePicture=()=>{
    setCamera(false);
    setCameraReady(false);
    if (newConversation) setNewConversation(false);
    draft.current = {content:imageRef.current,contentType:'image',sender:currentUser._id}
    setSubmitting(true);
    const fileName = new Date().getTime() + `${currentUser._id}`;
    const storageRef = ref(storage, "conversation/image/" + fileName);
      uploadString(storageRef, imageRef.current, "data_url").then((snapshot) =>
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
    <Flex>
      <Button
        className="bi-camera"
        variant="float"
        onClick={() => setCamera(!camera)}
      ></Button>

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
                    className="bi-x-lg"
                    fontSize="xl"
                    onClick={() => {
                      setCamera(false);
                      setCameraReady(false);
                    }}
                  ></Button>
                  <Button
                    className="bi-arrow-repeat"
                    fontSize="xl"
                    onClick={() =>
                      facingMode === "user"
                        ? setFacingMode("environment")
                        : setFacingMode("user")
                    }
                  ></Button>
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
            videoConstraints={{ facingMode, height:'100vh',width:'100vw' }}
            // videoConstraints={{ facingMode, aspectRatio: 1 / 1 }} ty ny tena izy
            onUserMediaError={() => setCamera(false)}
            screenshotFormat="image/jpeg"
            style={{
              width: "100vw",
              height:'100vh',
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
                  className="bi-circle"
                  fontSize={40}
                  onClick={capture}
                ></Button>
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
