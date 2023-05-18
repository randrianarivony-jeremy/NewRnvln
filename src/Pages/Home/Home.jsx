import { Button, Flex } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../../Component/Navigation";
import RealtimeSocketContext from "../../Controler/Socketio/RealtimeSocketContext";
import { iconMd } from "../../Styles/Theme";
import Menu from "./Menu";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Flex flexDir="column" spacing={0} className="home" height="100%">
      <Outlet />
      <RealtimeSocketContext>
        <Navigation />
      </RealtimeSocketContext>

      <Menu />
      <Button
        fontSize="xl"
        onClick={() => navigate("/search")}
        position="absolute"
        right={0}
        top={0}
        zIndex={2}
      >
        <IonIcon icon={searchOutline} style={{fontSize:iconMd}}/>
      </Button>
    </Flex>
  );
};

export default Home;
