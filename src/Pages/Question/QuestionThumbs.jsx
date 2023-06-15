import { Badge, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import textFit from "textfit";

const QuestionThumbs = ({ question }) => {
  const navigate = useNavigate();
  const questionDataRef = useRef();
  const bg = useColorModeValue("whiteAlpha.500", "blackAlpha.200");

  useEffect(() => {
    textFit(questionDataRef.current, {
      maxFontSize: 12,
      reProcess: false,
    });
  }, []);
  return (
    <Flex
      position="relative"
      boxSize={100}
      border="1px solid"
      borderColor={"blackAlpha.200"}
      onClick={() => navigate(`/question/` + question._id)}
    >
      <Flex height="100%" width="100%" bg={question.bg}>
        <Text
          ref={questionDataRef}
          whiteSpace="pre-wrap"
          fontSize="xs"
          overflowY="hidden"
          maxH="80%"
          maxW="90%"
          textAlign="center"
          margin="auto"
        >
          {question.data[0]}
        </Text>
      </Flex>
      <Badge position={"absolute"} right={1} top={1} bgColor={bg}>
        {question.data.length}
      </Badge>
    </Flex>
  );
};

export default QuestionThumbs;
