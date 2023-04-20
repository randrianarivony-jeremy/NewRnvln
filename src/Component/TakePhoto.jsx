import { Box, Button, Flex, Portal } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const TakePhoto = ({ output, camera, setCamera }) => {
  const [cameraReady, setCameraReady] = useState(false);
  const webcamRef = useRef();
  const [facingMode, setFacingMode] = useState("environment");

  const capture = () => {
    setCamera(false);
    setCameraReady(false);
    output(webcamRef.current.getScreenshot());
  };

  return (
    <Portal>
      {camera && (
        <Box
          position="absolute"
          zIndex={3}
          top={0}
          left={0}
          height="100%"
          width="100%"
        >
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
        </Box>
      )}
    </Portal>
  );
};

export default TakePhoto;
