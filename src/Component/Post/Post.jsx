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
    if (descriptionRef.current.scrollHeight > 45)
      descriptionOverflow.current = true;
    setLoading(false);
  }, []);
  return (
    <>
      <Flex height="100%" className="post" alignItems="center" justify="center">
        <DataDisplay data={post} />
      </Flex>

      <Box
        position="absolute"
        bottom={3}
        color={
          post.contentType === "string" && post.bg !== "transparent" && "black"
        }
        textAlign="left"
        maxWidth="75%"
        marginLeft={3}
        zIndex={2}
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
          {post?.description}
          {!loading && (
            <>
              {descriptionOverflow.current && (
                <Button
                  variant="link"
                  size="sm"
                  color={
                    post.contentType === "string" &&
                    post.bg !== "transparent" &&
                    "black"
                  }
                  position="absolute"
                  right={0}
                  bottom={0}
                  onClick={() => setLongDescription(!longDescription)}
                >
                  {longDescription ? "Moins" : "Plus"}
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
        zIndex={2}
      >
        {expandBtn && (
          <>
            <RespondPost post={post} />
            <Button boxSize={10} position="relative" flexDir="column">
              <Avatar
                size="sm"
                onClick={() => navigate("/profile/649865164651651")}
              />
            </Button>
            <LikePost post={post} />
            <CommentPost post={post} />
            <Button
              flexDir="column"
              color={
                post.contentType === "string" &&
                post.bg !== "transparent" &&
                "black"
              }
            >
              <Flex fontSize="xl" className="bi-question-lg"></Flex>
              <Text fontSize="xs">99</Text>
            </Button>
          </>
        )}
        <Button
          boxSize={12}
          className={expandBtn ? "bi-caret-down" : "bi-caret-up"}
          onClick={() => setExpandBtn(!expandBtn)}
          color={
            post.contentType === "string" &&
            post.bg !== "transparent" &&
            "black"
          }
        ></Button>
      </Stack>
    </>
  );
};

export default Post;
