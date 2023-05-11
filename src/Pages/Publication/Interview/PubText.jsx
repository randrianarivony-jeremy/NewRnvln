import {
  Button,
  ButtonGroup,
  HStack,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResizableTextarea from "../../../Component/ResizableTextarea";
import { currentUserContext } from "../../../Controler/App";
import { optionContext } from "./Interview";
import Options from "./Options";

const PubText = () => {
  const [textareaBg, setTextareaBg] = useState("transparent");
  const [value, setValue] = useState("");
  const { setDisplay, question } = useContext(optionContext);
  const { currentUser } = useContext(currentUserContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const publicConfidentiality=useRef(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    await axios
      .post(process.env.REACT_APP_API_URL + "/api/publication", {
        content: value,
        id_user: currentUser._id,
        question: question._id,
        bg: textareaBg,
        type: "interview",public:publicConfidentiality.current,
        contentType: "string",
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
