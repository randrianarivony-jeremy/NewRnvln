import { Heading, Image, Spinner, Stack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import App from "./App";
import logo from "../Assets/RANAVALONA.png";

const Preload = () => {
  const user = useRef();
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    const fetchToken = async () => {
      await axios
        .get(process.env.REACT_APP_API_URL + "/jwtid", {
          withCredentials: true,
        })
        .then(
          (res) => {
            user.current = res.data;
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
  else return <App user={user.current} />;
};

export default Preload;
