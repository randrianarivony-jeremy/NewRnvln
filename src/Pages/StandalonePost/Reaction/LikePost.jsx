import { Button, Text } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { currentUserContext } from "../../../Controler/App";
import { useLikePostMutation } from "../../../Controler/Redux/Features/postSlice";
import { iconMd } from "../../../Styles/Theme";

const LikePost = ({ post }) => {
  const { currentUser } = useContext(currentUserContext);
  const [liked, setLiked] = useState(false);
  const [likePost] = useLikePostMutation();

  useEffect(() => {
    if (post.likers.includes(currentUser._id)) setLiked(true);
    else setLiked(false);
  }, [post]);
  return (
    <Button
      flexDir="column"
      onClick={() =>
        likePost({
          type: post.type,
          postId: post._id,
          postCreator: post.id_user._id,
          body: { id_user: currentUser._id, like: !liked },
        })
      }
      size="lg"
    >
      <IonIcon
        icon={liked ? heart : heartOutline}
        style={{ fontSize: iconMd, color: liked && "red" }}
      />
      <Text fontSize="xs">{post.likers.length}</Text>
    </Button>
  );
};

export default LikePost;
