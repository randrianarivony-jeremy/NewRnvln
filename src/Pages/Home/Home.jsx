import { Box, Button, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../../Component/Navigation";
import RealtimeSocketContext from "../../Controler/Socketio/RealtimeSocketContext";
import ForYouPage from "./ForYouPage";
import Menu from "./Menu";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Flex flexDir="column" spacing={0} className="home" height="100%">
        {/* <ForYouPage/> */}
        <Outlet/>
      <RealtimeSocketContext>
        <Navigation />
        </RealtimeSocketContext>

      <Menu />
      <Button
        position="absolute"
        className="bi-search"
        fontSize="xl"
        onClick={() => navigate("/search")}
        right={0}
        top={0}
        zIndex={2}
      ></Button>
    </Flex>
  );
};

export default Home;
