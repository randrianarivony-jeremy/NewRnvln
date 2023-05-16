import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiCall, currentUserContext, socket } from "../../Controler/App";
import { likeDislike } from "../../Controler/Redux/thread.reducer";

const LikePost = ({post}) => {
  const { currentUser } = useContext(currentUserContext);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  const handleLikeDislike = async () => {
    setLiked(!liked);
      await apiCall
      .patch(
          
          `publication/like/` +
          post._id,
          {
              id_user: currentUser._id,
              like: !liked,
            },{ withCredentials: true }
            )
            .then(
                () => {
                if (!liked){socket.emit('notification',post.id_user._id)}
                dispatch(
                  likeDislike({
                    like: !liked,
                    postId: post._id,
                    id_user: currentUser._id,
                  })
                )},
        (err) => console.log(err)
      );
  };

  useEffect(() => {
    if (post.likers.includes(currentUser._id)) setLiked(true);
    else setLiked(false);
  }, [post]);
  return (
    <Button
      flexDir="column"
      onClick={handleLikeDislike}
      color={
        post.contentType === "string" &&
        post.bg !== "transparent" &&
        "black"
      }
    >
      <Flex
        className={liked ? "bi-heart-fill" : "bi-heart"}
        fontSize="xl"
        color={liked ? "red" : ""}
      ></Flex>
      <Text fontSize="xs">{post.likers.length}</Text>
    </Button>
  );
};

export default LikePost;
