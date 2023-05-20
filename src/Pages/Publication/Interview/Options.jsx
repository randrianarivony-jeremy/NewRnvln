import { Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { interviewContext } from "./Interview";
import { displayContext } from "./InterviewSlide";
import PubText from "./PubText";
import SendVoice from "./SendVoice";
import TakePhoto from "./TakePhoto";
import TakeVideo from "./TakeVideo";
import UploadPhoto from "./UploadPhoto";
import UploadVideo from "./UploadVideo";

const Options = () => {
  const { setDisplay } = useContext(displayContext);
  const { setShowOptions, swiperRef } = useContext(interviewContext);

  return (
    <Stack>
      <HStack alignItems="center" justify="center">
        <Button
          variant="outline"
          flexDir="column"
          height="30vw"
          maxH={120}
          width="30vw"
          maxW={120}
          onClick={() => {
            setShowOptions((current) => {
              current[swiperRef.current.swiper.activeIndex] = false;
              return current;
            });
            setDisplay(<PubText />);
          }}
        >
          <Flex fontSize={40}>Aa</Flex>
          <Text fontSize="xs">Texte</Text>
        </Button>
        <UploadPhoto />
        <TakeVideo />
      </HStack>
      <HStack alignItems="center" justify="center">
        <SendVoice />
        <TakePhoto />
        <UploadVideo />
      </HStack>
    </Stack>
  );
};

export default Options;
