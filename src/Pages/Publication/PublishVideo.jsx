import { Box, Button, ButtonGroup, Flex, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useCallback, useContext, useRef, useState } from "react";
import WebCam from "react-webcam";
import { useStopwatch } from "react-timer-hook";
import { publicationContext } from "../../Controler/Context";
import { useNavigate } from "react-router-dom";

const PublishVideo = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [camera, setCamera] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPaused, setIsPaused] = useState(true);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const {setContent}=useContext(publicationContext);
  const navigate=useNavigate();
  const { seconds, minutes, start, pause } = useStopwatch({
    autoStart: false,
  });
  const bg = useColorModeValue('white','dark.0');

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick =() => {
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

  const handlePlay=()=>{
    start();
    setIsPaused(false);
    mediaRecorderRef.current.resume();
  }

  const handlePause=()=>{
    pause();
    setIsPaused(true)
    mediaRecorderRef.current.pause();
  }

  const handleStopCaptureClick = () => {
    mediaRecorderRef.current.stop();
    pause();
    setCapturing(false);
  };

  const handleSubmit = ()=>{
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      setContent({content:URL.createObjectURL(blob), type:"video"});
      setCamera(false);
      setRecordedChunks([]);
      navigate('/publication/image')
    }
  };

  const handleExit=()=>{
    onOpen();
    handlePause();
  }

  const handleConfirmExit=()=>{
    handleStopCaptureClick();
    setCamera(false);
    onClose();
  }

  return (
    <div>
      <Button variant="outline" flexDir="column" boxSize={120} onClick={() => {setRecordedChunks([]);setCamera(!camera)}}>
              <Flex fontSize={40} className="bi-camera-video"></Flex>
              <Text fontSize='xs'>Film</Text>
            </Button>
      {/* CAMERA  */}
      {camera && (
        <Box position="absolute" zIndex={3} top={0} left={0} height='100%'>
          <WebCam ref={webcamRef} audio="true" onUserMediaError={()=>setCamera(false)} style={{height:'100%',objectFit:'cover'}} mirrored="true" />
        </Box>
      )}

      {/* CLOSE BUTTON  */}
      {camera && (<Button position='absolute' zIndex={3} top='20px' left={'20px'} className="bi-x"
      onClick={()=>capturing ? handleExit() : setCamera(false)}></Button>)}

      {/* CONTROLS BUTTONS */}
      {camera && (
        <HStack position="absolute" zIndex={3} left={"50%"} transform='auto' translateX='-50%' bottom={'10%'}
        >
          {capturing && <HStack>
          {isPaused ? (
            <Button className="bi-play" onClick={handlePlay}></Button>
          ) : (
            <Button className="bi-pause" onClick={handlePause}></Button>
          )}
          <Box>
            <span>{String(minutes).padStart(2, 0)}</span>:
            <span>{String(seconds).padStart(2, 0)}</span>
          </Box>
          </HStack>}

          {/* start & end capturing button  */}
          {!capturing ? (
            <Button
              bgColor="transparent" border='2px solid red'
              className={"bi-circle-fill"}
              fontSize={40}
              onClick={handleStartCaptureClick}
            ></Button>
          ) : (
            <Button className="bi-square-fill" color='red' onClick={handleStopCaptureClick}>
            </Button>
          )}



          {/* SAVE & RESET BUTTON  */}
          {(recordedChunks.length>0 && !capturing) && <ButtonGroup>
            <Button onClick={handleStartCaptureClick} className="bi-arrow-clockwise"></Button>
            <Button onClick={handleSubmit} className="bi-check-lg"></Button>
          </ButtonGroup>
            }
        </HStack>
      )}

            {/* Exit confirmation modal */}
<Modal isCentered onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bg={bg}>
          <ModalHeader>Fermer la camera</ModalHeader>
          <ModalBody>Tena hiala marina ve ? Mbola misy enregistrement mandeha ao mantsy</ModalBody>
          <ModalFooter>
            <ButtonGroup>
            <Button bgColor='transparent' onClick={handleConfirmExit}>Confirmer</Button>
            <Button variant='outline' onClick={onClose}>Annuler</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PublishVideo;
