import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import {
  chatbubble,
  chatbubbles,
  heart,
  people,
  personAdd,
} from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserLoader from "../../Component/Loaders/UserLoader";
import Navigation from "../../Component/Navigation";
import { currentUserContext } from "../../Controler/App";
import { useFetchNotificationsQuery } from "../../Controler/Redux/Features/notificationSlice";
import { socketContext } from "../../Controler/Socketio/RealtimeSocketContext";
import { ClickableFlex, Scroll } from "../../Styles/Theme";

const Notification = () => {
  const { currentUser } = useContext(currentUserContext);
  const { data, isLoading, isError } = useFetchNotificationsQuery({
    friendRequest: currentUser.friendRequest.length,
    friends: currentUser.friends.length,
    subscribers: currentUser.subscribers.length,
  });
  const navigate = useNavigate();
  const [imgLoading, setImgLoading] = useState(true);
  const { setNewNotification } = useContext(socketContext);

  useEffect(() => {
    setNewNotification(0);
  }, []);

  return (
    <Stack height="100%" spacing={0}>
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button width="100%">Notifications</Button>
      </Flex>
      {isLoading ? (
        <Scroll height="100%">
          <Stack height="100%" marginLeft={3}>
            <UserLoader length={5} />
          </Stack>
        </Scroll>
      ) : isError ? (
        <Flex height="100%" align="center" justify="center">
          <p>
            Une erreur est survenue lors du chargement. Veuillez réessayer plus
            tard.
          </p>
        </Flex>
      ) : data.length === 0 ? (
        <Flex height="100%" align="center" justify="center">
          <Text>EMPTYSTATE</Text>
        </Flex>
      ) : (
        <Scroll height="100%">
          {data.map((elt, key) => (
            <ClickableFlex
              key={key}
              justify="space-between"
              onClick={() => navigate(elt.url)}
            >
              <HStack width="100%">
                {elt.picture ? (
                  <Flex boxSize={10} position="relative">
                    <Image
                      src={elt.picture}
                      alt="profilepic"
                      minWidth={10}
                      height={10}
                      rounded="full"
                      objectFit="cover"
                      onLoad={() => setImgLoading(false)}
                    />
                    {imgLoading && (
                      <SkeletonCircle size={10} position="absolute" />
                    )}
                  </Flex>
                ) : (
                  <Avatar boxSize={10} />
                )}
                <Box width="100%">
                  <Text>
                    {elt.name} {elt.text}
                  </Text>
                  <Text fontSize="sm" fontStyle="italic">
                    Il y a 20min
                  </Text>
                </Box>
                <Button boxSize={12} flexDir="column">
                  <Flex fontSize="xl">
                    {elt.action === "like" ? (
                      <IonIcon icon={heart} />
                    ) : elt.action === "comment" ? (
                      <IonIcon icon={chatbubble} />
                    ) : elt.action === "subscribe" ? (
                      <IonIcon icon={people} />
                    ) : elt.action === "friendRequest" ? (
                      <IonIcon icon={personAdd} />
                    ) : elt.action === "friendAccepted" ? (
                      <Flex className="bi-person-fill-check"></Flex>
                    ) : (
                      <IonIcon icon={chatbubbles} />
                    )}
                  </Flex>
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
