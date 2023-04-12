import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Question from "../../Component/Question";
import { Scroll } from "../../Styles/Theme";
import Options from "./Options";

export const optionContext = createContext();

const Interview = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(<Options />);
  const question='Lorem ipsum dolor sit, amet consectetur adipisicing elit.Consequuntur, laboriosam veniam. Rerum quaerat corporis deseruntiusto doloribus pariatur aspernatur minima!';
  return (
    <optionContext.Provider value={{ display, setDisplay,question }}>
      <Stack height="100%" spacing={0}>
        <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
          <Button
            variant="float"
            className="bi-arrow-left"
            onClick={() => navigate(-1)}
          ></Button>
          <Button>Interview</Button>
        </Flex>
        <Scroll height='100%' spacing={2} paddingX={3} paddingY={2}>
          <Question question={question}/>
          {display}
        </Scroll>
      </Stack>
    </optionContext.Provider>
  );
};

export default Interview;
