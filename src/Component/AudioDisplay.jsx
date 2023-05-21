import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import PropTypes from "prop-types";
import { IonIcon } from "@ionic/react";
import {iconMd} from '../Styles/Theme';
import {
  pause,
  play,
  playBackOutline,
  playForwardOutline,
} from "ionicons/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Skeleton,
  Text,
} from "@chakra-ui/react";

const AudioDisplay = ({ audio }) => {
  const containerRef = useRef();
  const [duration, setDuration] = useState();
  const waveSurferRef = useRef({
    isPlaying: () => false,
  });
  const [isPlaying, toggleIsPlaying] = useState(false);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      cursorWidth: 0,
      barWidth: 5,
      height: 100,
      skipLength: 1,
    });
    waveSurfer.load(audio);
    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
      setDuration(waveSurferRef.current.getDuration());
    });
    waveSurfer.on("audioprocess", () => {
      setDuration(
        waveSurferRef.current.getDuration() -
          waveSurferRef.current.getCurrentTime()
      );
    });
    waveSurfer.on("finish", () => {
      toggleIsPlaying(waveSurferRef.current.isPlaying());
    });

    return () => {
      waveSurfer.destroy();
    };
  }, [audio]);

  return (
    <Flex width="100%" flexDir="column" alignItems="center">
      <Box width="90%" ref={containerRef} />
      <ButtonGroup variant="ghost">
        <Button onClick={() => waveSurferRef.current.skipBackward()}>
          <IonIcon icon={playBackOutline} style={{ fontSize: iconMd }} />
        </Button>
        <Button
          fontSize="3xl"
          onClick={() => {
            waveSurferRef.current.playPause();
            toggleIsPlaying(waveSurferRef.current.isPlaying());
          }}
        >
          <IonIcon
            icon={isPlaying ? pause : play}
            style={{ fontSize: iconMd }}
          />
        </Button>
        <Button
          onClick={() => waveSurferRef.current.skipForward()}
        >
          <IonIcon icon={playForwardOutline} style={{ fontSize: iconMd }} />
        </Button>
      </ButtonGroup>
      {duration === undefined ? (
        <HStack>
          <Skeleton height={4} width={2} rounded={2} />
          <Skeleton height={4} width={2} rounded={2} />
          <Box>:</Box>
          <Skeleton height={4} width={2} rounded={2} />
          <Skeleton height={4} width={2} rounded={2} />
        </HStack>
      ) : (
        <Text width="fit-content" marginLeft={1}>
          {String(Math.floor(duration / 60)).padStart(2, 0)}:
          {String(Math.floor(duration % 60)).padStart(2, 0)}
        </Text>
      )}
    </Flex>
  );
};

AudioDisplay.propTypes = {
  audio: PropTypes.string.isRequired,
};

export default AudioDisplay;
