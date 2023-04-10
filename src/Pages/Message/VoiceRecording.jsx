import { Box, Button, ButtonGroup, Flex, HStack, Spinner, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const VoiceRecording = ({ sendResponse }) => {
  const recorderControls = useAudioRecorder();
  const {startRecording,stopRecording,togglePauseResume,isPaused,recordingTime,} = recorderControls;
  const [audioRecordingInterface, setAudioRecordingInterface] = useState(false);
  let cancel=useRef(false);

  const handleRecordingOn = () => {
    startRecording();
    setAudioRecordingInterface(true);
    cancel.current=false;
  };

  const handleSubmit = (blob) => {
    sendResponse(blob, "audio");
    setAudioRecordingInterface(false);
  };
  
  const handleStop=()=>{
    stopRecording();
    cancel.current=true;
    setAudioRecordingInterface(false);
  }

  return (
    <Flex>
      <Box display="none">
        <AudioRecorder
          onRecordingComplete={(blob) => !cancel.current && handleSubmit(blob)}
          recorderControls={recorderControls}
        />
      </Box>
      <Button className="bi-mic" variant='float' onClick={handleRecordingOn}></Button>
      {audioRecordingInterface && (
          <HStack position="absolute" rounded='md' width='calc(100% - 24px)' zIndex={3}  bottom={2} left={3} bgColor="dark.50" justifyContent="space-between">
            <HStack>
              <Button
                className={isPaused ? "bi-play" : "bi-pause"}
                onClick={togglePauseResume}
              ></Button>
                <Spinner thickness="2px" speed={isPaused ? "0s" : '0.9s'} emptyColor="gray.200" color="blue.500" size="md"/>
              <Text>{String(Math.floor(recordingTime/60)).padStart(2, 0)}:{String(recordingTime%60).padStart(2, 0)}</Text> {/* min:sec(00:00)  */}
            </HStack>
            <ButtonGroup>
                <Button className="bi-trash" onClick={handleStop}></Button>
            <Button className="bi-send" onClick={stopRecording}></Button>
            </ButtonGroup>
          </HStack>
      )}
    </Flex>
  );
};

export default VoiceRecording;
