import {
  Button,
  Flex,
  HStack,
  Image,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../../Controler/firebase.config";
import AudioDisplay from "../../../Component/AudioDisplay";
import { currentUserContext } from "../../../Controler/App";
import { publicationContext } from "../../../Controler/Context";
import { useCreatePostMutation } from "../../../Controler/Redux/Features/postSlice";

const PublishMedia = () => {
  const navigate = useNavigate();
  const { content } = useContext(publicationContext);
  const { currentUser } = useContext(currentUserContext);
  const descriptionRef = useRef();
  const urlRef = useRef();
  const [createPost, { isSuccess, isError }] = useCreatePostMutation();
  const publicConfidentiality = useRef(false);
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const storeMedia = () => {
    setSubmitting(true);
    const fileName = new Date().getTime() + `${currentUser._id}`;
    const storageRef = ref(
      storage,
      "publication/" + `${content.contentType}` + "/" + fileName
    );
    uploadBytes(storageRef, content.content).then((snapshot) =>
      getDownloadURL(snapshot.ref).then((url) => {
        urlRef.current = url;
        createPost({
          category: "publication",
          body: {
            data: {
              content: urlRef.current,
              public: publicConfidentiality.current,
              description: descriptionRef.current.value,
              contentType: content.contentType,
            },
            id_user: currentUser._id,
          },
        });
      })
    );
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Publication réussie",
        status: "success",
        duration: 5000,
        isClosable: true,
        description: "Votre interview a été bien enregistrée !",
      });
      navigate("/");
    }
    if (isError) {
      toast({
        status: "error",
        isClosable: true,
        duration: 5000,
        description: "Veuillez réessayer s'il vous plait",
        title: "Operation failed",
      });
      setSubmitting(false);
    }
  }, [isSuccess, isError]);

  return (
    <Stack position="relative" spacing={0}>
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button
          variant="float"
          className="bi-arrow-left"
          onClick={() => navigate(-1)}
        ></Button>
        <Button>Créer une publication</Button>
      </Flex>
      <Stack paddingX={3} height="100%" paddingY={2}>
        {content.contentType === "image" ? (
          <Image
            src={URL.createObjectURL(content.content)}
            alt="image"
            width="100%"
            maxHeight={"50vh"}
            objectFit="contain"
          />
        ) : content.contentType === "audio" ? (
          <AudioDisplay audio={URL.createObjectURL(content.content)} />
        ) : (
          <video
            src={URL.createObjectURL(content.content)}
            alt="video"
            width="100%"
            controls
            style={{ objectFit: "contain" }}
          />
        )}
        <Textarea
          ref={descriptionRef}
          placeholder="Description"
          sx={{
            "::-webkit-scrollbar": { display: "none" },
            "::-webkit-resizer": { display: "none" },
          }}
        ></Textarea>
        <HStack>
          <Text whiteSpace="nowrap">Confidentialité :</Text>
          <Select
            onChange={(e) => (publicConfidentiality.current = e.target.value)}
          >
            <option value={false}>Amis et abonnés</option>
            <option value={true}>Public</option>
          </Select>
        </HStack>
        <HStack paddingY={2} paddingX={3} width="100%">
          <Button width="100%" onClick={() => navigate(-1)}>
            Annuler
          </Button>
          <Button
            isLoading={submitting}
            loadingText="Envoi"
            variant="primary"
            width="100%"
            onClick={storeMedia}
          >
            Publier
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default PublishMedia;
