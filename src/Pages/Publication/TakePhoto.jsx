import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { publicationContext } from "../../Controler/Context";

const TakePhoto = () => {
    const [camera, setCamera] = useState(false);
    const webcamRef = useRef();
    const {setContent}=useContext(publicationContext);
    const navigate = useNavigate();
    const [selfie, setSelfie] = useState('environment');
  
    const capture = () => {
      const imgSrc = webcamRef.current.getScreenshot();
      setContent({content:imgSrc,type:'image'});
      navigate('/publication/image');
      setCamera(false);
    };

  return (
    <div>
      <Button variant="outline" flexDir="column" boxSize={120} onClick={() => setCamera(true)}>
            <Flex fontSize={40} className="bi-camera"></Flex>
            <Text fontSize='xs'>Camera</Text>
          </Button>
      {camera && (
        <>
          <Box position="absolute" zIndex={3} top={0} left={0} height="100%">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={{ height: "100%", objectFit: "cover" }}
              audio={false}
              onUserMediaError={()=>setCamera(false)}
              mirrored={selfie==='selfie' ? true : false} videoConstraints={{facingMode:selfie}}
            />
          </Box>
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
    </div>
  );
};

export default TakePhoto;
