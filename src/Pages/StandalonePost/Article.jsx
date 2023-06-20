import { Button, Image, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import AudioDisplay from "../../Component/AudioDisplay";
import { dataContext } from "./PostContainer";
import TextPost from "./TextPost";

const Article = () => {
  const videoRef = useRef();
  const [isPaused, setIsPaused] = useState();
  // eslint-disable-next-line
  const [imgLoading, setImgLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const { data } = useContext(dataContext);

  useEffect(() => {
    if (isPaused) videoRef.current?.play();
    else videoRef.current?.pause();
  }, [isPaused]);

  return (
    <>
      {data.contentType === "video" ? (
        <>
          {!videoError && !isPaused && (
            <Button
              position="absolute"
              zIndex={1}
              fontSize="8xl"
              className="bi-play-fill"
              color="white"
              onClick={() => setIsPaused(!isPaused)}
            ></Button>
          )}
          {!videoError ? (
            <video
              src={data.content}
              alt="video"
              ref={videoRef}
              loop
              style={{ objectFit: "cover", height: "100%" }}
              onClick={() => setIsPaused(!isPaused)}
              onError={() => setVideoError(true)}
            ></video>
          ) : (
            <Text opacity={0.5} fontStyle="italic">
              Video indisponible
            </Text>
          )}
        </>
      ) : data.contentType === "audio" ? (
        <AudioDisplay audio={data.content} />
      ) : data.contentType === "image" ? (
        <>
          {imgError ? (
            <Text opacity={0.5} fontStyle="italic">
              Image indisponible
            </Text>
          ) : (
            <>
              <Image
                src={data.content}
                alt="picture"
                height="100%"
                draggable={false}
                objectFit="cover"
                onLoad={() => setImgLoading(false)}
                onError={() => {
                  setImgError(true);
                  setImgLoading(false);
                }}
              />
            </>
          )}
        </>
      ) : (
        <TextPost />
      )}
    </>
  );
};

export default Article;
