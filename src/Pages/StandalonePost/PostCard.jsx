import { Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostContainer from "../../Component/Post/PostContainer";
import { apiCall } from "../../Controler/App";
import { Loader } from "../../Controler/Routes";

const PostCard = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      await apiCall
        .get("publication/" + id)
        .then(
          (res) => {
            setPost(res.data);
          },
          () => {
            navigate(-1);
          }
        )
        .finally(() => setLoading(false));
    };
    fetchPost();
  }, []);

  return (
    <>
      <Flex position='absolute' top={0} left={0}>
        <Button variant="float" className="bi-arrow-left" onClick={() => navigate(-1)}
        ></Button>
        <Button>Publication</Button>
      </Flex>
      {loading ? <Loader /> : <PostContainer post={post} />}
    </>
  );
};

export default PostCard;
