import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import Thumbs from "../Thumbs";

const UserInterviews = ({user}) => {
  const userInterview = useRef([]);
  const [loading, setLoading] = useState(true);
  const fetchingError=useRef();

  const fetchUserInterviews = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/api/interview/user/" + user)
      .then(
        (res) => {
            if (res.data===null) userInterview.current=[];
            else userInterview.current = res.data;
          setLoading(false);
        },
        (err) => {
          console.log(err);
          fetchingError.current = 'Une erreur est survenue lors du chargement de vos Interviews. Veuillez réessayer plus tard.'
        }
      );
  };

  useEffect(() => {
    fetchUserInterviews();
  }, []);
  return (
    <Flex height='100%' justify='center'>
      {loading ? (
        <Spinner marginTop={10}/>
      ) : (userInterview.current.length===0 ? <Text marginTop={10}>Vous n'avez pas encore participé à des Interviews</Text> :
        <Flex wrap="wrap" justify="center">
          {userInterview.current.map((elt, key) => (
            <Thumbs data={elt} type={'interview'} key={key} />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default UserInterviews;
