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
import ScrollableFeed from "react-scrollable-feed";
import React, { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Comment from "./Comment";
import UserLoader from "../../../Component/Loaders/UserLoader";
import { IonIcon } from "@ionic/react";
import { chatbubbleOutline } from "ionicons/icons";
import { apiCall, currentUserContext, socket } from "../../../Controler/App";
import { updateComment } from "../../../Controler/Redux/thread.reducer";
import { iconMd } from "../../../Styles/Theme";

const CommentPost = ({ post }) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { currentUser } = useContext(currentUserContext);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const openComments = () => {
    fetchComments();
    onOpen();
  };

  const submitComment = async () => {
    setSubmitting(true);
    await apiCall
      .patch(
         `${post.type}/comment/` + post._id,
        {
          commenterId: currentUser._id,
          text: inputRef.current.value,
        }
      )
      .then(
        (res) => {
          socket.emit('notification',post.id_user._id)
          dispatch(updateComment({ postId: post._id, data: res.data }));
          setSubmitting(false);
          inputRef.current.value = "";
        },
        (err) => {
          console.log(err);
          setSubmitting(false);
        }
      );
  };

  const fetchComments = async () => {
    await apiCall
      .get(
         post.type+"/comments/" + post._id
      )
      .then(
        (res) => {
          dispatch(updateComment({ postId: post._id, data: res.data }));
          setLoading(false);
        },
        () => {
          onClose();
        }
      );
  };

  return (
    <>
      <Button
        flexDir="column"
        onClick={openComments}
        fontSize="xl"
        size={'lg'}
      >
      <IonIcon icon={chatbubbleOutline} style={{fontSize:iconMd}}/>
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
                {loading ? (
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
              isLoading={submitting}
              variant="float"
              className="bi-send"
              onClick={submitComment}
            ></Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CommentPost;
