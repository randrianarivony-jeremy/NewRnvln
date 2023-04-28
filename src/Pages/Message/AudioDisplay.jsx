import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import PropTypes from "prop-types";
import { Box, Button, ButtonGroup, Flex, HStack, Text } from "@chakra-ui/react";

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
      barWidth: 1,
      barHeight: 10,
      height: 30,
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
    <HStack width="100%" justify='space-between'>
          <Button
            onClick={() => {
              waveSurferRef.current.playPause();
              toggleIsPlaying(waveSurferRef.current.isPlaying());
            }}
            className={isPlaying ? "bi-pause" : "bi-play"}
          ></Button>
        <Box width="50vw" ref={containerRef} />
        <Text width="fit-content" marginLeft={1}>
          {String(Math.floor(duration / 60)).padStart(2, 0)}:
          {String(Math.floor(duration % 60)).padStart(2, 0)}
        </Text>
    </HStack>
  );
};

export default AudioDisplay;
