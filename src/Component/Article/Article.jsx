import { Button, Flex, Image } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import AudioDisplay from "../AudioDisplay";
import { postContext } from "../Post/PostContainer";
import ArticleText from "./ArticleText";

const Article = () => {
  const videoRef = useRef();
  const [isPaused, setIsPaused] = useState();
  const { post } = useContext(postContext);

  useEffect(() => {
    if (isPaused) videoRef.current?.play();
    else videoRef.current?.pause();
  }, [isPaused]);

  return (
    <>
      {post.contentType == "video" ? (
        <>
          {!isPaused && (
            <Button position="absolute" zIndex={1} fontSize="8xl" className="bi-play-fill" color="white"
              onClick={() => setIsPaused(!isPaused)}
            ></Button>
          )}
          <video src={post.content} alt="video" ref={videoRef} loop
            style={{ objectFit: "cover", height: "100%" }}
            onClick={() => setIsPaused(!isPaused)}
          ></video>
        </>
      ) : post.contentType === "audio" ? (
        <AudioDisplay audio={post.content} />
      ) : post.contentType === "image" ? (
        <Image src={post.content} alt="picture" height="100%" draggable={false} objectFit="cover" />
      ) : (
        <Flex align="center" justify="center" height="100%" width="100%">
          <ArticleText />
        </Flex>
      )}
    </>
  );
};

export default Article;
