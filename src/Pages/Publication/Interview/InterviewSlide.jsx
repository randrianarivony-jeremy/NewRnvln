import { Stack } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import QuestionSlider from "../../StandalonePost/QuestionSlider";
import { interviewContext } from "./Interview";
import Options from "./Options";

export const displayContext = createContext();

const InterviewSlide = ({ index }) => {
  const { questions, showOptions, responseData } = useContext(interviewContext);
  const [display, setDisplay] = useState(<Options />);

  useEffect(() => {
    if (showOptions[index] === true) {
      setDisplay(<Options />);
      responseData.current[index] = "empty";
    }
  }, [showOptions]);

  return (
    <Stack spacing={5} marginTop={2}>
      <QuestionSlider question={questions} index={index} />
      <displayContext.Provider value={{ display, setDisplay }}>
        {display}
      </displayContext.Provider>
    </Stack>
  );
};

export default InterviewSlide;
