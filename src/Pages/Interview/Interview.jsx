import { Button, Flex, Stack } from "@chakra-ui/react";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Question from "../../Component/Question";
import { data } from "../../Controler/App";
import { Scroll } from "../../Styles/Theme";
import Options from "./Options";

export const optionContext = createContext();

const Interview = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(<Options />);
  
  return (
    <optionContext.Provider value={{ display, setDisplay,question:data[0].question }}>
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
          <Question question={data[0].question}/>
          {display}
        </Scroll>
      </Stack>
    </optionContext.Provider>
  );
};

export default Interview;
