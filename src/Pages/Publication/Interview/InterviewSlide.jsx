import { Box, Button, HStack, Stack, useColorMode } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { gridOutline } from "ionicons/icons";
import React, { createContext, useContext, useEffect, useState } from "react";
import { iconMd } from "../../../Styles/Theme";
import QuestionSlider from "../../StandalonePost/QuestionSlider";
import { interviewContext } from "./Interview";
import Options from "./Options";

export const displayContext = createContext();

const InterviewSlide = ({ index }) => {
  const { questions, showOptions,setShowOptions,swiperRef, responseData } = useContext(interviewContext);
  const [display, setDisplay] = useState(<Options />);
  const {colorMode}=useColorMode();

  useEffect(() => {
    if (showOptions[index] === true) {
      setDisplay(<Options />);
      responseData.current[index] = "empty";
    }
  }, [showOptions]);

  return (
    <Stack spacing={10} marginTop={2} width="100%">
      <HStack>
        <Box width={showOptions[index] ? "100%" : "calc(100% - 68px)"}>
          <QuestionSlider question={questions} index={index} />
        </Box>
        {!showOptions[index] && (
          <Button
            paddingX={0}
            boxSize={12}
            rounded="full"
            bgColor={colorMode === "dark" ? "blackAlpha.400" : "whiteAlpha.500"}
            onClick={() => {
              setShowOptions((current) => {
                let mirror = [...current];
                mirror[swiperRef.current.swiper.activeIndex] = true;
                return mirror;
              });
            }}
          >
            <IonIcon icon={gridOutline} style={{ fontSize: iconMd }} />
          </Button>
        )}
      </HStack>
      <displayContext.Provider value={{ display, setDisplay }}>
        {display}
      </displayContext.Provider>
    </Stack>
  );
};

export default InterviewSlide;
