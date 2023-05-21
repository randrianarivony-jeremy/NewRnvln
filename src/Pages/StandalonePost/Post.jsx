import {
  Avatar,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { dataContext, postContext } from "./PostContainer";
import Article from "./Article";
import { currentUserContext } from "../../Controler/App";
import Description from "./Description";

const Post = () => {
  const navigate = useNavigate();
  const { post } = useContext(postContext);
  const { data } = useContext(dataContext);
  const { currentUser } = useContext(currentUserContext);

  return (
    <>
      <Flex height="100%" className="post" alignItems="center" justify="center">
        <Article/>
      </Flex>

      {/* I N F O  F O R  M E D I A  T Y P E */}
      {(data.contentType!=='short' && data.contentType!=='text') && <Flex
        position="absolute"
        left={0}
        top={12}
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
    </>
  );
};

export default Post;
