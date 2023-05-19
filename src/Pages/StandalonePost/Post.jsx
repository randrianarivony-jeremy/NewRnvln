import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postContext } from "./PostContainer";
import QuestionSlider from "./QuestionSlider";
import Article from "./Article";
import {
  chatbubblesOutline,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { currentUserContext } from "../../Controler/App";
import Reaction from "./Reaction/Reaction";
import Description from "./Description";

const Post = () => {
  const navigate = useNavigate();
  const { post,textOverflow,showReaction } = useContext(postContext);
  const { currentUser } = useContext(currentUserContext);

  return (
    <>
      <Flex height="100%" className="post" alignItems="center" justify="center">
        <Article/>
      </Flex>
      
      {post.type === "interview" && (
          <Flex position="absolute" bottom={2} left={0} zIndex={2} justify={textOverflow ? 'flex-start' : 'center'}>
          <Button
            marginLeft={3}
            variant="cta"
            width="min-content"
            leftIcon={
              <IonIcon style={{ fontSize: "20px" }} icon={chatbubblesOutline} />
            }
            onClick={() => navigate("/interview/" + post.question._id)}
            >
            Répondre
          </Button>
            </Flex>
      )}

      {/* I N F O  F O R  M E D I A  T Y P E */}
      {(post.contentType!=='short' && post.contentType!=='text') && <Flex
        position="absolute"
        left={0}
        top={10}
        marginX={3}
        textAlign="left"
        zIndex={2}
      >
        {post.id_user.picture ? (
          <Image
            src={post.id_user.picture}
            alt="profilepic"
            boxSize={12}
            minW={12}
            rounded="full"
            objectFit="cover"
          />
        ) : (
          <Avatar size="md" />
        )}
        <Stack spacing={0} marginLeft={2} justify="center">
          <Text
            cursor="pointer"
            noOfLines={1}
            onClick={() =>
              post.id_user._id === currentUser._id
                ? navigate("/profile")
                : navigate("/profile/" + post.id_user._id)
            }
          >
            <span style={{ fontWeight: "bold" }}>{post.id_user.name}</span>{" "}
            &nbsp;
            {post.id_user.job && (
              <span style={{ fontStyle: "italic" }}>{post.id_user.job}</span>
            )}
          </Text>
              <Description/>
        </Stack>
      </Flex>}

      {/* Q U E S T I O N  F O R  M E D I A  T Y P E */}
      {(post.contentType!=='short' && post.contentType!=='text' && post.type==='interview') && <Box
        position="absolute"
        left={0}
        bottom={14}
        zIndex={2}
        width={showReaction ? 'calc(100% - 50px)' : '100%'}
      ><QuestionSlider question={post.question} index={0}/>
      </Box>}

      {/* R E A C T I O N              */}
      <Reaction/>
    </>
  );
};

export default Post;
