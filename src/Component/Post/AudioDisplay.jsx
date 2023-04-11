import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import PropTypes from "prop-types";
import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";

const AudioDisplay = ({ audio }) => {
  const containerRef = useRef();
  const [duration,setDuration]=useState();
  const waveSurferRef = useRef({
    isPlaying: () => true,
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
      // waveSurfer.current.play();
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
        <Box width="90%" ref={containerRef} />
      <ButtonGroup variant="ghost">
        <Button
          className="bi-rewind"
          onClick={() => waveSurferRef.current.skipBackward()}
        ></Button>
        <Button fontSize='3xl'
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
        <Text width="fit-content" marginLeft={1}>
          {String(Math.floor(duration / 60)).padStart(2, 0)}:
          {String(Math.floor(duration % 60)).padStart(2, 0)}
        </Text>
    </Flex>
  );
};

AudioDisplay.propTypes = {
  audio: PropTypes.string.isRequired,
};

export default AudioDisplay;
