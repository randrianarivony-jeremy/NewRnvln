import { Button, Input } from "@chakra-ui/react";
import React, { useRef } from "react";

const SendPicture = ({sendResponse}) => {
  const fileInputRef = useRef();

  return (
    <>
      <Button variant='float'
        className="bi-image"
        onClick={() => fileInputRef.current.click()}
      ></Button>
      <Input
        ref={fileInputRef}
        type="file"
        display="none"
        accept=".png,.jpg,.jpeg"
        onChange={(e)=>sendResponse(e.target.files[0],'image')}
      />
    </>
  );
};

export default SendPicture;
