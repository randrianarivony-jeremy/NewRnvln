import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";

const QuestionDisplay = ({ post }) => {
  return (
      <Stack height="100%" width="100%" bg={post.bg} paddingY={2} paddingX={3}>
        <Text
          whiteSpace="pre-wrap"
          maxH="80%"
          maxW="90%"
          textAlign="center"
          margin="auto"
        >
          {post.content}
        </Text>
        <Button variant='cta'>Répondre</Button>
      </Stack>
  );
};

export default QuestionDisplay;
