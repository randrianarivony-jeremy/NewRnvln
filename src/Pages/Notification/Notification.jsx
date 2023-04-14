import {Avatar,Box,Button,Flex,HStack,Skeleton,Stack,Text,} from "@chakra-ui/react";
import { faHeart,faComment, faUsers,faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Component/Navigation";
import { ClickableFlex, Scroll } from "../../Styles/Theme";

const Notification = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notifDataFormated, setNotifDataFormated] = useState([]);

  const notifData = [
    { user: "Username", action: "like", post: "3k" },
    { user: "Username", action: "comment", post: "526" },
    { user: "Username", action: "follow", post: "10k" },
    { user: "Username", action: "like", post: "6k" },
    { user: "Username", action: "respond", post: "1k" },
    { user: "Username", action: "subscribe", post: "1k" },
    { user: "Username", action: "respond", post: "1k" },
  ];

  let notifArray = [];
  const formatNotifData = () => {
    notifData.map((elt) => {
      switch (elt.action) {
        case "like":
          notifArray = [
            ...notifArray,
            {
              ...elt,
              text: "a aimé votre publication.",
              url: "",
              icon: (
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
              ),
            },
          ];
          break;
        case "comment":
          notifArray = [
            ...notifArray,
            {
              ...elt,
              text: "a commenté votre publication.",
              url: "",
              icon: <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>,
            },
          ];
          break;
        case "follow":
          notifArray = [
            ...notifArray,
            {
              ...elt,
              text: "a commencé à vous suivre.",
              url: "",
              icon: <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>,
            },
          ];
          break;
        case "subscribe":
          notifArray = [
            ...notifArray,
            {
              ...elt,
              text: "vient de s'abonner à vous.",
              url: "",
              icon: <Flex className="bi-people-fill"></Flex>,
            },
          ];
          break;
        case "respond":
          notifArray = [
            ...notifArray,
            {
              ...elt,
              text: "a répondu à votre question.",
              url: "",
              icon: <FontAwesomeIcon icon={faComments}></FontAwesomeIcon>,
            },
          ];
          break;

        default:
          break;
      }
      setNotifDataFormated(notifArray);
      setLoading(false);
      return notifArray;
    });
  };

  useEffect(() => {
    formatNotifData();
  }, []);

  return (
    <Stack height="100%" spacing={0}>
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button width='100%'>Notifications</Button>
      </Flex>
      {loading ? (
        <Stack>
          <Skeleton height={5} width="90%" />
          <Skeleton height={5} width="90%" />
          <Skeleton height={5} width="90%" />
          <Skeleton height={5} width="90%" />
        </Stack>
      ) : (
        <Scroll
          height='100%'
        >
          {notifDataFormated.map((elt, key) => (
            <ClickableFlex
              key={key}
              justify="space-between"
              onClick={() => navigate("/chat")}
            >
              <HStack width="100%">
                <Avatar size="sm" />
                <Box width="100%">
                  <Text>
                    {elt.user} {elt.text}
                  </Text>
                  <Text fontSize="sm" fontStyle="italic">
                    Il y a 20min
                  </Text>
                </Box>
                <Button boxSize={12} flexDir="column">
                  <Flex fontSize='xl'>{elt.icon}</Flex>
                  <Text fontSize="xs">{elt.post}</Text>
                </Button>
              </HStack>
            </ClickableFlex>
          ))}
        </Scroll>
      )}
      <Navigation />
    </Stack>
  );
};

export default Notification;
