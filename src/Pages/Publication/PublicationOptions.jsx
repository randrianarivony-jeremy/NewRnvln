import { Box, Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Component/Navigation";
import PublishVideo from "./PublishVideo";
import SendVoice from "./SendVoice";
import TakePhoto from "./TakePhoto";
import UploadPhoto from "./UploadPhoto";
import UploadVideo from "./UploadVideo";

const PublicationOptions = () => {
  const navigate = useNavigate();
  return (
    <Stack height="100%">
      <Button width="100%">
        Publication
      </Button>
      <Stack height='100%' paddingX={3} justify="space-around">
        <Stack>
          <HStack alignItems="center" justify="center">
            <TakePhoto />
            <Button variant="outline" flexDir="column" boxSize={120} onClick={()=>navigate('/publication/text')}>
              <Flex fontSize={40}>Aa</Flex>
              <Text fontSize='xs'>Texte</Text>
            </Button>
          </HStack>
          <HStack alignItems="center" justify="center">
            <UploadPhoto/>
            <UploadVideo/>
          </HStack>
          <HStack alignItems="center" justify="center">
            <SendVoice/>
            <PublishVideo/>
          </HStack>
        </Stack>
        <Button variant="cta" onClick={() => navigate("/question")}>
          Poser une question
        </Button>
      </Stack>
      <Navigation />
    </Stack>
  );
};

export default PublicationOptions;
