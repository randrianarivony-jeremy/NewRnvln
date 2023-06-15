import { Button, Flex } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
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
      <Flex position={"absolute"} zIndex={2} width="100%">
        <Button boxSize={12} onClick={() => navigate(-1)}>
          <IonIcon icon={arrowBack} />
        </Button>
        <Button size={"lg"} paddingX={0}>
          Publication
        </Button>
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
