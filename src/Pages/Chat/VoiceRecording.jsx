import { Box, Button, Flex, HStack, Portal, Stack, Text } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { checkmark, close, micOutline, refresh } from "ionicons/icons";
import React, { useContext, useRef, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useParams, useSearchParams } from "react-router-dom";
import { ErrorRender } from "../../Component/Miscellanous";
import { currentUserContext } from "../../Controler/App";
import { storage } from "../../Controler/firebase.config";
import {
  chatSlice,
  useAddMessageMutation,
} from "../../Controler/Redux/Features/chatSlice";

const SendVoice = () => {
  const [recording, setRecording] = useState(false);
  const recorderControls = useAudioRecorder();
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { data: conversation } =
    chatSlice.endpoints.fetchConversation.useQueryState(userId);
  const [addMessage, { isError, error }] = useAddMessageMutation();
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
  const { currentUser } = useContext(currentUserContext);

  const handleRecordingOn = () => {
    startRecording();
    setRecording(true);
  };

  const handleReset = () => {
    stopRecording();
    newBlob.current = false;
  };

  const storeToStorage = (blob) => {
    setRecording(false);
    const fileName = new Date().getTime() + `${currentUser._id}`;
    const storageRef = ref(storage, "conversation/audio/" + fileName);
    uploadBytes(storageRef, blob).then((snapshot) =>
      getDownloadURL(snapshot.ref).then((url) => {
        urlRef.current = url;
        // handleSubmit();
        addMessage({
          _id: Date.now(),
          sender: currentUser._id,
          recipient: userId, //this conversationId from params would be the userId
          content: urlRef.current,
          conversationId: conversation?._id ?? null,
          contentType: "audio",
          category,
          createdAt: new Date().toJSON(),
        });
      })
    );
  };

  if (isError) return <ErrorRender isError={isError} error={error} />;

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
          <Button
            position="absolute"
            zIndex={4}
            top={0}
            left={0}
            onClick={() => {
              handleReset();
              setRecording(false);
            }}
          >
            <IonIcon icon={close} />
          </Button>
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
                  fontSize="2xl"
                  border="1px solid"
                  rounded="full"
                  variant="float"
                  onClick={handleReset}
                >
                  <IonIcon icon={refresh} />
                </Button>
                <Button
                  fontSize="5xl"
                  border="1px solid white"
                  rounded="full"
                  variant="float"
                  color="red"
                  boxSize={14}
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
                  fontSize="2xl"
                  border="1px solid"
                  rounded="full"
                  variant="float"
                  onClick={stopRecording}
                >
                  <IonIcon icon={checkmark} />
                </Button>
              </HStack>
            </Stack>
          </Flex>
        </Portal>
      ) : (
        <Button variant="float" onClick={handleRecordingOn}>
          <IonIcon icon={micOutline} />
        </Button>
      )}
    </>
  );
};

export default SendVoice;
