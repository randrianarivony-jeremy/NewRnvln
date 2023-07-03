// prettier-ignore
import {Avatar,Box,Button,Flex,HStack,Image,Skeleton,SkeletonCircle,Stack,Text,} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import {
  chatbubble,
  chatbubbles,
  heart,
  people,
  personAdd,
} from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserLoader from "../../Component/Loaders/UserLoader";
import {
  ClickableFlex,
  EmptyState,
  ErrorRender,
  Scroll,
} from "../../Component/Miscellanous";
import Navigation from "../../Component/Navigation";
import { currentUserContext } from "../../Controler/App";
import { setNewNotification } from "../../Controler/Redux/Features/credentialSlice";
import { useFetchNotificationsQuery } from "../../Controler/Redux/Features/notificationSlice";
import { useFetchSubscribersQuery, useFetchSubscriptionsQuery } from "../../Controler/Redux/Features/subscriSlice";
import { useFetchUserQuery } from "../../Controler/Redux/Features/userSlice";

const Notification = () => {
  const { currentUser } = useContext(currentUserContext);
  const {
    friends,friendRequest,
    myUserLoading,
    myUserSuccess,
  } = useFetchUserQuery(currentUser._id,{selectFromResult:({data,isLoading,isSuccess})=>({
    friends:data?.friends,
    friendRequest:data?.friendRequest,
    myUserLoading:isLoading,
    myUserSuccess:isSuccess,
  })});
  const {
    isLoading: subscribersLoading,
    isSuccess: subscribersSuccess,
    data: subscribers,
  } = useFetchSubscribersQuery({ userId:currentUser._id, details: false });
  const { data, isLoading, isError, error } = useFetchNotificationsQuery();
  const navigate = useNavigate();
  const [imgLoading, setImgLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNewNotification(0));
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
        <ErrorRender isError={isError} error={error} />
      ) : data.length === 0 ? (
        <EmptyState />
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
                {elt.action === "like" ? (
                  <Button boxSize={12} flexDir="column">
                    <Flex fontSize="xl">
                      <IonIcon icon={heart} />
                    </Flex>
                    <Text fontSize="xs">{elt.length}</Text>
                  </Button>
                ) : elt.action === "comment" ? (
                  <Button boxSize={12} flexDir="column">
                    <Flex fontSize="xl">
                      <IonIcon icon={chatbubble} />
                    </Flex>
                    <Text fontSize="xs">{elt.length}</Text>
                  </Button>
                ) : elt.action === "subscribe" ? (
                  <Button boxSize={12} flexDir="column">
                    <Flex fontSize="xl">
                      <IonIcon icon={people} />
                    </Flex>
                    {subscribersLoading ? <Skeleton height={1} width={2}/> : subscribersSuccess && <Text fontSize="xs">{subscribers.length}</Text>}
                  </Button>
                ) : elt.action === "friendRequest" ? (
                  <Button boxSize={12} flexDir="column">
                    <Flex fontSize="xl">
                      <IonIcon icon={personAdd} />
                    </Flex>
                    {myUserLoading ? <Skeleton height={1} width={2}/> : myUserSuccess && <Text fontSize="xs">{friendRequest.length}</Text>}
                  </Button>
                ) : elt.action === "friendAccepted" ? (
                  <Button boxSize={12} flexDir="column">
                    <Flex fontSize="xl">
                      <Flex className="bi-person-fill-check"></Flex>
                    </Flex>
                    {myUserLoading ? <Skeleton height={1} width={2}/> : myUserSuccess && <Text fontSize="xs">{friends.length}</Text>}
                  </Button>
                ) : (
                  <Button boxSize={12} flexDir="column">
                    <Flex fontSize="xl">
                      <IonIcon icon={chatbubbles} />
                    </Flex>
                    <Text fontSize="xs">{elt.length}</Text>
                  </Button>
                )}
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
