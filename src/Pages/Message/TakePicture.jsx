import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import WebCam from "react-webcam";

const TakePicture = ({ sendResponse }) => {
  const [camera, setCamera] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const webcamRef = useRef();

  const capture = () => {
    const imgSrc = webcamRef.current.getScreenshot();
    sendResponse(imgSrc, "image_url");
    setCamera(false);
  };

  return (
    <Flex>
      <Button
        className="bi-camera"
        variant="float"
        onClick={() => setCamera(!camera)}
      ></Button>
      {camera && (
        <>
          <Box position="absolute" zIndex={3} top={0} left={0} height="100%">
            <WebCam
              ref={webcamRef}
              onUserMedia={() => setCameraReady(true)}
              mirrored={facingMode === "user" ? true : false}
              videoConstraints={{ facingMode }}
              onUserMediaError={() => setCamera(false)}
              screenshotFormat="image/jpeg"
              style={{ height: "100%", objectFit: "cover" }}
              audio={false}
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
    </Flex>
  );
};

export default TakePicture;
