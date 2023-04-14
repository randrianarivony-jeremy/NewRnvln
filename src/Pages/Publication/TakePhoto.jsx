import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { publicationContext } from "../../Controler/Context";

const TakePhoto = () => {
  const [camera, setCamera] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const webcamRef = useRef();
  const { setContent } = useContext(publicationContext);
  const navigate = useNavigate();
  const [facingMode, setFacingMode] = useState("environment");

  const capture = () => {
    const imgSrc = webcamRef.current.getScreenshot();
    setContent({ content: imgSrc, type: "image" });
    navigate("/publication/media");
    setCamera(false);
  };

  return (
    <div>
      <Button
        variant="outline"
        flexDir="column"
        boxSize='30vw'
        onClick={() => setCamera(true)}
      >
        <Flex fontSize={40} className="bi-camera"></Flex>
        <Text fontSize="xs">Camera</Text>
      </Button>
      {camera && (
        <>
          <Box position="absolute" zIndex={3} top={0} left={0} height="100%">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={{ height: "100%", objectFit: "cover" }}
              audio={false}
              onUserMedia={() => setCameraReady(true)}
              onUserMediaError={() => setCamera(false)}
              mirrored={facingMode === "user" ? true : false}
              videoConstraints={{ facingMode }}
            />
          </Box>
        </>
      )}

      {cameraReady && (
        <>
          <Button
            position="absolute"
            zIndex={3}
            left={"50%"}
            width={100}
            bottom={"10%"}
            transform="auto"
            translateX="-50%"
            bgColor="transparent"
            className="bi-circle"
            fontSize={80}
            onClick={capture}
          ></Button>
          <Flex
            className="camera"
            top={0}
            left={0}
            position="absolute"
            zIndex={3}
            justify="space-between"
            width="100%"
          >
            <Button
              className="bi-x-lg"
              fontSize="xl"
              onClick={() => {
                setCamera(false);
                setCameraReady(false);
              }}
            ></Button>
            <Button
              className="bi-arrow-repeat"
              fontSize="xl"
              onClick={() =>
                facingMode === "user"
                  ? setFacingMode("environment")
                  : setFacingMode("user")
              }
            ></Button>
          </Flex>
        </>
      )}
    </div>
  );
};

export default TakePhoto;
