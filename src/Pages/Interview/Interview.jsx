import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Scroll } from "../../Styles/Theme";
import Options from "./Options";

export const optionContext = createContext();

const Interview = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(<Options />);
  return (
    <optionContext.Provider value={{ display, setDisplay }}>
      <Stack height="100%">
        <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
          <Button
            variant="float"
            className="bi-arrow-left"
            onClick={() => navigate(-1)}
          ></Button>
          <Button>Interview</Button>
        </Flex>
        <Scroll spacing={2} height="100%" paddingX={3} paddingBottom={2}>
          <Text fontSize="sm" paddingX={3} paddingY={2} border="1px solid" borderRadius={10} >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consequuntur, laboriosam veniam. Rerum quaerat corporis deserunt
            iusto doloribus pariatur aspernatur minima!
          </Text>
          {display}
        </Scroll>
      </Stack>
    </optionContext.Provider>
  );
};

export default Interview;
