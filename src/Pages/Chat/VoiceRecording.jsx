import { Box, Button, Flex, HStack, Portal, Stack, Text } from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useRef, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { apiCall, currentUserContext, socket } from "../../Controler/App";
import { storage } from "../../Controler/firebase.config";
import { chatContext } from "./Chat";

const SendVoice = () => {
  const [recording, setRecording] = useState(false);
  const recorderControls = useAudioRecorder();
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    isPaused,
    isRecording,
    recordingTime,
  } = recorderControls;
  let newBlob = useRef(true);
  const urlRef = useRef();
  const {messages,conversationId,setMessages,userB,newConversation,setNewConversation,setSubmitting,draft}=useContext(chatContext);
  const {currentUser}=useContext(currentUserContext);

  const handleRecordingOn = () => {
    startRecording();
    setRecording(true);
  };

  const handleReset = () => {
    stopRecording();
    newBlob.current=false;
  };
  
  const storeToStorage=(blob)=>{
    draft.current = {content:URL.createObjectURL(blob),contentType:'audio',sender:currentUser._id}
    setSubmitting(true);
    if (newConversation) setNewConversation(false);
    setRecording(false);
    const fileName = new Date().getTime() + `${currentUser._id}`;
    const storageRef = ref(storage, "conversation/audio/" + fileName);
    uploadBytes(storageRef, blob).then((snapshot) =>
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
        contentType:'audio',
        conversationId: newConversation ? null : conversationId
      })
      .then(
        (res) => {
          setMessages([...messages,res.data]);
          socket.emit('message sent',res.data,userB._id)
          },
          (err) => {
          console.log(err);
        }
      ).finally(()=>setSubmitting(false));
  };
  
  return (
    <>
      {recording ? (
        <Portal>
          <Box display="none">
            <AudioRecorder
              onRecordingComplete={(blob) =>
                newBlob.current && storeToStorage(blob)
              }
              recorderControls={recorderControls}
            />
          </Box>
          <Button position='absolute' zIndex={4} top={0} left={0} className="bi-x-lg"
      onClick={()=>{
        handleReset();
        setRecording(false)
        }}></Button>
          <Flex
            position="absolute"
            zIndex={3}
            top={0}
            left={0}
            height="100%"
            width="100%"
            bgColor="dark.100"
            justify="center"
            align="center"
          >
            <Stack spacing={0}>
              <Text textAlign="center" fontSize="2xl">
                {String(Math.floor(recordingTime / 60)).padStart(2, 0)}:
                {String(recordingTime % 60).padStart(2, 0)}
              </Text>
              <HStack>
                <Button
                  className="bi-arrow-counterclockwise"
                  fontSize="2xl"
                  border="1px solid"
                  rounded="full"
                  variant="float"
                  onClick={handleReset}
                ></Button>
                <Button
                    fontSize="5xl" border="1px solid white" rounded="full" variant="float" color='red' boxSize={14}
                  className={
                    !isRecording
                      ? "bi-circle-fill"
                      : isPaused
                      ? "bi-play"
                      : "bi-pause"
                  } 
                  onClick={() =>
                    !isRecording ? handleRecordingOn() : togglePauseResume()
                  }
                ></Button>
                <Button
                  className="bi-check-lg"
                  fontSize="2xl"
                  border="1px solid"
                  rounded="full"
                  variant="float"
                  onClick={stopRecording}
                ></Button>
              </HStack>
            </Stack>
          </Flex>
        </Portal>
      ) : (
        <Button  className="bi-mic"
          variant="float"
          onClick={handleRecordingOn}
        >
        </Button>
      )}
    </>
  );
};

export default SendVoice;
