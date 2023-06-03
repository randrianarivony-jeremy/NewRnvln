import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { chatbubbleOutline } from "ionicons/icons";
import React, { useContext, useEffect, useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";
import UserLoader from "../../../Component/Loaders/UserLoader";
import { currentUserContext } from "../../../Controler/App";
import {
  useCommentPostMutation,
  useFetchCommentsMutation,
} from "../../../Controler/Redux/Features/postSlice";
import { iconMd } from "../../../Styles/Theme";
import { postContext } from "../PostContainer";
import Comment from "./Comment";

const CommentPost = () => {
  const { post } = useContext(postContext);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const inputRef = useRef();
  const { currentUser } = useContext(currentUserContext);
  const [fetchComments, { isLoading, isSuccess, isError }] =
    useFetchCommentsMutation();
  const [commentPost] = useCommentPostMutation();

  const openComments = () => {
    fetchComments({ postId: post._id, type: post.type });
    onOpen();
  };

  useEffect(() => {
    if (isError) onClose();
  }, [isLoading, isError]);

  return (
    <>
      <Button flexDir="column" onClick={openComments} fontSize="xl" size={"lg"}>
        <IonIcon icon={chatbubbleOutline} style={{ fontSize: iconMd }} />
        <Text fontSize="xs">{post.comments.length}</Text>
      </Button>
      <Drawer
        onOpen={onOpen}
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent maxH="75%">
          <DrawerCloseButton top={1} />
          <DrawerHeader
            paddingY={2}
            textAlign="center"
            fontWeight="bold"
            fontSize="sm"
          >
            Commentaires
          </DrawerHeader>
          <ScrollableFeed forceScroll={true} className="scrollablefeed">
            {post.comments.map((comment, key) => (
              <Box key={key}>
                {isLoading ? (
                  <Stack marginLeft={3} marginBottom={2}>
                    <UserLoader length={post.comments.length} />
                  </Stack>
                ) : (
                  <Comment comment={comment} postId={post._id} />
                )}
              </Box>
            ))}
          </ScrollableFeed>
          <DrawerFooter paddingX={3} paddingTop={0} paddingBottom={2}>
            <Input ref={inputRef} placeholder="Ajouter un commentaire" />
            <Button
              variant="float"
              className="bi-send"
              onClick={() => {
                commentPost({
                  postId: post._id,
                  type: post.type,
                  text: inputRef.current.value,
                  commenterId: {
                    _id: currentUser._id,
                    name: currentUser.name,
                    picture: currentUser.picture,
                  },
                });
                inputRef.current.value = "";
              }}
            ></Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CommentPost;
