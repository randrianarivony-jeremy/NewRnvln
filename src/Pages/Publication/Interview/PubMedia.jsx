import { Button, HStack, Image, Select, Stack, Text, Textarea, useToast } from "@chakra-ui/react";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AudioDisplay from "../../../Component/AudioDisplay";
import { apiCall, currentUserContext } from "../../../Controler/App";
import { storage } from "../../../Controler/firebase.config";
import { interviewContext } from "./Interview";
import Options from "./Options";

const PubMedia = ({ data }) => {
  const navigate = useNavigate();
  const { setDisplay, question } = useContext(interviewContext);
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useContext(currentUserContext);
  const descriptionRef = useRef();
  const urlRef = useRef();
  const publicConfidentiality = useRef(false);
  const toast=useToast();

  const storeMedia = () => {
    setSubmitting(true);
    const fileName = new Date().getTime() + `${currentUser._id}`;
    if (data.contentType === "image_url"){
    const storageRef = ref(
      storage,
      "interview/image/" + fileName
    );
    uploadString(storageRef, data.content, "data_url").then((snapshot) =>
    getDownloadURL(snapshot.ref).then((url) => {
      urlRef.current = url;
      handleSubmit();
    })
    );}
    else{
    const storageRef = ref(
      storage,
      "interview/" + `${data.contentType}` + "/" + fileName
    );
      uploadBytes(storageRef, data.content).then((snapshot) =>
        getDownloadURL(snapshot.ref).then((url) => {
          urlRef.current = url;
          handleSubmit();
        })
      );}
  };

  const handleSubmit = async () => {
    await apiCall
      .post( "publication", {
        content: urlRef.current,
        id_user: currentUser._id,
        description: descriptionRef.current.value,type:'interview',
        question: question._id,public:publicConfidentiality.current,
        contentType: data.contentType==='image_url' ? 'image' : data.contentType,
      })
      .then(() => {
        setSubmitting(false);
        toast({
          title: "Publication réussie",
          status: "success",
          duration: 5000,
          description: "Votre interview a été bien enregistrée !",
        });
        navigate("/");
      },() => {
        toast({
          status: "error",
          duration: 5000,
          description: "Veuillez réessayer s'il vous plait",
          title: "Operation failed",
        });
        setSubmitting(false);
      });
  };

  return (
    <Stack height="100%">
      <Stack paddingX={3}>
        {data.contentType === "image" ? (
          <Image
            src={URL.createObjectURL(data.content)}
            alt="image"
            height="50vh"
            border='1px solid' rounded='md' borderColor='blackAlpha.200'
            objectFit="contain"
          />
        ) :
        data.contentType === "image_url" ? (
          <Image
            src={data.content}
            alt="image"
            height="50vh" rounded='md' borderColor='blackAlpha.200'
            objectFit="contain"
            border='1px solid red'
          />
        ) : data.contentType === "audio" ? (
          <AudioDisplay audio={URL.createObjectURL(data.content)} />
        ) : (
          <video
            src={URL.createObjectURL(data.content)}
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
      </Stack>
    </Stack>
  );
};

export default PubMedia;
