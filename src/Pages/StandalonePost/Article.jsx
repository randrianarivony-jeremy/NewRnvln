import { Button, Image } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import AudioDisplay from "../../Component/AudioDisplay";
import { dataContext } from "./PostContainer";
import TextPost from "./TextPost";

const Article = () => {
  const videoRef = useRef();
  const [isPaused, setIsPaused] = useState();
  const { data } = useContext(dataContext);

  useEffect(() => {
    if (isPaused) videoRef.current?.play();
    else videoRef.current?.pause();
  }, [isPaused]);

  return (
    <>
      {data.contentType == "video" ? (
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
      ) : data.contentType === "audio" ? (
        <AudioDisplay audio={data.content} />
      ) : data.contentType === "image" ? (
        <Image
          src={data.content}
          alt="picture"
          height="100%"
          draggable={false}
          objectFit="cover"
        />
      ) : (
        <TextPost />
      )}
    </>
  );
};

export default Article;
