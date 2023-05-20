import {
  Avatar,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { currentUserContext } from "../../Controler/App";
import QuestionSlider from "./QuestionSlider";
import InterviewText from "./InterviewText";
import { dataContext, postContext } from "./PostContainer";
import ShortPost from "./ShortPost";
import TextItem from "./TextItem";

const TextPost = () => {
  const navigate = useNavigate();
  const { post, containerRef } = useContext(postContext);
  const { data } = useContext(dataContext);
  const { currentUser } = useContext(currentUserContext);
  return (
    <Flex bg={data.contentType === "short" && data.bg} height="100%">
      <Stack ref={containerRef} height="calc(100% - 40px)" marginTop={10}>
        {/* I N F O  */}
        <Flex
          marginX={3}
          cursor="pointer"
          maxWidth="80%"
          onClick={() =>
            post.id_user._id === currentUser._id
              ? navigate("/profile")
              : navigate("/profile/" + post.id_user._id)
          }
        >
          {post.id_user.picture ? (
            <Image
              src={post.id_user.picture}
              alt="profilepic"
              boxSize={12}
              rounded="full"
              objectFit="cover"
            />
          ) : (
            <Avatar size="md" />
          )}
          <Stack spacing={0} marginLeft={2} justify="flex-start">
            <Heading size="sm" width="fit-content">
              {post.id_user.name}
            </Heading>
            {post.id_user.job && (
              <Text fontStyle="italic">{post.id_user.job}</Text>
            )}
          </Stack>
        </Flex>
        {data.contentType === "short" ? (
          <ShortPost />
        ) : post.type === "article" ? (
          <TextItem />
        ) : (
          <Stack>
            <QuestionSlider question={post.question} index={0}/>
            <InterviewText />
          </Stack>
        )}
      </Stack>
    </Flex>
  );
};

export default TextPost;
