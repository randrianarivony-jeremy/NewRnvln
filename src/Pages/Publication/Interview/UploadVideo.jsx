import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import { interviewContext } from "./Interview";
import { displayContext } from "./InterviewSlide";
import PubMedia from "./PubMedia";

const UploadVideo = () => {
  const inputRef = useRef();
  const { setDisplay } = useContext(displayContext);
  const { setShowOptions, swiperRef } = useContext(interviewContext);
  const toast = useToast();

  const handleChange = ({ currentTarget }) => {
    if (currentTarget.files[0].size < 20480000) {
        setShowOptions((current) => {
          let mirror = [...current];
          mirror[swiperRef.current.swiper.activeIndex]=false;
          return mirror;
        })
      setDisplay(
        <PubMedia
          data={{ content: currentTarget.files[0], contentType: "video" }}
        />
      );
    } else
      toast({
        title: "Limite excédée",
        description:
          "Votre fichier est trop lourd. Veuillez ne pas dépasser les 20 mo",
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
        <Flex fontSize={40} className="bi-film"></Flex>
        <Text fontSize="xs">Video</Text>
      </Button>
      <Input
        type="file"
        ref={inputRef}
        accept=".mp4,.webm"
        display="none"
        onChange={handleChange}
      />
    </div>
  );
};

export default UploadVideo;
