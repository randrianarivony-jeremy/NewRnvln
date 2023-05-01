import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentPost from "../../Component/Post/CommentPost";
import DataDisplay from "../../Component/Post/DataDisplay";
import LikePost from "../../Component/Post/LikePost";
import RespondPost from "../../Component/Post/RespondPost";
import { currentUserContext } from "../../Controler/App";
import { Loader } from "../../Controler/Routes";
import { ClickableFlex } from "../../Styles/Theme";
import QuestionBubble from "./QuestionBubble";

const PostCard = () => {
  const { type, id } = useParams();
  const [expandBtn, setExpandBtn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState();
  const [longDescription, setLongDescription] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(currentUserContext);
  const descriptionRef = useRef();
  const descriptionOverflow = useRef();

  const fetchPost = async () => {
    await axios.get(process.env.REACT_APP_API_URL + `/api/${type}/` + id).then(
      (res) => {
        console.log(res.data);
        setPost(res.data)
        setLoading(false);
        if (descriptionRef.current.scrollHeight > 45)
          descriptionOverflow.current = true;
      },
      () => {
        setLoading(false);
        navigate(-1);
      }
    );
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      {loading ? <Loader/> : <><Stack position="absolute" left={0} top={0}>
        <Button variant="float" className="bi-arrow-left" onClick={() => navigate(-1)} ></Button>
        {type === "interview" && (
          <QuestionBubble question={post.question} />
        )}
      <Flex height="100%" className="post" alignItems="center" justify="center">
        <DataDisplay data={post} />
      </Flex>
      </Stack>

      {/* I N F O  */}
      <Box
        position="absolute"
        bottom={2}
        color={
          post.contentType === "string" &&
          post.bg !== "transparent" &&
          "black"
        }
        textAlign="left"
        maxWidth="75%"
        marginLeft={3}
        zIndex={2}
      >
        <Text
          fontWeight="bold"
          onClick={() =>
            post.id_user._id === currentUser._id
              ? navigate("/profile")
              : navigate("/profile/" + post.id_user._id)
          }
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
            {post.type === "interview" && <RespondPost post={post} />}
            <ClickableFlex
              position="relative"
              flexDir="column"
              onClick={() =>
                post.id_user._id === currentUser._id
                  ? navigate("/profile")
                  : navigate("/profile/" + post.id_user._id)
              }
            >
              {post.id_user.picture ? (
                <Image
                  src={post.id_user.picture}
                  boxSize={10}
                  rounded="full"
                  objectFit="cover"
                  alt="profile pic"
                />
              ) : (
                <Avatar size="sm" />
              )}
            </ClickableFlex>
            <LikePost post={post} />
            <CommentPost post={post} />
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
      </>}
    </>
  );
};

export default PostCard;
