import { Box, Button, Image } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import axios from "axios";
import { play } from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLongPress } from "use-long-press";
import { currentUserContext } from "../../Controler/App";
import AudioDisplay from "./AudioDisplay";

const DataDisplay = ({ data }) => {
  const videoRef = useRef();
  const [isPaused, setIsPaused] = useState();
  const {currentUser}=useContext(currentUserContext);
  
  useEffect(() => {
    if (isPaused) videoRef.current?.play();
    else videoRef.current?.pause();
  }, [isPaused]);
  
  return (
    <Box maxW="80%">
      {data.contentType === "string" && (
        <Box whiteSpace="pre-wrap" padding="4px 8px" rounded="lg"
        borderBottomLeftRadius={data.sender!==currentUser._id && 0}
        borderBottomRightRadius={data.sender===currentUser._id && 0}
        bgColor={data.sender===currentUser._id ? "bleu" : ""}
        border={data.sender!==currentUser._id ? "1px solid" : ""}
        >
        {data.content}
      </Box>
      )}
      {data.contentType === "image" && (
        <Image
          src={data.content}
          alt="picture" rounded="xl"
          borderBottomLeftRadius={data.sender!==currentUser._id && 0}
          borderBottomRightRadius={data.sender===currentUser._id && 0}
          />
      )}
      {data.contentType === "video" && (
        <>
          {!isPaused && (
            <Button
              position="absolute"
              zIndex={1}
              fontSize="8xl"
              color="white"
              onClick={() => setIsPaused(!isPaused)}
              ><IonIcon icon={play}/></Button>
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
      {data.contentType === "audio" && (
        <Box rounded="xl" padding="4px 8px"
        borderBottomLeftRadius={data.sender!==currentUser._id && 0}
        borderBottomRightRadius={data.sender===currentUser._id && 0}
        bgColor={data.sender===currentUser._id ? "bleu" : ""}
        border={data.sender!==currentUser._id ? "1px solid" : ""}>
        <AudioDisplay audio={data.content} /></Box>
        )}
    </Box>
  );
};

export default DataDisplay;
