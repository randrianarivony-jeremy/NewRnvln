import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Portal,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useContext, useRef, useState } from "react";
import WebCam from "react-webcam";
import { useStopwatch } from "react-timer-hook";
import PubMedia from "./PubMedia";
import { interviewContext } from "./Interview";
import QuestionSlider from "../../StandalonePost/QuestionSlider";
import { displayContext } from "./InterviewSlide";
import { IonIcon } from "@ionic/react";
import {
  cameraReverseOutline,
  checkmark,
  close,
  ellipse,
  pauseOutline,
  playOutline,
  refreshOutline,
  square,
} from "ionicons/icons";

const TakeVideo = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [camera, setCamera] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPaused, setIsPaused] = useState(true);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [facingMode, setFacingMode] = useState("environment");
  const { setDisplay } = useContext(displayContext);
  const { questions, setShowOptions, swiperRef } = useContext(interviewContext);

  const { seconds, minutes, start, pause } = useStopwatch({
    autoStart: false,
  });
  const bg = useColorModeValue("whiteAlpha.500", "blackAlpha.500");
  const modalBg = useColorModeValue("white", "dark.0");

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = () => {
    start();
    setIsPaused(false);
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  };

  const handlePlay = () => {
    start();
    setIsPaused(false);
    mediaRecorderRef.current.resume();
  };

  const handlePause = () => {
    pause();
    setIsPaused(true);
    mediaRecorderRef.current.pause();
  };

  const handleStopCaptureClick = () => {
    mediaRecorderRef.current.stop();
    pause();
    setCapturing(false);
  };

  const handleSubmit = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      setCamera(false);
      setRecordedChunks([]);
      setShowOptions((current) => {
        let mirror = [...current];
        mirror[swiperRef.current.swiper.activeIndex] = false;
        return mirror;
      });
      setDisplay(<PubMedia data={{ content: blob, contentType: "video" }} />);
    }
  };

  const handleExit = () => {
    setCamera(false);
    setCameraReady(false);
  };

  const handleCancel = () => {
    onOpen();
    handlePause();
  };

  const handleConfirmExit = () => {
    handleStopCaptureClick();
    handleExit();
    onClose();
  };

  return (
    <div>
      <Button
        variant="outline"
        flexDir="column"
        height="20vw"
        maxH={100}
        width="20vw"
        maxW={100}
        onClick={() => {
          setRecordedChunks([]);
          setCamera(!camera);
        }}
      >
        <Flex fontSize={40} className="bi-camera-video"></Flex>
        <Text fontSize="xs">Film</Text>
      </Button>
      {/* CAMERA  */}
      {camera && (
        <Portal>
          <Box position="absolute" zIndex={3} top={0} left={0} height="100%">
            <WebCam
              ref={webcamRef}
              audio="true"
              onUserMedia={() => setCameraReady(true)}
              onUserMediaError={() => setCamera(false)}
              style={{ height: "100%", objectFit: "cover" }}
              mirrored={facingMode === "user" ? true : false}
              videoConstraints={{ facingMode }}
            />
          </Box>

          {cameraReady && (
            <>
              {/* CLOSE BUTTON  */}
              <Button
                position="absolute"
                fontSize="2xl"
                zIndex={3}
                top={2}
                left={3}
                onClick={() => (capturing ? handleCancel() : handleExit())}
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

              {/* CONTROLS BUTTONS */}
              <HStack
                position="absolute"
                zIndex={3}
                left={"50%"}
                transform="auto"
                translateX="-50%"
                bottom={"10%"}
                bgColor={bg}
                rounded="full"
                width={180}
                justify="center"
                height={12}
                align="center"
              >
                {capturing && (
                  <HStack>
                    {isPaused ? (
                      <Button onClick={handlePlay} fontSize="2xl">
                        <IonIcon icon={playOutline} />
                      </Button>
                    ) : (
                      <Button onClick={handlePause} fontSize="2xl">
                        <IonIcon icon={pauseOutline} />
                      </Button>
                    )}
                    <Box>
                      <span>{String(minutes).padStart(2, 0)}</span>:
                      <span>{String(seconds).padStart(2, 0)}</span>
                    </Box>
                    <Button
                      fontSize={"2xl"}
                      color="red"
                      onClick={handleStopCaptureClick}
                    >
                      <IonIcon icon={square} />
                    </Button>
                  </HStack>
                )}

                {/* SAVE & RESET BUTTON  */}
                {recordedChunks.length > 0 && !capturing && (
                  <Button fontSize={"2xl"} onClick={handleStartCaptureClick}>
                    <IonIcon icon={refreshOutline} />
                  </Button>
                )}
                {/* start & end capturing button  */}
                {!capturing && (
                  <Button
                    boxSize={12}
                    rounded="full"
                    bgColor="transparent"
                    border="2px solid red"
                    fontSize={"3xl"}
                    onClick={handleStartCaptureClick}
                  >
                    <IonIcon icon={ellipse} />
                  </Button>
                )}

                {/* SAVE & RESET BUTTON  */}
                {recordedChunks.length > 0 && !capturing && (
                  <Button fontSize={"2xl"} onClick={handleSubmit}>
                    <IonIcon icon={checkmark} />
                  </Button>
                )}
              </HStack>
            </>
          )}
        </Portal>
      )}

      {/* Exit confirmation modal */}
      <Modal isCentered onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalHeader>Fermer la camera</ModalHeader>
          <ModalBody>
            Tena hiala marina ve ? Mbola misy enregistrement mandeha ao mantsy
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button bgColor="transparent" onClick={handleConfirmExit}>
                Confirmer
              </Button>
              <Button variant="outline" onClick={onClose}>
                Annuler
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TakeVideo;
