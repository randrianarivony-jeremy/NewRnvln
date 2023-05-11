import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { currentUserContext } from "../../../Controler/App";
import Thumbs from "../Thumbs";

const UserArticles = ({user}) => {
  const userPublication = useRef([]);
  const [loading, setLoading] = useState(true);
  const fetchingError=useRef();
  const {currentUser}=useContext(currentUserContext);

  const fetchUserPublications = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/api/publication/article/user/" + user)
      .then(
        (res) => {
            if (res.data===null) userPublication.current=[];
            else userPublication.current = res.data
          setLoading(false);
        },
        (err) => {
          console.log(err);
            fetchingError.current = 'Une erreur est survenue lors du chargement de vos publications. Veuillez réessayer plus tard.'
        }
      );
  };

  useEffect(() => {
    fetchUserPublications();
  }, []);

  return (
    <Flex height='100%' justify='center'>
      {loading ? (
        <Spinner marginTop={10}/>
      ) : fetchingError.current ? <Text>{fetchingError.current}</Text> : 
      userPublication.current.length===0 ? <Text marginTop={10}>{user===currentUser._id ? "Vous n'avez" : "Cette personne n'a"} pas encore publié quelque chose</Text> :
        <Flex wrap="wrap" justify="center">
          {userPublication.current.map((elt, key) => (
            <Thumbs data={elt} type='publication' key={key} />
          ))}
        </Flex>
      }
    </Flex>
  );
};

export default UserArticles;
