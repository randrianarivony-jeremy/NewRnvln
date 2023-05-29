import { Button, Flex } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import React, { createContext, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../../Component/Navigation";
import { useFetchContentsQuery } from "../../Controler/Redux/Features/postSlice";
import { Loader } from "../../Controler/Routes";
import RealtimeSocketContext from "../../Controler/Socketio/RealtimeSocketContext";
import { iconMd } from "../../Styles/Theme";
import Menu from "./Menu";

export const newsfeedContext = createContext();

const Home = () => {
  const navigate = useNavigate();
  const entryTimeRef = useRef([Date.now()]);
  return (
    <Flex flexDir="column" spacing={0} className="home" height="100%">
      <newsfeedContext.Provider value={{ entryTimeRef }}>
        <Outlet />
      </newsfeedContext.Provider>
      <RealtimeSocketContext>
        <Navigation />
      </RealtimeSocketContext>

      <Menu />
      <Button
        size={"lg"}
        onClick={() => navigate("/search")}
        position="absolute"
        right={0}
        top={0}
        zIndex={2}
      >
        <IonIcon icon={searchOutline} style={{ fontSize: iconMd }} />
      </Button>
    </Flex>
  );
};

export default Home;
