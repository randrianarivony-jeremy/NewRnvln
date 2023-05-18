import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import LikePost from "./LikePost";
import CommentPost from "./CommentPost";
import RespondPost from "./RespondPost";
import { useNavigate } from "react-router-dom";
import { postContext } from "./PostContainer";
import { iconMd } from "../../Styles/Theme";
import { currentUserContext } from "../../Controler/App";
import QuestionSlider from "../../Pages/StandalonePost/QuestionSlider";
import Article from "../Article/Article";
import {
  caretUpOutline,
  chatbubblesOutline,
  chevronDown,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";

const Post = () => {
  const [longDescription, setLongDescription] = useState(false);
  const navigate = useNavigate();
  const { post,showReaction,setShowReaction,textOverflow } = useContext(postContext);
  const { currentUser } = useContext(currentUserContext);
  const { colorMode } = useColorMode();

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
          <Text
            fontSize="sm"
            onClick={() => setLongDescription(!longDescription)}
            noOfLines={!longDescription && 2}
            bgColor={
              longDescription &&
              (colorMode === "light" ? "whiteAlpha.800" : "blackAlpha.800")
            }
            paddingX={2}
            paddingY={1}
            rounded="md"
            maxH={"50vh"}
            overflowY={longDescription && "auto"}
          >
            {post.description}
          </Text>
        </Stack>
      </Flex>}

      {/* Q U E S T I O N  F O R  M E D I A  T Y P E */}
      {(post.contentType!=='short' && post.contentType!=='text' && post.type==='interview') && <Box
        position="absolute"
        left={0}
        bottom={14}
        zIndex={2}
      ><QuestionSlider/>
      </Box>}

      {/* R E A C T I O N              */}
      <Stack position="absolute" right={0} bottom={0} align="center" zIndex={2}>
        {showReaction && (
          <>
            <LikePost post={post} />
            <CommentPost post={post} />
            {post.type === "interview" && (
              <Button
              flexDir="column"
            >
              <IonIcon icon={chatbubblesOutline} style={{fontSize:iconMd}}/>
              <Text fontSize="xs">{post.question.interviews.length}</Text>
            </Button>
            )}
          </>
        )}
        <Button
          onClick={() => setShowReaction(!showReaction)}
          color={
            post.contentType === "string" &&
            post.bg !== "transparent" &&
            "black"
          }
        >
          <IonIcon
            icon={showReaction ? chevronDown : caretUpOutline}
            style={{ fontSize: iconMd }}
          />
        </Button>
      </Stack>
    </>
  );
};

export default Post;
