import { Button, Stack, Text } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import {
  caretUpOutline,
  chatbubblesOutline,
  chevronDown,
} from "ionicons/icons";
import React, { useContext } from "react";
import { postContext } from "../PostContainer";
import CommentPost from "./CommentPost";
import LikePost from "./LikePost";
import { iconMd } from "../../../Styles/Theme";

const Reaction = () => {
  const { post, showReaction, setShowReaction } = useContext(postContext);
  return (
    <Stack position="absolute" right={0} bottom={0} align="center" zIndex={2}>
      {showReaction && (
        <>
          <LikePost post={post} />
          <CommentPost post={post} />
          {post.type === "interview" && (
            <Button flexDir="column" size={"lg"}>
              <IonIcon icon={chatbubblesOutline} style={{ fontSize: iconMd }} />
              <Text fontSize="xs">{post.question.interviews.length}</Text>
            </Button>
          )}
        </>
      )}
      <Button
        onClick={() => setShowReaction(!showReaction)}
        color={
          post.contentType === "string" && post.bg !== "transparent" && "black"
        }
        size='lg'
      >
        <IonIcon
          icon={showReaction ? chevronDown : caretUpOutline}
          style={{ fontSize: iconMd }}
        />
      </Button>
    </Stack>
  );
};

export default Reaction;
