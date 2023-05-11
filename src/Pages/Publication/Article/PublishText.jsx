import { Button, ButtonGroup, Flex, HStack, Select, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResizableTextarea from "../../../Component/ResizableTextarea";
import axios from "axios";
import { currentUserContext } from "../../../Controler/App";

const PublishText = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(currentUserContext);
  const [textareaBg, setTextareaBg] = useState("transparent");
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const toast = useToast();
  const publicConfidentiality=useRef(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    await axios
      .post(process.env.REACT_APP_API_URL + "/api/publication", {
        content: value,
        bg:textareaBg,public:publicConfidentiality.current,
        id_user: currentUser._id,
        contentType: "string",
      })
      .then(() => {
        setSubmitting(false);
        toast({
          title: "Publication réussie",
          status: "success",
          duration: 5000,
          isClosable:true,
          description: "Votre publication a été bien enregistrée !",
        });
        navigate("/");
      },() => {
        toast({
          status: "error",
          duration: 5000,
          isClosable:true,
          description: "Veuillez réessayer s'il vous plait",
          title: "Operation failed",
        });
        setSubmitting(false);
      });
  };

  return (
    <Stack position="relative" height="100%" minH="450px" paddingBottom={2}>
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button
          variant="float"
          className="bi-arrow-left"
          onClick={() => navigate(-1)}
        ></Button>
        <Button fontSize="md">Créer une publication</Button>
      </Flex>
      <Stack
        paddingX={3}
        height="100%"
        minH="calc(100vh - 50px)"
        justify="space-between"
      >
        <Stack>
          <ResizableTextarea
            value={value}
            setValue={setValue}
            textareaBg={textareaBg}
          />
          <ButtonGroup
            variant="float"
            align="center"
            justifyContent="space-around"
          >
            <Button
              border={
                textareaBg === "transparent"
                  ? "2px solid black"
                  : "1px solid black"
              }
              bg="transparent"
              rounded="full"
              onClick={() => setTextareaBg("transparent")}
            ></Button>
            <Button
              border={textareaBg === "gradient1" && "2px solid black"}
              bg="gradient1"
              rounded="full"
              onClick={() => setTextareaBg("gradient1")}
            ></Button>
            <Button
              border={textareaBg === "gradient2" && "2px solid black"}
              bg="gradient2"
              rounded="full"
              onClick={() => setTextareaBg("gradient2")}
            ></Button>
            <Button
              border={textareaBg === "gradient3" && "2px solid black"}
              bg="gradient3"
              rounded="full"
              onClick={() => setTextareaBg("gradient3")}
            ></Button>
            <Button
              border={textareaBg === "gradient4" && "2px solid black"}
              bg="gradient4"
              rounded="full"
              onClick={() => setTextareaBg("gradient4")}
            ></Button>
            <Button
              border={textareaBg === "gradient5" && "2px solid black"}
              bg="gradient5"
              rounded="full"
              onClick={() => setTextareaBg("gradient5")}
            ></Button>
          </ButtonGroup>
          <HStack>
          <Text whiteSpace="nowrap">Confidentialité :</Text>
          <Select onChange={(e)=>publicConfidentiality.current = e.target.value}>
            <option value={false}>Entre amis</option>
            <option value={true}>Public</option>
          </Select>
        </HStack>
        </Stack>

        <HStack>
          <Button width="100%" onClick={() => navigate(-1)}>
            Annuler
          </Button>
          <Button
            isLoading={submitting}
            loadingText="Envoi"
            variant="primary"
            width="100%"
            onClick={handleSubmit}
          >
            Publier
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default PublishText;
