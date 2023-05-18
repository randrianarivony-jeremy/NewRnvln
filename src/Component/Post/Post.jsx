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
import DataDisplay from "./DataDisplay";
import LikePost from "./LikePost";
import CommentPost from "./CommentPost";
import RespondPost from "./RespondPost";
import { useNavigate } from "react-router-dom";
import { postContext } from "./PostContainer";
import { iconMd } from "../../Styles/Theme";
import { currentUserContext } from "../../Controler/App";
import QuestionSlider from "../../Pages/StandalonePost/QuestionSlider";
import Article from "../Article/Article";
import { caretUpOutline, chevronDown } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

const Post = () => {
  const [expandBtn, setExpandBtn] = useState(true);
  const [longDescription, setLongDescription] = useState(false);
  const navigate = useNavigate();
  const { post } = useContext(postContext);
  const { currentUser } = useContext(currentUserContext);
  const { colorMode } = useColorMode();

  return (
    <>
      <Flex height="100%" className="post" alignItems="center" justify="center">
        {post.type === "article" ? <Article /> : <DataDisplay data={post} />}
      </Flex>

      {post.type === "interview" && (
        <Box position="absolute" textAlign="left" zIndex={1} top={10} left={0}>
          <QuestionSlider question={post.question} />
        </Box>
      )}

      {/* I N F O  */}
      <Flex
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
      </Flex>

      {/* R E A C T I O N              */}
      <Stack
        position="absolute"
        right={0}
        bottom={0}
        align="center"
        marginRight={1}
        zIndex={2}
      >
        {expandBtn && (
          <>
            {post.type === "interview" && (
              <RespondPost questionId={post.question._id} />
            )}
            <LikePost post={post} />
            <CommentPost post={post} />
          </>
        )}
        <Button
          onClick={() => setExpandBtn(!expandBtn)}
          color={
            post.contentType === "string" &&
            post.bg !== "transparent" &&
            "black"
          }
        >
          <IonIcon
            icon={expandBtn ? chevronDown : caretUpOutline}
            style={{ fontSize: iconMd }}
          />
        </Button>
      </Stack>
    </>
  );
};

export default Post;
