import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../Component/Miscellanous";
import { useFetchSinglePostQuery } from "../../Controler/Redux/Features/postSlice";
import PostContainer from "./PostContainer";

const SinglePost = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError } = useFetchSinglePostQuery({
    type,
    postId: id,
  });

  return (
    <>
      <Flex position="absolute" top={0} left={0} zIndex={2}>
        <Button
          variant="float"
          className="bi-arrow-left"
          onClick={() => navigate(-1)}
        ></Button>
        <Button>Publication</Button>
      </Flex>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Flex
          align={"center"}
          justify="center"
          height={"100%"}
          textAlign="center"
        >
          <p>
            Une erreur est survenue lors du chargement. Veuillez réessayer plus
            tard.
          </p>
        </Flex>
      ) : (
        isSuccess && <PostContainer post={data} />
      )}
    </>
  );
};

export default SinglePost;
