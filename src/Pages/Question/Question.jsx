import { Button, ButtonGroup, Flex, Stack, useToast } from "@chakra-ui/react";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { currentUserContext } from "../../Controler/App";
import { useAddQuestionMutation } from "../../Controler/Redux/Features/questionSlice";
import SwiperQuestion from "./SwiperQuestion";

export const questionContext = createContext();

const Question = () => {
  const { currentUser } = useContext(currentUserContext);
  const [addQuestion, { isSuccess, isError, isLoading, error }] =
    useAddQuestionMutation();
  const navigate = useNavigate();
  const textareaRef = useRef();
  const slideEvent = useRef();
  const swiperRef = useRef();
  const toast = useToast();
  const [colorIndex, setColorIndex] = useState(0);
  const [writing, setWriting] = useState([false]);
  const colors = useRef([
    "gradient1",
    "gradient2",
    "gradient3",
    "gradient4",
    "gradient5",
    "gradient6",
    "gradient7",
    "gradient8",
    "gradient9",
    "gradient10",
  ]);
  const [questionsArray, setQuestionsArray] = useState([
    "Ecrire quelque chose",
  ]);

  const handleChange = () => {
    slideEvent.current = "update";
    setQuestionsArray((current) => {
      let mirror = [...current];
      mirror[swiperRef.current.swiper.activeIndex] =
        textareaRef.current.value === ""
          ? "Ecrire quelque chose"
          : textareaRef.current.value;
      return mirror;
    });
    setWriting((current) => {
      let mirror = [...current];
      mirror[swiperRef.current.swiper.activeIndex] = false;
      return mirror;
    });
  };

  const checkEmptyValue = () => {
    let empty = questionsArray.indexOf("Ecrire quelque chose");
    if (empty === -1)
      addQuestion({
        data: questionsArray,
        interviewer: currentUser._id,
        bg: colorIndex === 0 ? "gradient1" : colors.current[colorIndex],
      });
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

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Publication réussie",
        status: "success",
        duration: 5000,
        description: "Votre question a été bien enregistrée !",
      });
      navigate("/");
    }
    if (isError) {
      if (error.status === 403) {
        toast({
          title: "Expiration",
          description:
            "Vous avez atteint un mois de connexion. Veillez vous reconnecter",
          status: "info",
          position: "bottom",
          duration: 5000,
          isClosable: true,
        });
        navigate("/login");
      } else
        toast({
          status: "error",
          duration: 5000,
          description: "Veuillez réessayer s'il vous plait",
          title: "Operation failed",
        });
    }
  }, [isError, isSuccess]);

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
          <Button>Poser une question</Button>
        </ButtonGroup>
        {writing[swiperRef.current?.swiper.activeIndex] && (
          <Button onClick={handleChange}>Terminer</Button>
        )}
      </Flex>

      <questionContext.Provider
        value={{
          questionsArray,
          setQuestionsArray,
          handleChange,
          colorIndex,
          setColorIndex,
          colors,
          textareaRef,
          swiperRef,
          writing,
          setWriting,
          slideEvent,
        }}
      >
        <SwiperQuestion />
      </questionContext.Provider>

      <ButtonGroup paddingX={3}>
        <Button width={"50%"} onClick={() => navigate(-1)}>
          Retour
        </Button>
        <Button
          isLoading={isLoading}
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
