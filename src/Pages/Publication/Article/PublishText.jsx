import { Button, ButtonGroup, Flex, HStack, Select, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundOptions from "../../../Component/BackgroundOptions";
import ResizableTextarea from "../../../Component/ResizableTextarea";
import { apiCall, currentUserContext } from "../../../Controler/App";

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
    await apiCall
      .post( "publication", {
        data:{
          content: value,
          bg:textareaBg,
          contentType: value.length<320 ? "short" : "text",
        },
        public:publicConfidentiality.current,
        id_user: currentUser._id,
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
        {value.length<320 && <BackgroundOptions textareaBg={textareaBg} setTextareaBg={setTextareaBg}/>}
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
