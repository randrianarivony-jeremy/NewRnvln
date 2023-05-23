import { Heading, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import logo from "../Assets/RANAVALONA.png";
import React, { createContext, useEffect, useState } from "react";
import Routes from "./Routes";

export const currentUserContext = createContext();

const Preload = () => {
  const [currentUser, setCurrentUser] = useState();
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    const fetchToken = async () => {
      await axios
        .get(process.env.REACT_APP_API_URL + "/jwtid", {
          withCredentials: true,
        })
        .then(
          (res) => {
            setCurrentUser(res.data);
          },
          (err) => {
            console.log("tsisy token: " + err);
          }
        )
        .finally(() => setInitializing(false));
    };
    fetchToken();
  }, []);

  if (initializing)
    return (
      <Stack justify="center" height="100%" align="center">
        <Image src={logo} alt="logo" width="100px" />
        <Heading size={"4xl"}>Ranavalona</Heading>
        <Spinner speed="0.7s" />
      </Stack>
    );
  else
    return (
      <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Routes />
      </currentUserContext.Provider>
    );
};

export default Preload;
