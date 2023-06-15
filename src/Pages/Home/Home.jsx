import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import React, { useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../../Component/Navigation";
import RealtimeSocketContext from "../../Controler/Socketio/RealtimeSocketContext";
import { iconMd } from "../../Styles/Theme";
import Menu from "./Menu";

const Home = () => {
  const navigate = useNavigate();
  const searchSubmit = useRef(false);
  const inputRef = useRef();
  return (
    <Flex flexDir="column" spacing={0} className="home" height="100%">
      <Outlet />
      <RealtimeSocketContext>
        <Navigation />
      </RealtimeSocketContext>

      <Menu />
      <InputGroup
        position="absolute"
        zIndex={2}
        right={0}
        top={1}
        display="block"
        width={"calc(100% - 72px)"}
      >
        <Input
          ref={inputRef}
          width={0}
          float="right"
          border={"none"}
          transition={"width 1s ease-out"}
          onBlur={() => {
            setTimeout(() => {
              searchSubmit.current = false;
            }, 1000);
          }}
          onFocus={() => (searchSubmit.current = true)}
          _focus={{ width: "100%" }}
        />
        <InputRightElement
          onClick={() =>
            searchSubmit.current
              ? navigate(
                  "/search?keyword=" +
                    inputRef.current.value +
                    "&default_index=2"
                )
              : inputRef.current.focus()
          }
          cursor="pointer"
        >
          <IonIcon icon={searchOutline} style={{ fontSize: iconMd }} />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default Home;
