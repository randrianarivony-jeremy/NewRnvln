import { Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Component/Navigation";
import { publicationContext } from "../../Controler/Context";
import SendVoice from "./Article/SendVoice";
import TakePhoto from "../../Component/TakePhoto";
import UploadPhoto from "./Article/UploadPhoto";
import UploadVideo from "./Article/UploadVideo";
import VideoRecord from "./Article/VideoRecord";
import { IonIcon } from "@ionic/react";
import { cameraOutline } from "ionicons/icons";

const Publication = () => {
  const navigate = useNavigate();
  const { setContent } = useContext(publicationContext);
  const [camera, setCamera] = useState(false);

  const handlePhoto = (imgSrc) => {
    setContent({ content: imgSrc, contentType: "image" });
    navigate("/publication/media");
  };
  return (
    <Stack height="100%">
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button width="100%">Publication</Button>
      </Flex>
      <Stack height="100%" paddingX={3} justify="space-around">
        <Stack>
          <HStack alignItems="center" justify="center">
            <Button
              variant="outline"
              flexDir="column"
              height="30vw"
              maxH={120}
              width="30vw"
              maxW={120}
              onClick={() => setCamera(true)}
            >
              <IonIcon icon={cameraOutline} style={{fontSize:'40px'}}/>
              <Text fontSize="xs">Camera</Text>
              <TakePhoto
                setCamera={setCamera}
                camera={camera}
                output={handlePhoto}
              />
            </Button>
            <Button
              variant="outline"
              flexDir="column"
              height="30vw"
              maxH={120}
              width="30vw"
              maxW={120}
              onClick={() => navigate("/publication/text")}
            >
              <Flex fontSize={40}>Aa</Flex>
              <Text fontSize="xs">Texte</Text>
            </Button>
          </HStack>
          <HStack alignItems="center" justify="center">
            <UploadPhoto />
            <UploadVideo />
          </HStack>
          <HStack alignItems="center" justify="center">
            <SendVoice />
            <VideoRecord />
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

export default Publication;
