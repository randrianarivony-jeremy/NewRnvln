import { Button, Flex, HStack, Image, Stack, Textarea } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AudioDisplay from "../../Component/Post/AudioDisplay";
import { publicationContext } from "../../Controler/Context";

const PublishImage = () => {
  const navigate = useNavigate();
  const { content } = useContext(publicationContext);

  return (
    <Stack height="100%">
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button
          variant="float"
          className="bi-arrow-left"
          onClick={() => navigate(-1)}
        ></Button>
        <Button>Créer une publication</Button>
      </Flex>
      <Stack paddingX={3}>
        {content.type === "image" ? (
          <Image src={content.content} alt="image" width="100%" objectFit="contain" />
        ) : content.type === "audio" ? (
          <AudioDisplay audio={content.content} />
        ) : (
          <video src={content.content} alt="video" width="100%" controls style={{ objectFit: "contain" }} />
        )}
        <Textarea
          placeholder="Description"
          sx={{
            "::-webkit-scrollbar": { display: "none" },
            "::-webkit-resizer": { display: "none" },
          }}
        ></Textarea>
        <HStack>
          <Button width="100%" onClick={() => navigate(-1)}>
            Annuler
          </Button>
          <Button variant="primary" width="100%" onClick={() => navigate("/")}>
            Publier
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default PublishImage;
