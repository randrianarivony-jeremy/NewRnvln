import { Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { currentUserContext } from "../../../Controler/App";
import { useFetchUserArticlesQuery } from "../../../Controler/Redux/Features/postSlice";
import { Loader } from "../../../Controler/Routes";
import Thumbs from "../Thumbs";

const UserArticles = ({ user }) => {
  const { currentUser } = useContext(currentUserContext);
  const { data, isLoading, isSuccess, isError } =
    useFetchUserArticlesQuery(user);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p>
        Une erreur est survenue lors du chargement de vos publications. Veuillez
        réessayer plus tard.
      </p>
    );
  if (isSuccess)
    return (
      <Flex height="100%" justify="center">
        {data.ids.length === 0 ? (
          <Text marginTop={10}>
            {user === currentUser._id ? "Vous n'avez" : "Cette personne n'a"}{" "}
            pas encore publié quelque chose
          </Text>
        ) : (
          <Flex wrap="wrap" justify="center">
            {data.ids.map((id) => (
              <Thumbs data={data.entities[id]} key={id} />
            ))}
          </Flex>
        )}
      </Flex>
    );
};

export default UserArticles;
