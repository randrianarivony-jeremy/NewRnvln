import { Box, Button, Flex, HStack, Portal, Stack, Text } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useNavigate } from "react-router-dom";
import { publicationContext } from "../../Controler/Context";

const SendVoice = () => {
    const navigate = useNavigate();
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
    setContent({content:(blob),contentType:"audio"});
    setRecording(false);
    navigate('/publication/media');
  };
  
  const handleReset = () => {
    stopRecording();
    newBlob.current=false;
    console.log('ato',newBlob.current);
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
        <Button
          variant="outline"
          flexDir="column"
          height='30vw' maxH={120} width='30vw' maxW={120}
          onClick={handleRecordingOn}
        >
          <Flex fontSize={40} className="bi-mic"></Flex>
          <Text fontSize={12}>Micro</Text>
        </Button>
      )}
    </>
  );
};

export default SendVoice;
