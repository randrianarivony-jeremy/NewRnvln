import {
  Button,
  HStack,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundOptions from "../../../Component/BackgroundOptions";
import ResizableTextarea from "../../../Component/ResizableTextarea";
import { apiCall, currentUserContext } from "../../../Controler/App";
import { interviewContext } from "./Interview";
import Options from "./Options";

const PubText = () => {
  const { setDisplay, question } = useContext(interviewContext);
  const { currentUser } = useContext(currentUserContext);
  const [textareaBg, setTextareaBg] = useState("transparent");
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const publicConfidentiality=useRef(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async () => {
    setSubmitting(true);
    await apiCall
      .post( "publication", {
        content: value,
        id_user: currentUser._id,
        question: question._id,
        bg: textareaBg,
        type: "interview",public:publicConfidentiality.current,
        contentType: value.length>320 ? 'text' : 'short',
      })
      .then(
        (res) => {
          setSubmitting(false);
          toast({
            title: "Publication réussie",
            status: "success",
            duration: 5000,
            description: "Votre interview a été bien enregistrée !",
          });
          navigate("/");
        },
        () => {
          toast({
            status: "error",
            duration: 5000,
            description: "Veuillez réessayer s'il vous plait",
            title: "Operation failed",
          });
          setSubmitting(false);
        }
      );
  };

  return (
    <Stack height="100%" justify="space-between" paddingX={3}>
        <ResizableTextarea
          value={value}
          setValue={setValue}
          textareaBg={textareaBg}
          placeholder="Votre réponse"
        />
        {value<320 && <BackgroundOptions textareaBg={textareaBg} setTextareaBg={setTextareaBg}/>}
    </Stack>
  );
};

export default PubText;
