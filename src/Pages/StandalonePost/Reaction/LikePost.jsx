import { Button, Text } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiCall, currentUserContext, socket } from "../../../Controler/App";
import { likeDislike } from "../../../Controler/Redux/thread.reducer";
import { iconMd } from "../../../Styles/Theme";

const LikePost = ({post}) => {
  const { currentUser } = useContext(currentUserContext);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  const handleLikeDislike = async () => {
    setLiked(!liked);
      await apiCall
      .patch(
          
          `${post.type}/like/` +
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
      size='lg'
    >
      <IonIcon icon={liked ? heart : heartOutline} style={{fontSize:iconMd,color:liked && 'red'}}/>
      <Text fontSize="xs">{post.likers.length}</Text>
    </Button>
  );
};

export default LikePost;
