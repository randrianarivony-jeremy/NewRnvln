import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const Thumbs = ({ data }) => {
  return (
    <Flex position="relative" boxSize={100}>
      {data.contentType === "string" && (
        <Flex height="100%" width="100%" bg={data.bg}>
          <Text
            whiteSpace="pre-wrap"
            fontSize="xs"
            overflowY='hidden'
            maxH="80%"
            maxW="90%"
            textAlign="center"
            margin="auto"
          >
            {data.content}
          </Text>
        </Flex>
      )}
      {data.contentType === "image" && (
        <Image
          src={data.content}
          alt="picture"
          height="100%"
          width="100%"
          draggable={false}
          objectFit="cover"
        />
      )}
      {data.contentType === "video" && (
        <>
          <Button
            position="absolute"
            zIndex={1}
            top="50%"
            left="50%"
            fontSize='5xl'
            transform="auto"
            translateY="-50%"
            translateX="-50%" color='white'
            className="bi-play-fill"
          ></Button>
          <video
            src={data.content}
            alt="video"
            style={{ objectFit: "cover", height: "100%",width:'100%' }}
          ></video>
        </>
      )}
      {data.contentType === "audio" && (
        <Box className="bi-soundwave" margin="auto" fontSize="5xl"></Box>
      )}
    </Flex>
  );
};

export default Thumbs;
