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
      {data.contentType === "string" && (
        <>
          {data.type === "interview" ? (
            <Flex align="flex-end" bg={data.bg} height="100%" width="100%">
              <InterviewText post={data} />
            </Flex>
          ) : (
            <Flex align='flex-end' bg={data.bg} height="100%" width="100%">
              <PublicationText/>
            </Flex>
          )}
        </>
      )}
      {data.contentType === "image_url" && (
        <Image
          src={data.content}
          alt="picture"
          height="100%"
          draggable={false}
          objectFit="cover"
        />
      )}
      {data.contentType === "video_url" && (
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
            src={data.content}
            alt="video"
            ref={videoRef}
            loop
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
