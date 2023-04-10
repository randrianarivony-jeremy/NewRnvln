import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import AudioDisplay from "./AudioDisplay";

const DataDisplay = ({ data }) => {
  const videoRef = useRef();
  const [isPaused, setIsPaused] = useState();

  useEffect(() => {
    if (isPaused) videoRef.current?.play();
    else videoRef.current?.pause();
  }, [isPaused]);
  return (
    <>
      {data.contentType === "string" && (
        <Flex height='100%' width='100%' bg={data.bg}><Text whiteSpace="pre-wrap" fontSize="3xl" maxH='80%' maxW="90%" textAlign='center' margin='auto'>
          {data.content}
        </Text></Flex>
      )}
      {data.contentType === "image_url" && (
        <Image src={data.content} alt="picture" height="100%" draggable={false} objectFit="cover" />
      )}
      {data.contentType === "video_url" && (
        <>
          {!isPaused && (
            <Button position="absolute" zIndex={1}
              fontSize='8xl' className="bi-play-fill"
              onClick={() => setIsPaused(!isPaused)}
            ></Button>
          )}
          <video src={data.content} alt="video" ref={videoRef} loop
            style={{ objectFit: "cover", height: "100%" }}
            onClick={() => setIsPaused(!isPaused)}
          ></video>
        </>
      )}
      {data.contentType === "audio_url" && (
        <AudioDisplay audio={data.content} />
      )}
    </>
  );
};

export default DataDisplay;
