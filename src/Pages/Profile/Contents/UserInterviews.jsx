import { Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { currentUserContext } from "../../../Controler/App";
import { useFetchUserInterviewsQuery } from "../../../Controler/Redux/Features/postSlice";
import { Loader } from "../../../Controler/Routes";
import Thumbs from "../Thumbs";

const UserInterviews = ({ user }) => {
  const { currentUser } = useContext(currentUserContext);
  const { data, isLoading, isError, isSuccess } =
    useFetchUserInterviewsQuery(user);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <Text fontSize={"xs"}>
        Une erreur est survenue lors du chargement de vos Interviews. Veuillez
        réessayer plus tard.
      </Text>
    );
  if (isSuccess)
    return (
      <Flex height="100%" justify="center">
        {data.ids.length === 0 ? (
          <Text marginTop={10}>
            {user === currentUser._id ? "Vous n'avez" : "Cette personne n'a"}{" "}
            pas encore participé à des Interviews
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

export default UserInterviews;
