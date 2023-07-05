import { Box, Button, Portal } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import Compressor from "compressorjs";
import {
  cameraReverseOutline,
  close,
  radioButtonOnOutline,
} from "ionicons/icons";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const TakePhoto = ({ output, camera, setCamera }) => {
  const [cameraReady, setCameraReady] = useState(false);
  const webcamRef = useRef();
  const [facingMode, setFacingMode] = useState("environment");

  const capture = () => {
    let imgSrc = webcamRef.current.getScreenshot();
    fetch(imgSrc)
      .then((response) => response.blob())
      .then((blob) => {
        imgSrc = new File([blob], `${Date.now()}.jpeg`, { type: blob.type });
        new Compressor(imgSrc, {
          quality: 0.6,
          success(result) {
            output(result);
            setCameraReady(false);
            setCamera(false);
          },
          error(err) {
            console.log({ Error: "Image compression error " + err.message });
          },
        });
      });
  };

  if (camera)
    return (
      <Portal>
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
                fontSize={80}
                onClick={capture}
              >
                <IonIcon icon={radioButtonOnOutline} />
              </Button>
              {/* CLOSE BUTTON  */}
              <Button
                position="absolute"
                fontSize="2xl"
                zIndex={3}
                top={0}
                left={0}
                onClick={() => {
                  setCamera(false);
                  setCameraReady(false);
                }}
              >
                <IonIcon icon={close} />
              </Button>
              {/* SELFIE BUTTON  */}
              <Button
                fontSize="2xl"
                position="absolute"
                zIndex={3}
                top={0}
                right={0}
                onClick={() =>
                  facingMode === "user"
                    ? setFacingMode("environment")
                    : setFacingMode("user")
                }
              >
                <IonIcon icon={cameraReverseOutline} />
              </Button>
            </>
          )}
        </Box>
      </Portal>
    );
};

export default TakePhoto;
