import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import AudioDisplay from "./AudioDisplay";
import InterviewText from "./InterviewText";
import PublicationText from "./PublicationText";

const DataDisplay = ({ data }) => {
  const videoRef = useRef();
  const [isPaused, setIsPaused] = useState();

  useEffect(() => {
    if (isPaused) videoRef.current?.play();
    else videoRef.current?.pause();
  }, [isPaused]);

  return (
    <>
      {data.content.contentType === "string" && (
        <>
          {data.type === "interview" ? (
            <Flex align="flex-end" bg={data.content.bg} height="100%" width="100%">
              <InterviewText/>
            </Flex>
          ) : (
            <Flex align='center' bg={data.content.bg} height="100%" width="100%">
              <PublicationText/>
            </Flex>
          )}
        </>
      )}
      {data.content.contentType === "image" && (
        <Image
          src={data.content.content}
          alt="picture"
          height="100%"
          draggable={false}
          objectFit="cover"
        />
      )}
      {data.content.contentType === "video" && (
        <>
          {!isPaused && (
            <Button
              position="absolute"
              zIndex={1}
              fontSize="8xl"
              className="bi-play-fill"
              color="white"
              onClick={() => setIsPaused(!isPaused)}
            ></Button>
          )}
          <video
            src={data.content.content}
            alt="video"
            ref={videoRef}
            loop
            style={{ objectFit: "cover", height: "100%" }}
            onClick={() => setIsPaused(!isPaused)}
          ></video>
        </>
      )}
      {data.content.contentType === "audio" && (
        <AudioDisplay audio={data.content.content} />
      )}
    </>
  );
};

export default DataDisplay;
