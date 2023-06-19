import { Box, Button, Flex, Portal, Text } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import Compressor from "compressorjs";
import {
  cameraReverseOutline,
  close,
  radioButtonOnOutline,
} from "ionicons/icons";
import React, { useContext, useRef, useState } from "react";
import Webcam from "react-webcam";
import QuestionSlider from "../../StandalonePost/QuestionSlider";
import { interviewContext } from "./Interview";
import { displayContext } from "./InterviewSlide";
import PubMedia from "./PubMedia";

const TakePhoto = () => {
  const [camera, setCamera] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const webcamRef = useRef();
  const { questions, swiperRef, setShowOptions } = useContext(interviewContext);
  const { setDisplay } = useContext(displayContext);
  const [facingMode, setFacingMode] = useState("environment");

  const capture = () => {
    let imgSrc = webcamRef.current.getScreenshot();
    setShowOptions((current) => {
      let mirror = [...current];
      mirror[swiperRef.current.swiper.activeIndex] = false;
      return mirror;
    });
    fetch(imgSrc)
      .then((response) => response.blob())
      .then((blob) => {
        imgSrc = new File([blob], `${Date.now()}.jpeg`, { type: blob.type });
        new Compressor(imgSrc, {
          quality: 0.6,
          success(result) {
            setDisplay(
              <PubMedia data={{ content: result, contentType: "image" }} />
            );
            setCamera(false);
          },
          error(err) {
            console.log({ Error: "Image compression error " + err.message });
          },
        });
      });
  };

  return (
    <>
      <Button
        variant="outline"
        flexDir="column"
        height="30vw"
        maxH={120}
        width="30vw"
        maxW={120}
        onClick={() => setCamera(true)}
      >
        <Flex fontSize={40} className="bi-camera"></Flex>
        <Text fontSize="xs">Camera</Text>
      </Button>
      {camera && (
        <Portal>
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
                top={2}
                left={3}
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
                top={2}
                right={3}
                onClick={() =>
                  facingMode === "user"
                    ? setFacingMode("environment")
                    : setFacingMode("user")
                }
              >
                <IonIcon icon={cameraReverseOutline} />
              </Button>

              <Flex
                position="absolute"
                top={14}
                left={0}
                zIndex={3}
                width="100%"
              >
                <QuestionSlider
                  question={questions}
                  index={swiperRef.current.swiper.activeIndex}
                />
              </Flex>
            </>
          )}
        </Portal>
      )}
    </>
  );
};

export default TakePhoto;
