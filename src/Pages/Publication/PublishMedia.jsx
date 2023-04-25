import {
  Button,
  Flex,
  HStack,
  Image,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AudioDisplay from "../../Component/Post/AudioDisplay";
import { currentUserContext } from "../../Controler/App";
import { publicationContext } from "../../Controler/Context";
import { storage } from "../../Controler/firebase.config";

const PublishMedia = () => {
  const navigate = useNavigate();
  const { content } = useContext(publicationContext);
  const { currentUser } = useContext(currentUserContext);
  const descriptionRef = useRef();
  const urlRef = useRef();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const storeMedia = () => {
    setSubmitting(true);
    const fileName = new Date().getTime() + `${currentUser._id}`;
    if (content.contentType === "image_url") {
      const storageRef = ref(storage, "interview/image/" + fileName);
      uploadString(storageRef, content.content, "data_url").then((snapshot) =>
        getDownloadURL(snapshot.ref).then((url) => {
          urlRef.current = url;
          handleSubmit();
        })
      );
    } else {
      const storageRef = ref(
        storage,
        "interview/" + `${content.contentType}` + "/" + fileName
      );
      uploadBytes(storageRef, content.content).then((snapshot) =>
        getDownloadURL(snapshot.ref).then((url) => {
          urlRef.current = url;
          handleSubmit();
        })
      );
    }
  };

  const handleSubmit = async () => {
    await axios
      .post(process.env.REACT_APP_API_URL + "/api/publication", {
        content: urlRef.current,
        id_user: currentUser._id,
        description: descriptionRef.current.value,
        contentType:
          content.contentType === "image_url" ? "image" : content.contentType,
      })
      .then(
        (res) => {
          setSubmitting(false);
          toast({
            title: "Publication réussie",
            status: "success",
            duration: 5000,
            isClosable:true,
            description: "Votre interview a été bien enregistrée !",
          });
          navigate("/");
        },
        () => {
          toast({
            status: "error",
            isClosable:true,
            duration: 5000,
            description: "Veuillez réessayer s'il vous plait",
            title: "Operation failed",
          });
          setSubmitting(false);
        }
      );
  };

  return (
    <Stack position="relative" minHeight="100vh" spacing={0}>
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button
          variant="float"
          className="bi-arrow-left"
          onClick={() => navigate(-1)}
        ></Button>
        <Button>Créer une publication</Button>
      </Flex>
      <Stack paddingX={3} height="100%" minH="calc(100vh - 50px)" paddingY={2}>
        {content.contentType === "image" ? (
          <Image
            src={URL.createObjectURL(content.content)}
            alt="image"
            width="100%"
            objectFit="contain"
          />
        ) : content.contentType === "image_url" ? (
          <Image
            src={content.content}
            alt="image"
            width="100%"
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
        <Textarea ref={descriptionRef}
          placeholder="Description"
          sx={{
            "::-webkit-scrollbar": { display: "none" },
            "::-webkit-resizer": { display: "none" },
          }}
        ></Textarea>
        <HStack
          paddingY={2}
          paddingX={3}
          width="100%"
        >
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
