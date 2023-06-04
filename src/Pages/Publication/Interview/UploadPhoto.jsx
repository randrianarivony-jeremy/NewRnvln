import { Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import Compressor from "compressorjs";
import React, { useContext, useRef } from "react";
import { interviewContext } from "./Interview";
import { displayContext } from "./InterviewSlide";
import PubMedia from "./PubMedia";

const UploadPhoto = () => {
  const inputRef = useRef();
  const { setDisplay } = useContext(displayContext);
  const { setShowOptions, swiperRef } = useContext(interviewContext);
  const toast = useToast();

  const handleChange = ({ currentTarget }) => {
    if (currentTarget.files[0].size < 4096000) {
      //slide filled with content
      setShowOptions((current) => {
        let mirror = [...current];
        mirror[swiperRef.current.swiper.activeIndex] = false;
        return mirror;
      });

      //image compressing
      new Compressor(currentTarget.files[0], {
        quality: 0.6,
        success(result) {
          setDisplay(
            <PubMedia data={{ content: result, contentType: "image" }} />
          );
        },
        error(err) {
          console.log({ Error: "Image compression error " + err.message });
        },
      });
    } else
      toast({
        title: "Limite excédée",
        description:
          "Votre fichier est trop lourd. Veuillez ne pas dépasser les 4 mo",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
  };
  return (
    <div>
      <Button
        variant="outline"
        flexDir="column"
        height="30vw"
        maxH={120}
        width="30vw"
        maxW={120}
        onClick={() => inputRef.current.click()}
      >
        <Flex fontSize={40} className="bi-image"></Flex>
        <Text fontSize="xs">Image</Text>
      </Button>
      <Input
        type="file"
        ref={inputRef}
        accept=".jpeg,.jpg,.png"
        display="none"
        onChange={(e) => e.target.files.length > 0 && handleChange(e)}
      />
    </div>
  );
};

export default UploadPhoto;