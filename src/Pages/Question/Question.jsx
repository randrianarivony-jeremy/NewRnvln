import { Button, ButtonGroup, Flex, Stack, useToast } from "@chakra-ui/react";
import React, { createContext, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall, currentUserContext } from "../../Controler/App";
import SwiperQuestion from "./SwiperQuestion";

export const questionContext = createContext();
const Question = () => {
  const { currentUser } = useContext(currentUserContext);
  const navigate = useNavigate();
  const textareaRef = useRef();
  const swiperRef = useRef();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [writing, setWriting] = useState(false);
  const colors = useRef([
    "transparent",
    "gradient1",
    "gradient2",
    "gradient3",
    "gradient4",
    "gradient5",
  ]);
  const [questionsArray, setQuestionsArray] = useState([
    "Ecrire quelque chose",
  ]);

  const handleChange = (index) => {
    setQuestionsArray((current) => {
      current[index] =
        textareaRef.current.value === ""
          ? "Ecrire quelque chose"
          : textareaRef.current.value;
      return current;
    });
    setWriting(false);
  };

  const checkEmptyValue = () => {
    let empty = questionsArray.indexOf("Ecrire quelque chose");
    if (empty === -1) handleSubmit();
    else {
      swiperRef.current.swiper.slideTo(empty);
      toast({
        status: "error",
        title: "Champs vide",
        duration: 5000,
        isClosable: true,
        description:
          "Vous n'avez rien écrit. Ajoutez quelque chose ou supprimez",
      });
    }
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    await apiCall
      .post("question", {
        data: questionsArray,
        interviewer: currentUser._id,
        bg: colorIndex === 0 ? "gradient1" : colors.current[colorIndex],
      })
      .then(
        (res) => {
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
        }
      )
      .finally(() => setSubmitting(false));
  };

  return (
    <Stack
      spacing={0}
      height="100%"
      minH="450px"
      paddingBottom={2}
      justify="space-between"
      bg={colors.current[colorIndex]}
      >
      <Flex justify={"space-between"}>
        <ButtonGroup spacing={0}>
          <Button
            variant="float"
            className="bi-arrow-left"
            onClick={() => navigate(-1)}
          ></Button>
          <Button paddingX={0}>Poser une question</Button>
        </ButtonGroup>
        {writing && (
          <Button
          onClick={() => handleChange(swiperRef.current.swiper.activeIndex)}
          >
            Terminer
          </Button>
        )}
      </Flex>

      <questionContext.Provider
        value={{
          questionsArray,
          setQuestionsArray,
          colorIndex,
          setColorIndex,
          colors,
          textareaRef,
          swiperRef,
          writing,
          setWriting,
        }}
      >
        <SwiperQuestion />
      </questionContext.Provider>

      <ButtonGroup
        paddingX={3}
      >
        <Button width={"50%"} onClick={() => navigate(-1)}>
          Retour
        </Button>
        <Button
          isLoading={submitting}
          loadingText="Envoi"
          variant="primary"
          width={"50%"}
          onClick={checkEmptyValue}
        >
          Poser
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default Question;
