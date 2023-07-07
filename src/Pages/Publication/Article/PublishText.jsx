import {
  Button,
  Flex,
  HStack,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundOptions from "../../../Component/BackgroundOptions";
import ResizableTextarea from "../../../Component/ResizableTextarea";
import { currentUserContext } from "../../../Controler/App";
import { useCreatePostMutation } from "../../../Controler/Redux/Features/postSlice";

const PublishText = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(currentUserContext);
  const [textareaBg, setTextareaBg] = useState("transparent");
  const [value, setValue] = useState("");
  const [createPost, { isLoading, isSuccess, isError }] =
    useCreatePostMutation();
  const toast = useToast();
  const publicConfidentiality = useRef(false);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Publication réussie",
        status: "success",
        duration: 5000,
        isClosable: true,
        description: "Votre publication a été bien enregistrée !",
      });
      navigate("/");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError)
      toast({
        status: "error",
        duration: 5000,
        isClosable: true,
        description: "Veuillez réessayer s'il vous plait",
        title: "Operation failed",
      });
  }, [isError]);

  return (
    <Stack position="relative" height="100%" paddingBottom={2}>
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button
          variant="float"
          className="bi-arrow-left"
          onClick={() => navigate(-1)}
        ></Button>
        <Button fontSize="md">Créer une publication</Button>
      </Flex>
      <Stack paddingX={3} height="100%" spacing={10}>
        <Stack>
          <ResizableTextarea
            value={value}
            setValue={setValue}
            textareaBg={textareaBg}
          />
          {value.length < 320 && (
            <BackgroundOptions
              textareaBg={textareaBg}
              setTextareaBg={setTextareaBg}
            />
          )}
          <HStack>
            <Text whiteSpace="nowrap">Confidentialité :</Text>
            <Select
              onChange={(e) => (publicConfidentiality.current = e.target.value)}
            >
              <option value={false}>Amis et abonnés</option>
              <option value={true}>Public</option>
            </Select>
          </HStack>
        </Stack>
        <HStack>
          <Button width="100%" onClick={() => navigate(-1)}>
            Annuler
          </Button>
          <Button
            isLoading={isLoading}
            loadingText="Envoi"
            variant="primary"
            width="100%"
            onClick={() =>
              createPost({
                category: "publication",
                body: {
                  data: {
                    content: value,
                    bg: textareaBg,
                    contentType: value.length < 320 ? "short" : "text",
                  },
                  public: publicConfidentiality.current,
                  id_user: currentUser._id,
                },
              })
            }
          >
            Publier
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default PublishText;
