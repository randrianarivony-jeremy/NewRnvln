import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { apiCall, currentUserContext } from "../../../Controler/App";
import Thumbs from "../Thumbs";

const UserInterviews = ({user}) => {
  const {currentUser}=useContext(currentUserContext);
  const userInterview = useRef([]);
  const [loading, setLoading] = useState(true);
  const fetchingError=useRef();

  const fetchUserInterviews = async () => {
    await apiCall.get("interview/user/" + user).then(
      (res) => {
        if (res.data === null) userInterview.current = [];
        else userInterview.current = res.data;
        setLoading(false);
      },
      (err) => {
        console.log(err);
        fetchingError.current =
          "Une erreur est survenue lors du chargement de vos Interviews. Veuillez réessayer plus tard.";
      }
    );
  };

  useEffect(() => {
    fetchUserInterviews();
  }, []);
  return (
    <Flex height="100%" justify="center">
      {loading ? (
        <Spinner marginTop={10} />
      ) : userInterview.current.length === 0 ? (
        <Text marginTop={10}>
          {user === currentUser._id ? "Vous n'avez" : "Cette personne n'a"} pas
          encore participé à des Interviews
        </Text>
      ) : (
        <Flex wrap="wrap" justify="center">
          {userInterview.current.map((elt, key) => (
            <Thumbs data={elt} key={key} />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default UserInterviews;
