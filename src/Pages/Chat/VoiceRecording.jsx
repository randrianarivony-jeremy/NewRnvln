import {
  Box,
  Button,
  Flex,
  HStack,
  Portal,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  checkmarkCircleOutline,
  close,
  ellipse,
  micOutline,
  pauseCircleOutline,
  playCircleOutline,
  refreshCircleOutline,
} from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { currentUserContext } from "../../Controler/App";
import { storage } from "../../Controler/firebase.config";
import {
  chatAdapter,
  chatSlice,
  useAddMessageMutation,
} from "../../Controler/Redux/Features/chatSlice";

const SendVoice = () => {
  const { currentUser } = useContext(currentUserContext);
  const [recording, setRecording] = useState(false);
  const recorderControls = useAudioRecorder();
  const { userId } = useParams();
  const bg = useColorModeValue("white", "dark.50");
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
  const patchResult = useRef();
  const dispatch = useDispatch();

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
    const now = Date.now();
    patchResult.current = dispatch(
      chatSlice.util.updateQueryData("fetchMessages", userId, (draft) => {
        chatAdapter.addOne(draft, {
          _id: now,
          createdAt: new Date().toJSON(),
          sender: currentUser._id,
          recipient: userId,
          content: URL.createObjectURL(blob),
          conversationId: conversation?._id ?? null,
          contentType: "audio",
          category,
        });
      })
    );
    const fileName = new Date().getTime() + `${currentUser._id}`;
    const storageRef = ref(storage, "conversation/audio/" + fileName);
    uploadBytes(storageRef, blob).then((snapshot) =>
      getDownloadURL(snapshot.ref).then((url) => {
        urlRef.current = url;
        addMessage({
          _id: now,
          sender: currentUser._id,
          recipient: userId,
          content: urlRef.current,
          conversationId: conversation?._id ?? null,
          contentType: "audio",
          category,
        });
      })
    );
  };

  useEffect(() => {
    if (isError) patchResult.current.undo();
  }, [error, isError]);

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
            leftIcon={<IonIcon icon={close} />}
            onClick={() => {
              handleReset();
              setRecording(false);
            }}
          >
            Fermer
          </Button>
          <Flex
            position="absolute"
            zIndex={3}
            top={0}
            left={0}
            height="100%"
            width="100%"
            bgColor={bg}
            justify="center"
            align="center"
          >
            <Stack spacing={0}>
              <Text textAlign="center" fontSize="2xl">
                {String(Math.floor(recordingTime / 60)).padStart(2, 0)}:
                {String(recordingTime % 60).padStart(2, 0)}
              </Text>
              <HStack>
                <Button fontSize="4xl" variant="float" onClick={handleReset}>
                  <IonIcon icon={refreshCircleOutline} />
                </Button>
                <Button
                  fontSize="6xl"
                  variant="float"
                  boxSize={14}
                  onClick={() =>
                    !isRecording ? handleRecordingOn() : togglePauseResume()
                  }
                >
                  <IonIcon
                    icon={
                      !isRecording
                        ? ellipse
                        : isPaused
                        ? playCircleOutline
                        : pauseCircleOutline
                    }
                    style={{ color: "red" }}
                  />
                </Button>
                <Button fontSize="4xl" variant="float" onClick={stopRecording}>
                  <IonIcon icon={checkmarkCircleOutline} />
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
