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
import {
  checkmarkCircleOutline,
  ellipse,
  micOutline,
  pauseCircleOutline,
  playCircleOutline,
  refreshCircleOutline,
} from "ionicons/icons";
import React, { useContext, useRef, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useNavigate } from "react-router-dom";
import { publicationContext } from "../../../Controler/Context";

const SendVoice = () => {
  const navigate = useNavigate();
  const bg = useColorModeValue("white", "dark.0");
  const { setContent } = useContext(publicationContext);
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

  const handleRecordingOn = () => {
    startRecording();
    setRecording(true);
  };

  const handleSubmit = (blob) => {
    setContent({ content: blob, contentType: "audio" });
    setRecording(false);
    navigate("/publication/media");
  };

  const handleReset = () => {
    stopRecording();
    newBlob.current = false;
  };

  return (
    <>
      {recording ? (
        <Portal>
          <Box display="none">
            <AudioRecorder
              onRecordingComplete={(blob) =>
                newBlob.current && handleSubmit(blob)
              }
              recorderControls={recorderControls}
            />
          </Box>
          <Button
            position="absolute"
            zIndex={4}
            top={0}
            left={0}
            className="bi-x-lg"
            onClick={() => {
              handleReset();
              setRecording(false);
            }}
          ></Button>
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
                  // color="red"
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
        <Button
          variant="outline"
          flexDir="column"
          height="30vw"
          maxH={120}
          width="30vw"
          maxW={120}
          onClick={handleRecordingOn}
        >
          <IonIcon icon={micOutline} style={{ fontSize: "40px" }} />
          <Text fontSize={12}>Micro</Text>
        </Button>
      )}
    </>
  );
};

export default SendVoice;
