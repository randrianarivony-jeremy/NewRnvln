import { Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { apiCall } from "../../../Controler/App";
import Thumbs from "../Thumbs";

const UserSavings = ({user}) => {
  const userSaving = useRef([]);
  const [loading, setLoading] = useState(true);
  const fetchingError=useRef();

  const fetchUserSavings = async () => {
    await apiCall
      .get( "publication/user/" + user)
      .then(
        (res) => {
            if (res.data===null) userSaving.current=[];
            else userSaving.current = res.data
          setLoading(false);
        },
        (err) => {
          console.log(err);
            fetchingError.current = 'Une erreur est survenue lors du chargement de vos enregistrements. Veuillez réessayer plus tard.'
        }
      );
  };

  useEffect(() => {
    fetchUserSavings();
  }, []);

  return (
    <Flex height='100%' justify='center'>
      {loading ? (
        <Spinner marginTop={10}/>
      ) : fetchingError.current ? <Text>{fetchingError.current}</Text> : 
      userSaving.current.length===0 ? <Text marginTop={10}>Vous n'avez pas encore enregistré des contenus</Text> :
        <Flex wrap="wrap" justify="center">
          {userSaving.current.map((elt, key) => (
            <Thumbs data={elt} key={key} />
          ))}
        </Flex>
      }
    </Flex>
  );
};

export default UserSavings;
