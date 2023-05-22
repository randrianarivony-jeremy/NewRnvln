import { Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiCall } from "../../Controler/App";
import { Loader } from "../../Controler/Routes";
import PostContainer from "./PostContainer";

const SinglePost = () => {
  const { id,type } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      await apiCall
        .get(`${type}/` + id)
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
      <Flex position='absolute' top={0} left={0} zIndex={2}>
        <Button variant="float" className="bi-arrow-left" onClick={() => navigate(-1)}
        ></Button>
        <Button>Publication</Button>
      </Flex>
      {loading ? <Loader /> : <PostContainer post={post} />}
    </>
  );
};

export default SinglePost;
