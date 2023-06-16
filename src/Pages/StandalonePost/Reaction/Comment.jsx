import {
  Avatar,
  Button,
  Flex,
  Heading,
  Image,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useLongPress } from "use-long-press";
import { currentUserContext } from "../../../Controler/App";
import { useDeleteCommentMutation } from "../../../Controler/Redux/Features/postSlice";
import { ClickableFlex } from "../../../Styles/Theme";
import { postContext } from "../PostContainer";

const Comment = ({ comment, postId }) => {
  const [deleteFooter, setDeleteFooter] = useState(false);
  const { currentUser } = useContext(currentUserContext);
  const [imageLoading, setImageLoading] = useState(true);
  const { post } = useContext(postContext);
  const [deleteComment] = useDeleteCommentMutation();

  const bind = useLongPress(() => setDeleteFooter(true), {
    threshold: 1000,
    captureEvent: true,
    cancelOnMovement: true,
  });
  return (
    <ClickableFlex
      align="flex-start"
      {...(comment.commenterId._id === currentUser._id ? bind() : null)}
    >
      {comment.commenterId.picture ? (
        <Flex boxSize={12} position="relative">
          <Image
            src={comment.commenterId.picture}
            alt="profilepic"
            boxSize={12}
            minW={12}
            rounded="full"
            objectFit="cover"
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
          {imageLoading && <SkeletonCircle size={12} position="absolute" />}
        </Flex>
      ) : (
        <Avatar size="md" />
      )}
      <Stack spacing={1} marginLeft={2}>
        <Heading size="sm">{comment.commenterId.name}</Heading>
        <Text width="calc(100vw - 84px)">{comment.text}</Text>
        {deleteFooter && (
          <Flex justify="flex-end">
            <Button onClick={() => setDeleteFooter(false)}>Annuler</Button>
            <Button
              variant="outline"
              onClick={() =>
                deleteComment({
                  type: post.type,
                  postId,
                  commentId: comment._id,
                  question: post.question?._id,
                })
              }
              // onClick={deleteComment}
              rightIcon={<Flex className="bi-trash"></Flex>}
            >
              Supprimer
            </Button>
          </Flex>
        )}
      </Stack>
    </ClickableFlex>
  );
};

export default Comment;
