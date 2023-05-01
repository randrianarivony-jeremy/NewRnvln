import {
  Avatar,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const QuestionBubble = ({ question }) => {
  return (
    <Menu>
      <MenuButton position="relative">
        {question.interviewer.picture ? (
          <Image src={question.interviewer.picture} boxSize={12} rounded="full" objectFit="cover" alt="profile pic" />
        ) : (
          <Avatar size="md" />
        )}
        <Flex className="bi-question-circle-fill" position="absolute" fontSize="lg" bottom={0} right={0}>
        </Flex>
      </MenuButton>
      <MenuList>
        <Stack maxWidth="80vw" marginX={3}>
          <Text fontWeight='bold'>
            {question.interviewer.name} <span style={{fontStyle:'italic',fontWeight:'normal'}}>a demandé</span>
          </Text>
          <Text>{question.data}</Text>
        </Stack>
      </MenuList>
    </Menu>
  );
};

export default QuestionBubble;
