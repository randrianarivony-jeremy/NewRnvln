// prettier-ignore
import { Avatar, Badge, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, Image, Stack, Text, useDisclosure } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserLoader from "../../../Component/Loaders/UserLoader";
import { ClickableFlex, ErrorRender } from "../../../Component/Miscellanous";
import { currentUserContext } from "../../../Controler/App";
import {
  setNewFriendAccepted,
  setNewFriendRequest,
} from "../../../Controler/Redux/Features/credentialSlice";
import {
  useLazyFetchSubscribersQuery,
  useLazyFetchSubscriptionsQuery,
} from "../../../Controler/Redux/Features/subscriSlice";
import { useLazyFetchUserFriendsQuery } from "../../../Controler/Redux/Features/userSlice";

const RelationList = ({ category, userId, length }) => {
  const { currentUser } = useContext(currentUserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [
    fetchUserFriends,
    { isLoading, isSuccess, isError, data: friendsOrRequests, error },
  ] = useLazyFetchUserFriendsQuery();
  const [
    fetchUserSubscribers,
    {
      isLoading: subscribersLoading,
      isError: subscribersIsError,
      error: subscribersError,
      isSuccess: subscribersSuccess,
      data: subscribers,
    },
  ] = useLazyFetchSubscribersQuery();
  const [
    fetchUserSubscriptions,
    {
      isLoading: subscriptionsLoading,
      isError: subscriptionsIsError,
      error: subscriptionsError,
      isSuccess: subscriptionsSuccess,
      data: subscriptions,
    },
  ] = useLazyFetchSubscriptionsQuery();
  const navigate = useNavigate();
  const { newFriendRequest, newFriendAccepted } = useSelector(
    (state) => state.token
  );

  useEffect(() => {
    if (isOpen) {
      switch (category) {
        case "Abonnés":
          fetchUserSubscribers(
            {
              userId,
              details: true,
            },
            { preferCacheValue: true }
          );
          break;

        case "Abonnements":
          fetchUserSubscriptions(
            {
              userId,
              details: true,
            },
            { preferCacheValue: true }
          );
          break;

        case "Partenaires":
          fetchUserFriends(
            {
              userId,
              category: "friends",
            },
            { preferCacheValue: true }
          );
          setNewFriendAccepted(0);
          break;

        case "Demandes":
          fetchUserFriends(
            {
              userId,
              category: "requests",
            },
            { preferCacheValue: true }
          );
          setNewFriendRequest(0);
          break;

        default:
          break;
      }
    }
    // if (isOpen && category === "Demandes") setNewFriendRequest(0);
    // if (isOpen && category === "Partenaires") setNewFriendAccepted(0);
  }, [isOpen]);

  let display;
  if (isLoading || subscribersLoading || subscriptionsLoading)
    display = (
      // <HStack>
      //   <SkeletonCircle boxSize={10} />
      //   <Skeleton height={5} width={200} />
      // </HStack>
      <UserLoader length={3} />
    );
  if (isError) return <ErrorRender isError={isError} error={error} />;
  if (subscriptionsIsError)
    return (
      <ErrorRender isError={subscriptionsIsError} error={subscriptionsError} />
    );
  if (subscribersIsError)
    return (
      <ErrorRender isError={subscribersIsError} error={subscribersError} />
    );

  if (isSuccess || subscribersSuccess || subscriptionsSuccess) {
    let data = isSuccess
      ? friendsOrRequests
      : subscribersSuccess
      ? subscribers
      : subscriptions;
    display = (
      <Stack>
        {data.map((elt) => (
          <ClickableFlex
            key={elt._id}
            justify="space-between"
            onClick={() => navigate("/profile/" + elt._id)}
          >
            <Flex>
              {elt.picture ? (
                <Image
                  src={elt.picture}
                  alt="profilepic"
                  boxSize={12}
                  rounded="full"
                  objectFit="cover"
                />
              ) : (
                <Avatar size="md" />
              )}
              <Stack spacing={0} marginLeft={2} justify="center">
                <Heading size="sm">{elt.name}</Heading>
                {elt.job && <Text fontStyle="italic">{elt.job}</Text>}
              </Stack>
            </Flex>
            {/* {category === "Demandes" && (
              <Button variant="primary">Confirmer</Button>
            )}
            {category === "Partenaires" && (
              <Button variant="outline">Retirer</Button>
            )} */}
          </ClickableFlex>
        ))}
      </Stack>
    );
  }
  return (
    <>
      <Button flexDir="column" onClick={() => (length > 0 ? onOpen() : null)}>
        <Heading size="md">{length}</Heading>
        <Text fontSize="xs">{category}</Text>
        {userId === currentUser._id &&
          category === "Demandes" &&
          newFriendRequest > 0 && (
            <Badge
              position="absolute"
              bgColor="red"
              right="-10px"
              top={0}
              lineHeight={5}
            >
              {newFriendRequest}
            </Badge>
          )}
        {userId === currentUser._id &&
          category === "Partenaires" &&
          newFriendAccepted > 0 && (
            <Badge
              position="absolute"
              bgColor="red"
              right={0}
              top={0}
              lineHeight={5}
            >
              {newFriendAccepted}
            </Badge>
          )}
      </Button>

      <Drawer
        onOpen={onOpen}
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent maxH="75vh">
          <DrawerCloseButton />
          <DrawerHeader textAlign="center" fontSize="md" fontWeight="bold">
            {category}
          </DrawerHeader>
          <DrawerBody paddingX={0}>{display}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RelationList;
