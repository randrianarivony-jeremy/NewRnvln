import { Avatar, Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import DataDisplay from "./DataDisplay";
import LikePost from "./LikePost";
import CommentPost from "./CommentPost";
import RespondPost from "./RespondPost";
import { useNavigate } from "react-router-dom";
import { postContext } from "./PostContainer";
import { ClickableFlex } from "../../Styles/Theme";
import { currentUserContext } from "../../Controler/App";
import QuestionSlider from "../../Pages/StandalonePost/QuestionSlider";
import Article from "../Article/Article";

const Post = () => {
  const [expandBtn, setExpandBtn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [longDescription, setLongDescription] = useState(false);
  const navigate = useNavigate();
  const {post}=useContext(postContext);
  const {currentUser}=useContext(currentUserContext);
  const descriptionRef = useRef();
  const descriptionOverflow = useRef();

  useEffect(() => {
    if (descriptionRef.current.scrollHeight > 45)
      descriptionOverflow.current = true;
    setLoading(false);
  }, []);
  return (
    <>
      <Flex height="100%" className="post" alignItems="center" justify="center">
        {post.type==='article' ? <Article/> : <DataDisplay data={post} />}
      </Flex>

      {post.type==='interview' && <Box position="absolute" textAlign='left' zIndex={1} top={10} left={0}>
        <QuestionSlider question={post.question}/>
      </Box>}
      
      {/* I N F O  */}
      <Box
        position="absolute"
        bottom={2}
        color={
          post.contentType === "string" && post.bg !== "transparent" && "black"
        }
        textAlign="left"
        maxWidth="75%"
        marginLeft={3}
        zIndex={2}
      >
        <Text
          fontWeight="bold"
          onClick={() =>post.id_user._id===currentUser._id ? navigate('/profile') : navigate("/profile/"+post.id_user._id)}
        >
          {post.id_user.name}
        </Text>
        <Text
          position="relative"
          ref={descriptionRef}
          fontSize="sm"
          onClick={() => setLongDescription(!longDescription)}
          maxH={!longDescription && 10}
          overflowY="hidden"
        >
          {post.description}
          {!loading && (
            <>
              {descriptionOverflow.current && (
                <Button
                  variant="link"
                  size="sm"
                  color={
                    post.contentType === "string" &&
                    post.bg !== "transparent" &&
                    "black"
                  }
                  position="absolute"
                  right={0}
                  bottom={0}
                  onClick={() => setLongDescription(!longDescription)}
                >
                  {longDescription ? "Moins" : "Plus"}
                </Button>
              )}
            </>
          )}
        </Text>
      </Box>

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
            {post.type==='interview' && <RespondPost questionId={post.question._id} />}
            <ClickableFlex position="relative" flexDir="column"
            onClick={() =>post.id_user._id===currentUser._id ? navigate('/profile') : navigate("/profile/"+post.id_user._id)}>
              {post.id_user.picture ? <Image src={post.id_user.picture} boxSize={10} rounded='full' objectFit='cover' alt='profile pic'/> : <Avatar
                size="sm"
                
              />}
            </ClickableFlex>
            <LikePost post={post}/>
            <CommentPost post={post}/>
          </>
        )}
        <Button
          boxSize={12}
          className={expandBtn ? "bi-caret-down" : "bi-caret-up"}
          onClick={() => setExpandBtn(!expandBtn)}
          color={
            post.contentType === "string" &&
            post.bg !== "transparent" &&
            "black"
          }
        ></Button>
      </Stack>
    </>
  );
};

export default Post;
