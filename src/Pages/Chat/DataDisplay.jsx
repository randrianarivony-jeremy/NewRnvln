import { Box, Button, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { play } from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { currentUserContext } from "../../Controler/App";
import AudioDisplay from "./AudioDisplay";
import { chatContext } from "./Chat";

const DataDisplay = ({ message }) => {
  const videoRef = useRef();
  const [isPaused, setIsPaused] = useState();
  const [imgLoading, setImgLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const { currentUser } = useContext(currentUserContext);
  const { mediaRef } = useContext(chatContext);

  useEffect(() => {
    if (isPaused) videoRef.current?.play();
    else videoRef.current?.pause();
  }, [isPaused]);

  return (
    <Box maxW="75%" className="messagedisplay">
      {message.contentType === "string" && (
        <Box
          whiteSpace="pre-wrap"
          padding="4px 8px"
          rounded="lg"
          borderBottomLeftRadius={message.sender !== currentUser._id && 0}
          borderBottomRightRadius={message.sender === currentUser._id && 0}
          bgColor={message.sender === currentUser._id ? "bleu" : ""}
          border={message.sender !== currentUser._id ? "1px solid" : ""}
        >
          {message.content}
        </Box>
      )}
      {message.contentType === "image" && (
        <>
          {imgLoading && <Skeleton height={240} width={150} rounded="xl" />}
          {imgError && (
            <Flex
              width={150}
              height={240}
              align={"center"}
              justify="center"
              rounded={"xl"}
              border="1px solid"
              borderColor={"blackAlpha.200"}
            >
              <Text opacity={0.5} fontStyle="italic">
                Image indisponible
              </Text>
            </Flex>
          )}
          {!imgError && (
            <Image
              ref={mediaRef}
              src={message.content}
              alt="picture"
              rounded="xl"
              borderBottomLeftRadius={message.sender !== currentUser._id && 0}
              borderBottomRightRadius={message.sender === currentUser._id && 0}
              onLoad={() => setImgLoading(false)}
              onError={() => {
                setImgError(true);
                setImgLoading(false);
              }}
            />
          )}
        </>
      )}
      {message.contentType === "video" && (
        <>
          {!isPaused && (
            <Button
              position="absolute"
              zIndex={1}
              fontSize="8xl"
              color="white"
              onClick={() => setIsPaused(!isPaused)}
            >
              <IonIcon icon={play} />
            </Button>
          )}
          <video
            src={message.content}
            alt="video"
            ref={videoRef}
            loop
            style={{ objectFit: "cover", height: "100%" }}
            onClick={() => setIsPaused(!isPaused)}
          ></video>
        </>
      )}
      {message.contentType === "audio" && (
        <Box
          rounded="xl"
          padding="4px 8px"
          borderBottomLeftRadius={message.sender !== currentUser._id && 0}
          borderBottomRightRadius={message.sender === currentUser._id && 0}
          bgColor={message.sender === currentUser._id ? "bleu" : ""}
          border={message.sender !== currentUser._id ? "1px solid" : ""}
        >
          <AudioDisplay audio={message.content} />
        </Box>
      )}
    </Box>
  );
};

export default DataDisplay;
