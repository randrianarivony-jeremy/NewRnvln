import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  faHeart,
  faComment,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { people, personAdd } from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserLoader from "../../Component/Loaders/UserLoader";
import Navigation from "../../Component/Navigation";
import { apiCall, currentUserContext } from "../../Controler/App";
import { socketContext } from "../../Controler/Socketio/RealtimeSocketContext";
import { ClickableFlex, Scroll } from "../../Styles/Theme";

const Notification = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notifDataFormated, setNotifDataFormated] = useState([]);
  const { currentUser } = useContext(currentUserContext);
  const notificationList = useRef();
  const emptyNotification = useRef(false);
  const toast = useToast();
  const {setNewNotification}=useContext(socketContext);

    
    const formatNotifData = () => {
    let notifArray = [];
    notificationList.current.map((elt) => {
      switch (elt.action) {
        case "like":
          notifArray = [
            ...notifArray,
            {
              name: elt.from.name,
              picture: elt.from.picture,
              text: "a aimé votre publication.",
              length: elt.on.likers.length,
              url: '/post/'+elt.on._id,
              icon: <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>,
            },
          ];
          break;
        case "comment":
          notifArray = [
            ...notifArray,
            {
              name: elt.from.name,
              picture: elt.from.picture,
              length: elt.on.comments.length,
              text: "a commenté votre publication.",
              url: '/post/'+elt.on._id,
              icon: <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>,
            },
          ];
          break;
        case "subscribe":
          notifArray = [
            ...notifArray,
            {
              text: "vient de s'abonner à vous.",
              name: elt.from.name,
              picture: elt.from.picture,
              length: currentUser.subscribers.length,
              url: "/profile/"+elt.from._id,
              icon: <IonIcon icon={people}/>,
            },
          ];
          break;
        case "friendRequest":
          notifArray = [
            ...notifArray,
            {
              text: "vous a envoyé une invitation.",
              name: elt.from.name,
              picture: elt.from.picture,
              length: currentUser.friendRequest.length,
              url: "/profile/"+elt.from._id,
              icon: <IonIcon icon={personAdd}/>,
            },
          ];
          break;
        case "friendAccepted":
          notifArray = [
            ...notifArray,
            {
              text: "a accepté votre invitation.",
              name: elt.from.name,
              picture: elt.from.picture,
              length: currentUser.friends.length,
              url: "/profile/"+elt.from._id,
              icon: <Flex className="bi-person-fill-check"></Flex>,
            },
          ];
          break;
        case "interview":
          notifArray = [
            ...notifArray,
            {
              name: elt.from.name,
              picture: elt.from.picture,
              length: elt.on.question.interviews.length,
              text: "a répondu à votre question.",
              url: "/post/"+elt.on._id,
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
    const fetchNotification = async () => {
      await apiCall
        .get("notification").then(
          (res) => {
            notificationList.current = res.data;
            if (res.data.length === 0) {
              emptyNotification.current = true;
              setLoading(false);
            } else formatNotifData();
          },
          (err) => {
            toast({
                status: "error",
                duration: 5000,
              description: err.message + "Veuillez réessayer s'il vous plait",
              title: "Operation failed",
            });
            navigate(-1)
            console.error(err);
          }
        );
      };
    fetchNotification();
    setNewNotification(0);
  }, []);

  return (
    <Stack height="100%" spacing={0}>
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button width="100%">Notifications</Button>
      </Flex>
      {loading ? (
        <Scroll height="100%">
        <Stack height="100%" marginLeft={3}>
          <UserLoader length={5}/>
        </Stack>
        </Scroll>
      ) : emptyNotification.current ? (
        <Flex height="100%" align="center" justify="center">
          <Text>EMPTYSTATE</Text>
        </Flex>
      ) : (
        <Scroll height="100%">
          {notifDataFormated.map((elt, key) => (
            <ClickableFlex
              key={key}
              justify="space-between"
              onClick={() => navigate(elt.url)}
            >
              <HStack width="100%">
              {elt.picture ? <Image src={elt.picture} alt='profilepic' minWidth={10} height={10} rounded='full' objectFit='cover'/> : <Avatar boxSize={10} />}
                <Box width='100%'>
                  <Text>{elt.name} {elt.text}</Text>
                  <Text fontSize="sm" fontStyle="italic">
                    Il y a 20min
                  </Text>
                </Box>
                <Button boxSize={12} flexDir="column">
                  <Flex fontSize="xl">{elt.icon}</Flex>
                  <Text fontSize="xs">{elt.length}</Text>
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
