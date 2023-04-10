import { Box, Button } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import WebCam from "react-webcam";

const TakePicture = ({ sendResponse }) => {
  const [camera, setCamera] = useState(false);
  const webcamRef = useRef();

  const capture = () => {
    const imgSrc = webcamRef.current.getScreenshot();
    sendResponse(imgSrc, "image_url");
    setCamera(false);
  };

  return (
    <div>
      <Button className="bi-camera" variant="float" onClick={() => setCamera(!camera)} ></Button>
      {camera && (
        <>
          <Box position="absolute" zIndex={2} top={0} left={0} height='100%'>
            <WebCam ref={webcamRef} screenshotFormat="image/jpeg" style={{height:'100%',objectFit:'cover'}} audio={false}/>
          </Box>
          <Button position="absolute" zIndex={2} left={"50%"} width={100} bottom={"10%"} transform='auto' translateX='-50%'
           bgColor="transparent" className="bi-circle" fontSize={80}
            onClick={capture}
          ></Button>
          <Button position="absolute" zIndex={2} top="20px" left={"20px"} className="bi-x"
            onClick={() => setCamera(false)}
          ></Button>
        </>
      )}
    </div>
  );
};

export default TakePicture;
