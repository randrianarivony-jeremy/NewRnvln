import { Avatar, Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import DataDisplay from "./DataDisplay";
import LikePost from "./LikePost";
import CommentPost from "./CommentPost";
import RespondPost from "./RespondPost";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const [expandBtn, setExpandBtn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [longDescription, setLongDescription] = useState(false);
  const navigate = useNavigate();
  const descriptionRef = useRef();
  const descriptionOverflow = useRef();

  useEffect(() => {
    if (descriptionRef.current.clientHeight < descriptionRef.current.scrollHeight) descriptionOverflow.current=true
    setLoading(false);
  },[]);
  return (
    <>
      <Flex height="100%" className="post" alignItems="center" justify="center">
        <DataDisplay data={post} />
      </Flex>

      <Box
        position="absolute"
        bottom={0}
        textAlign="left"
        maxWidth="75%"
        marginLeft={3}
      >
        <Text
          fontWeight="bold"
          onClick={() => navigate("/profile/648461664846")}
        >
          UserName
        </Text>
        <Text
          position="relative"
          ref={descriptionRef}
          fontSize="sm"
          onClick={() => setLongDescription(!longDescription)}
          maxH={!longDescription && 10}
          overflowY="hidden"
        >
          {post.description}
          {!loading && (
            <>
              {descriptionOverflow && (
                <Button
                  variant="link"
                  size="sm"
                  position="absolute"
                  right={0}
                  bottom={0}
                  onClick={() => setLongDescription(!longDescription)}
                >
                  {longDescription ? 'Moins' : 'Plus'}
                </Button>
              )}
            </>
          )}
        </Text>
      </Box>

      <Stack
        position="absolute"
        right={0}
        bottom={0}
        align="center"
        marginRight={1}
      >
        {expandBtn && (
          <>
            <Button boxSize={12} position="relative">
              <Avatar
                size="sm"
                onClick={() => navigate("/profile/649865164651651")}
              />
              <Flex
                position="absolute"
                bottom={0}
                borderRadius="full"
                bgColor="red"
                className="bi-plus"
              ></Flex>
            </Button>
            <LikePost />
            <CommentPost />
            <RespondPost />
            <Button flexDir='column'>
              <FontAwesomeIcon size="lg" icon={faQuestion}></FontAwesomeIcon>
              <Text fontSize='xs'>99</Text>
            </Button>
          </>
        )}
        <Button boxSize={12} onClick={() => setExpandBtn(!expandBtn)}>
          {expandBtn ? (
            <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
          )}
        </Button>
      </Stack>
    </>
  );
};

export default Post;
