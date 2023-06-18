import { Badge, Button, Flex, Text } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { addCircle, addCircleOutline, chatbox, chatboxOutline, home, homeOutline, notifications, notificationsOutline, person, personOutline } from "ionicons/icons";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { iconMd, iconXl } from "../Styles/Theme";

const Navigation = () => {
  const ctaBtnColor = {
    background: "gradient",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
  const { newMainMessage, newNotification } = useSelector(
    (state) => state.token
  );

  return (
    <Flex width="100%">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-icons-active" : "nav-icons"
        }
      >
        {({ isActive }) => (
          <Button flexDir="column" size={"lg"}>
            <IonIcon
              icon={isActive ? home : homeOutline}
              style={{ fontSize: iconMd }}
            />
            <Text fontSize={12}>Accueil</Text>
          </Button>
        )}
      </NavLink>

      <NavLink
        to="/notification"
        className={({ isActive }) =>
          isActive ? "nav-icons-active" : "nav-icons"
        }
      >
        {({ isActive }) => (
          <Button flexDir="column" size={"lg"}>
            <Flex position="relative">
              <IonIcon
                icon={isActive ? notifications : notificationsOutline}
                style={{ fontSize: iconMd }}
              />
              {newNotification > 0 && (
                <Badge
                  position="absolute"
                  bgColor="red"
                  right="-10px"
                  top={0}
                  lineHeight={5}
                >
                  {newNotification}
                </Badge>
              )}
            </Flex>
            <Text fontSize={12}>Notification</Text>
          </Button>
        )}
      </NavLink>

      <NavLink
        to="/publication"
        className={({ isActive }) =>
          isActive ? "nav-icons-active" : "nav-icons"
        }
      >
        {({ isActive }) => (
          <Button flexDir="column" size={"lg"}>
            <IonIcon
              icon={isActive ? addCircle : addCircleOutline}
              style={{ fontSize: iconXl }}
            />
          </Button>
        )}
      </NavLink>

      <NavLink
        to="/message"
        className={({ isActive }) =>
          isActive ? "nav-icons-active" : "nav-icons"
        }
      >
        {({ isActive }) => (
          <Button flexDir="column" size={"lg"}>
            <Flex position="relative">
              <IonIcon
                icon={isActive ? chatbox : chatboxOutline}
                style={{ fontSize: iconMd }}
              />
              {newMainMessage > 0 && (
                <Badge
                  position="absolute"
                  bgColor="red"
                  right="-10px"
                  top={0}
                  lineHeight={5}
                >
                  {newMainMessage}
                </Badge>
              )}
            </Flex>
            <Text fontSize={12}>Message</Text>
          </Button>
        )}
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? "nav-icons-active" : "nav-icons"
        }
      >
        {({ isActive }) => (
          <Button flexDir="column" size={"lg"}>
            <IonIcon
              icon={isActive ? person : personOutline}
              style={{ fontSize: iconMd }}
            />
            <Text fontSize={12}>Profil</Text>
          </Button>
        )}
      </NavLink>
    </Flex>
  );
};

export default Navigation;
