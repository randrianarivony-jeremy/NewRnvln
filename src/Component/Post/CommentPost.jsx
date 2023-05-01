import {Button,Drawer,DrawerCloseButton,DrawerContent,DrawerFooter,DrawerHeader,DrawerOverlay,Input,Text,useDisclosure,} from "@chakra-ui/react";
import axios from "axios";
import ScrollableFeed from 'react-scrollable-feed'
import React, { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { currentUserContext } from "../../Controler/App";
import { updateComment } from "../../Controler/Redux/thread.reducer";
import Comment from "./Comment";

const CommentPost = ({post,type}) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { currentUser } = useContext(currentUserContext);
  const [submitting, setSubmitting] = useState(false);


  const submitComment = async () => {
    setSubmitting(true);
    await axios
      .patch(
        process.env.REACT_APP_API_URL +
          `/api/${type}/comment/` +
          post._id,
        {
          commenterId: currentUser._id,
          text: inputRef.current.value,
        }
      )
      .then(
        (res) => {
          dispatch(updateComment({postId:post._id,data:res.data.comments}))
          setSubmitting(false);
          inputRef.current.value=''
        },
        (err) => {
          console.log(err);
          setSubmitting(false);
        }
      );
  };

  return (
    <>
      <Button
        flexDir="column"
        onClick={onOpen}
        className="bi-chat"
        fontSize="xl"
        color={
          post.contentType === "string" &&
          post.bg !== "transparent" &&
          "black"
        }
      >
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
          <ScrollableFeed forceScroll={true} className='scrollablefeed'>
              {post.comments.map((comment, key) => (
                <Comment comment={comment} key={key} type={post.type} postId={post._id}/>
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
