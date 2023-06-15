import { Button, Flex } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorRender, Loader } from "../../Component/Miscellanous";
import { useFetchQuestionQuery } from "../../Controler/Redux/Features/postSlice";
import QuestionCard from "./QuestionCard";

const QuestionItem = () => {
  const { questionId } = useParams();
  const { data, isLoading, isSuccess, isError } =
    useFetchQuestionQuery(questionId);
  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorRender />;
  if (isSuccess)
    return (
      <>
        <Flex position={"absolute"} zIndex={2} width="100%">
          <Button boxSize={12} onClick={() => navigate(-1)}>
            <IonIcon icon={arrowBack} />
          </Button>
          <Button size={"lg"} paddingX={0}>
            Question
          </Button>
        </Flex>
        <QuestionCard questions={data} />
      </>
    );
};

export default QuestionItem;
