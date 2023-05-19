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
import { optionContext } from "./Interview";
import Options from "./Options";

const PubText = () => {
  const { setDisplay, question } = useContext(optionContext);
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
    <Stack height="100%" justify="space-between">
      <Stack>
        <ResizableTextarea
          value={value}
          setValue={setValue}
          textareaBg={textareaBg}
          placeholder="Votre réponse"
        />
        {value<320 && <BackgroundOptions textareaBg={textareaBg} setTextareaBg={setTextareaBg}/>}
        <HStack>
          <Text whiteSpace="nowrap">Confidentialité :</Text>
          <Select onChange={(e)=>publicConfidentiality.current = e.target.value}>
            <option value={false}>Entre amis</option>
            <option value={true}>Public</option>
          </Select>
        </HStack>
      </Stack>
      <HStack>
        <Button width="100%" onClick={() => setDisplay(<Options />)}>
          Changer
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
  );
};

export default PubText;
