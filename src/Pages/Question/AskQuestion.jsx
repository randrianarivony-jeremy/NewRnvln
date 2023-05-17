import {
  Button,
  ButtonGroup,
  Flex,
  Input,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall, currentUserContext } from "../../Controler/App";

const AskQuestion = () => {
  const { currentUser } = useContext(currentUserContext);
  const navigate = useNavigate();
  const responseRef = useRef();
  const inputRef = useRef();
  const toast = useToast();
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [textareaBg, setTextareaBg] = useState("transparent");

  const handleTextChange = ({ currentTarget }) => {
    setValue(currentTarget.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await apiCall
      .post( "question", {
        data: responseRef.current.value,
        interviewer: currentUser._id,
        bg:textareaBg==='transparent' ? 'gradient1' : textareaBg,
      })
      .then(
        (res) => {
          setSubmitting(false);
          toast({
            title: "Publication réussie",
            status: "success",
            duration: 5000,
            description: "Votre question a été bien enregistrée !",
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

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.style.height = "38px";
      const scrollHeight = responseRef.current.scrollHeight;
      if (scrollHeight < 300)
        responseRef.current.style.height = scrollHeight + "px";
      else responseRef.current.style.height = 300 + "px";
    }
  }, [responseRef, value]);

  return (
    <Stack
      height="100%"
      minH="450px"
      paddingBottom={2}
      paddingX={3}
      justify="space-between"
    >
      <Flex
        borderBottom="1px solid"
        borderBottomColor="whiteAlpha.500"
        justify="space-between"
      >
        <Button
          variant="float"
          className="bi-arrow-left"
          onClick={() => navigate(-1)}
        ></Button>
        <Button
          isLoading={submitting}
          loadingText="Envoi"
          onClick={() => inputRef.current.click()}
        >
          Poser
        </Button>
      </Flex>
      <form onSubmit={handleSubmit}>
        <Textarea
          bg={textareaBg}
          rows={1} maxLength={320}
          textAlign="center"
          borderColor="transparent"
          ref={responseRef}
          _placeholder={{ fontSize: "2xl" }}
          placeholder="Appuyez pour écrire"
          value={value}
          sx={{
            "::-webkit-scrollbar": { display: "none" },
            "::-webkit-resizer": { display: "none" },
          }}
          onChange={handleTextChange}
          border="none"
        ></Textarea>
        <Input ref={inputRef} type="submit" display="none" />
      </form>
      <ButtonGroup variant="float" align="center" justifyContent="space-around">
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
    </Stack>
  );
};

export default AskQuestion;