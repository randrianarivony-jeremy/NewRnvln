import {
  Avatar,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { caretUpOutline, chevronDown } from "ionicons/icons";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUserContext } from "../../Controler/App";
import { iconMd } from "../../Styles/Theme";
import CommentPost from "../Post/CommentPost";
import LikePost from "../Post/LikePost";
import { postContext } from "../Post/PostContainer";
import TextItem from "./TextItem";

const TextPost = () => {
  const navigate = useNavigate();
  const { post, containerRef } = useContext(postContext);
  const { currentUser } = useContext(currentUserContext);
  const [expandBtn, setExpandBtn] = useState(true);
  return (
    <Flex bg={post.contentType === "short" && post.bg} height='100%'>
      <Stack
        ref={containerRef}
        height="calc(100% - 40px)"
        marginTop={10}
        marginX={3}
      >
        {/* I N F O  */}
        <Flex
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
          <Stack spacing={0} marginLeft={2} justify="center">
            <Heading size="sm">{post.id_user.name}</Heading>
            {post.id_user.job && (
              <Text fontStyle="italic">{post.id_user.job}</Text>
            )}
          </Stack>
        </Flex>
        <TextItem />

        {/* R E A C T I O N              */}
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
              <LikePost post={post} />
              <CommentPost post={post} />
            </>
          )}
          <Button
            onClick={() => setExpandBtn(!expandBtn)}
            color={
              post.contentType === "string" &&
              post.bg !== "transparent" &&
              "black"
            }
          >
            <IonIcon
              icon={expandBtn ? chevronDown : caretUpOutline}
              style={{ fontSize: iconMd }}
            />
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default TextPost;
