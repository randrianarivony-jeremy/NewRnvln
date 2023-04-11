import { Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Component/Navigation";
import InfiniteSlider from "./InfiniteSlider";
import Menu from "./Menu";

const Home = () => {
  const [thread, setThread] = useState(<InfiniteSlider />);
  const navigate = useNavigate();

  return (
    <Flex flexDir="column" spacing={0} className="home" height="100%">
      {thread}
      <Navigation />

      <Menu setThread={setThread} />
      <Button position="absolute" className="bi-search" fontSize="xl" onClick={() => navigate("/search")} right={0} top={0} zIndex={2} ></Button>
    </Flex>
  );
};

export default Home;
