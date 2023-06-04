import { Box, Button, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Thumbs = ({ data }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  return (
    <Flex
      position="relative"
      boxSize={100}
      border="1px solid"
      borderColor={"blackAlpha.200"}
      onClick={() => navigate(`/post/${data.type}/` + data._id)}
    >
      {(data.data[0].contentType === "short" ||
        data.data[0].contentType === "text") && (
        <Flex height="100%" width="100%" bg={data.data[0].bg}>
          <Text
            whiteSpace="pre-wrap"
            fontSize="xs"
            overflowY="hidden"
            maxH="80%"
            maxW="90%"
            textAlign="center"
            margin="auto"
          >
            {data.data[0].content}
          </Text>
        </Flex>
      )}
      {data.data[0].contentType === "image" && (
        <>
          {loading && (
            <Skeleton
              height="100%"
              width="100%"
              position="absolute"
              top={0}
              zIndex={1}
            />
          )}
          {imgError ? (
            <Text
              opacity={0.5}
              fontStyle="italic"
              fontSize={"xs"}
              margin="auto"
              textAlign={"center"}
            >
              Image indisponible
            </Text>
          ) : (
            <Image
              src={data.data[0].content}
              alt="picture"
              height="100%"
              width="100%"
              draggable={false}
              objectFit="cover"
              onLoad={() => setLoading(false)}
              onError={() => {
                setImgError(true);
                setLoading(false);
              }}
            />
          )}
        </>
      )}
      {data.data[0].contentType === "video" && (
        <>
          {loading && (
            <Skeleton
              height="100%"
              width="100%"
              position="absolute"
              top={0}
              zIndex={1}
            />
          )}
          {videoError ? (
            <Text
              opacity={0.5}
              fontStyle="italic"
              fontSize={"xs"}
              margin="auto"
              textAlign={"center"}
            >
              Video indisponible
            </Text>
          ) : (
            <>
              <Button
                position="absolute"
                zIndex={1}
                top="50%"
                left="50%"
                fontSize="5xl"
                transform="auto"
                translateY="-50%"
                translateX="-50%"
                color="white"
                className="bi-play-fill"
              ></Button>
              <video
                src={data.data[0].content}
                alt="video"
                onLoad={() => setLoading(false)}
                onError={() => {
                  setVideoError(true);
                  setLoading(false);
                }}
                style={{ objectFit: "cover", height: "100%", width: "100%" }}
              ></video>
            </>
          )}
        </>
      )}
      {data.data[0].contentType === "audio" && (
        <Box className="bi-soundwave" margin="auto" fontSize="5xl"></Box>
      )}
    </Flex>
  );
};

export default Thumbs;
