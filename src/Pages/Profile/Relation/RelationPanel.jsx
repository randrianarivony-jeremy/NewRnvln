import { Button, HStack, Skeleton, Stack } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { chatbox } from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorRender } from "../../../Component/Miscellanous";
import { currentUserContext } from "../../../Controler/App";
import {
  useFetchSubscribersQuery,
  useFetchSubscriptionsQuery,
} from "../../../Controler/Redux/Features/subscriSlice";
import { useFetchUserQuery } from "../../../Controler/Redux/Features/userSlice";
import FriendHandler from "./FriendHandler";
import Subscribe from "./Subscribe";

const RelationPanel = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(currentUserContext);
  const { userId } = useParams();
  const category = useRef("second");
  const {
    data: myUser,
    isSuccess: myUserSuccess,
    isLoading: myUserLoading,
    myUserIsError,
    myUserError,
  } = useFetchUserQuery(currentUser._id);
  const {
    isLoading: subscribersLoading,
    isError: subscribersIsError,
    error: subscribersError,
    isSuccess: subscribersSuccess,
    data: subscribers,
  } = useFetchSubscribersQuery({ userId, details: false });
  const {
    isLoading: subscriptionsLoading,
    isError: subscriptionsIsError,
    error: subscriptionsError,
    isSuccess: subscriptionsSuccess,
    data: subscriptions,
  } = useFetchSubscriptionsQuery({ userId, details: false });

  const [friend, setFriend] = useState("none");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (myUserSuccess) {
      if (myUser.friends.includes(userId)) {
        setFriend("friend");
        category.current = "main";
      } else if (myUser.friendRequest.includes(userId)) setFriend("request");
      else if (myUser.friendInvitation.includes(userId))
        setFriend("invitation");
      else setFriend("none");
    }
  }, [currentUser, myUser]);

  useEffect(() => {
    if (subscribersSuccess && subscribers.includes(userId)) {
      category.current = "main";
    }
  }, [currentUser, subscribers]);

  useEffect(() => {
    if (subscriptionsSuccess && subscriptions.includes(userId)) {
      setSubscribed(true);
      category.current = "main";
    }
    console.log("change");
  }, [currentUser, subscriptions]);

  if (myUserLoading || subscribersLoading || subscriptionsLoading)
    return (
      <HStack>
        <Skeleton height={10} width="50%" rounded="md" />
        <Skeleton height={10} width="50%" rounded="md" />
      </HStack>
    );

  if (myUserIsError)
    return <ErrorRender isError={myUserIsError} error={myUserError} />;
  if (subscriptionsIsError)
    return (
      <ErrorRender isError={subscriptionsIsError} error={subscriptionsError} />
    );
  if (subscribersIsError)
    return (
      <ErrorRender isError={subscribersIsError} error={subscribersError} />
    );

  if (subscribersSuccess && myUserSuccess && subscriptionsSuccess)
    return (
      <Stack>
        <HStack>
          {friend === "friend" && <FriendHandler />}
          <Button
            width={"100%"}
            variant={
              (friend === "invitation" && subscribed) || friend === "friend"
                ? "primary"
                : "solid"
            }
            leftIcon={<IonIcon icon={chatbox} />}
            onClick={() =>
              navigate("/chat/" + userId + "?category=" + category.current)
            }
          >
            Envoyer un message
          </Button>
        </HStack>
        {friend !== "friend" && (
          <HStack justify="space-around" width="100%">
            <FriendHandler />
            <Subscribe />
          </HStack>
        )}
      </Stack>
    );
};

export default RelationPanel;
