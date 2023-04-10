import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import PropTypes from "prop-types";
import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";

const AudioDisplay = ({ audio }) => {
  const containerRef = useRef();
  const [duration,setDuration]=useState();
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
      setDuration(waveSurferRef.current.getDuration()-waveSurferRef.current.getCurrentTime());
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
      <Flex width='90%' alignItems='center'>
        <Box width="100%" ref={containerRef} />
        <Text width="fit-content" marginLeft={1}>
          {String(Math.floor(duration / 60)).padStart(2, 0)}:
          {String(Math.floor(duration % 60)).padStart(2, 0)}
        </Text>
      </Flex>
      <ButtonGroup variant="ghost">
        <Button
          className="bi-rewind"
          onClick={() => waveSurferRef.current.skipBackward()}
        ></Button>
        <Button
          onClick={() => {
            waveSurferRef.current.playPause();
            toggleIsPlaying(waveSurferRef.current.isPlaying());
          }}
          className={isPlaying ? "bi-pause" : "bi-play"}
        ></Button>
        <Button
          className="bi-fast-forward"
          onClick={() => waveSurferRef.current.skipForward()}
        ></Button>
      </ButtonGroup>
    </Flex>
  );
};

AudioDisplay.propTypes = {
  audio: PropTypes.string.isRequired,
};

export default AudioDisplay;
