import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import WebCam from "react-webcam";

const TakePicture = ({ sendResponse }) => {
  const [camera, setCamera] = useState(false);
  const [selfie, setSelfie] = useState('environment');
  const webcamRef = useRef();

  const capture = () => {
    const imgSrc = webcamRef.current.getScreenshot();
    sendResponse(imgSrc, "image_url");
    setCamera(false);
  };

  return (
    <Flex>
      <Button className="bi-camera" variant="float" onClick={() => setCamera(!camera)} ></Button>
      {camera && (
        <>
          <Box position="absolute" zIndex={3} top={0} left={0} height='100%'>
            <WebCam ref={webcamRef} mirrored={selfie==='selfie' ? false : true} videoConstraints={{facingMode:selfie}} onUserMediaError={()=>setCamera(false)} screenshotFormat="image/jpeg" style={{height:'100%',objectFit:'cover'}} audio={false}/>
          </Box>
          <Button position="absolute" zIndex={3} left={"50%"} width={100} bottom={10} transform='auto' translateX='-50%'
           bgColor="transparent" className="bi-circle" fontSize={60}
            onClick={capture}
          ></Button>
          <Flex className="camera" top={0} left={0} position="absolute" zIndex={3} justify='space-between' width='100%'>
          <Button className="bi-x" fontSize='xl'
            onClick={() => setCamera(false)}
          ></Button>
          <Button className="bi-arrow-repeat" fontSize='xl'
            onClick={() => selfie==='user' ? setSelfie('environment') : setSelfie('user')}
          ></Button>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default TakePicture;
