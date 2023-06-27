import { Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../../Component/Navigation";
import SearchBtn from "../../Component/SearchBtn";
import ForYouPage from "./ForYouPage";
import Menu from "./Menu";

const Home = () => {
  return (
    <Flex flexDir="column" spacing={0} className="home" height="100%">
      <ForYouPage />
      <Navigation />

      <Menu />
      <SearchBtn />
    </Flex>
  );
};

export default Home;
