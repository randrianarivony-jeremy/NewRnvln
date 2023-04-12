import { Button, HStack, Image, Stack, Textarea } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AudioDisplay from "../../Component/Post/AudioDisplay";
import { optionContext } from "./Interview";
import Options from "./Options";

const PubMedia = ({data}) => {
  const navigate = useNavigate();
  const {setDisplay}=useContext(optionContext);

  return (
    <Stack height="100%">
      <Stack paddingX={3}>
        {data.type === "image" ? (
          <Image src={data.content} alt="image" width="100%" objectFit="contain" />
        ) : data.type === "audio" ? (
          <AudioDisplay audio={data.content} />
        ) : (
          <video src={data.content} alt="video" width="100%" controls style={{ objectFit: "contain" }} />
        )}
        <Textarea
          placeholder="Description"
          sx={{
            "::-webkit-scrollbar": { display: "none" },
            "::-webkit-resizer": { display: "none" },
          }}
        ></Textarea>
        <HStack>
          <Button width="100%" onClick={() => setDisplay(<Options/>)}>
            Changer
          </Button>
          <Button variant="primary" width="100%" onClick={() => navigate("/")}>
            Publier
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default PubMedia;
