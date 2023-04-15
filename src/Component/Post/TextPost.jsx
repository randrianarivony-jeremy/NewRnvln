import { Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Scroll } from "../../Styles/Theme";
import Question from "../Question";
import { postContext } from "./PostContainer";

const TextPost = () => {
  const { post } = useContext(postContext);
  return (
    <Scroll height="100%" marginX={3}>
      {post.type === 'interview' && <Question question={post.question} />}
      <Text textAlign='left'>{post.content}</Text>
    </Scroll>
  );
};

export default TextPost;
