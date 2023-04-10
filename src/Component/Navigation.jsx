import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const ctaBtnColor = {
    background: "gradient",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
  // const icon
  return (
    <Flex width="100%">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-icons-active" : "nav-icons"
        }
      >
        <Button flexDir="column">
          <Flex className="bi-house" fontSize='xl'></Flex>
          <Text fontSize={12}>Accueil</Text>
        </Button>
      </NavLink>

      <NavLink
        to="/notification"
        className={({ isActive }) =>
          isActive ? "nav-icons-active" : "nav-icons"
        }
      >
        <Button flexDir="column">
          <Flex className="bi-bell" fontSize='xl'></Flex>
          <Text fontSize={12}>Notification</Text>
        </Button>
      </NavLink>

      <NavLink
        to="/publication"
        className={({ isActive }) =>
          isActive ? "nav-icons-active" : "nav-icons"
        }
      >
        <Button flexDir="column">
        <Flex
          className="bi-plus-square-fill"
          sx={ctaBtnColor}
          fontSize={30}
        ></Flex>
      </Button>
      </NavLink>

      <NavLink
        to="/message"
        className={({ isActive }) =>
          isActive ? "nav-icons-active" : "nav-icons"
        }
      >
        <Button flexDir="column">
          <Flex className="bi-chat-left" fontSize='xl'></Flex>
          <Text fontSize={12}>Message</Text>
        </Button>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? "nav-icons-active" : "nav-icons"
        }
      >
        <Button flexDir="column">
          <Flex className="bi-person" fontSize='xl'></Flex>
          <Text fontSize={12}>Profil</Text>
        </Button>
      </NavLink>
    </Flex>
  );
};

export default Navigation;
