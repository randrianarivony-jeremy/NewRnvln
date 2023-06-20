import { Button, Flex } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { people, personAdd } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { currentUserContext } from "../../../Controler/App";
import {
  useAddFriendMutation,
  useCancelFriendInvitationMutation,
  useConfirmFriendRequestMutation,
  usePullFriendMutation,
} from "../../../Controler/Redux/Features/userSlice";
import { userContext } from "../UserProfile";

const FriendHandler = () => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const { user, setUser } = useContext(userContext);
  const { userId } = useParams();
  const [friend, setFriend] = useState("none");
  const [subscribed, setSubscribed] = useState(false);
  const [addFriend, { isSuccess: AFIsSuccess, isLoading: AFIsLoading }] =
    useAddFriendMutation();
  const [pullFriend, { isSuccess: PFIsSuccess, isLoading: PFIsLoading }] =
    usePullFriendMutation();
  const [
    cancelFriendInvitation,
    { isSuccess: CFIIsSuccess, isLoading: CFIIsLoading },
  ] = useCancelFriendInvitationMutation();
  const [
    confirmFriendRequest,
    { isSuccess: CFRIsSuccess, isLoading: CFRIsLoading },
  ] = useConfirmFriendRequestMutation();

  useEffect(() => {
    if (currentUser.subscriptions.includes(userId)) setSubscribed(true);

    if (currentUser.friends.includes(userId)) setFriend("friend");
    else {
      if (currentUser.friendRequest.includes(userId)) setFriend("request");
      else {
        if (currentUser.friendInvitation.includes(userId))
          setFriend("invitation");
        else setFriend("none");
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (AFIsSuccess) {
      setCurrentUser({
        ...currentUser,
        friendInvitation: [...currentUser.friendInvitation, userId],
      });
    }
  }, [AFIsLoading]);

  useEffect(() => {
    if (PFIsSuccess) {
      setCurrentUser({
        ...currentUser,
        friends: currentUser.friends.filter((elt) => elt !== userId),
      });
      setUser({
        ...user,
        friends: user.friends.filter((elt) => elt !== currentUser._id),
      });
    }
  }, [PFIsLoading]);

  useEffect(() => {
    if (CFIIsSuccess) {
      console.log("success");
      setCurrentUser({
        ...currentUser,
        friendInvitation: currentUser.friendInvitation.filter(
          (elt) => elt !== userId
        ),
      });
    }
  }, [CFIIsLoading]);

  useEffect(() => {
    if (CFRIsSuccess) {
      setCurrentUser({
        ...currentUser,
        friendRequest: currentUser.friendRequest.filter(
          (elt) => elt !== userId
        ),
        friends: [...currentUser.friends, userId],
      });
      setUser({
        ...user,
        friends: [...user.friends, currentUser._id],
      });
    }
  }, [CFRIsLoading]);

  return (
    // prettier-ignore
    <>
      {friend === "none" ? (
        <Button isLoading={AFIsLoading} width="100%" variant={subscribed ? "primary" : 'solid'}
        rightIcon={
          <IonIcon icon={personAdd} />}
          onClick={() => (currentUser._id === userId ? null : addFriend({ to: userId, from: currentUser._id }))}
        >
          Ajouter
        </Button>
      ) : friend === "friend" ? (
        <Button isLoading={PFIsLoading} width="100%" variant="solid"
        rightIcon={
          <IonIcon icon={people} />}
          onClick={() => (currentUser._id === userId ? null : pullFriend({ to: userId, from: currentUser._id }))}
        >
          Amis
        </Button>
      ) : friend === "request" ? (
        <Button isLoading={CFRIsLoading} width="100%" variant="primary"
        rightIcon={
          <IonIcon icon={personAdd} />}
          onClick={() => (currentUser._id === userId ? null : confirmFriendRequest({ to: userId, from: currentUser._id }))}
        >
          Confirmer
        </Button>
      ) : (
        <Button isLoading={CFIIsLoading} width="100%" variant="solid"
        rightIcon={<Flex className="bi-person-check"></Flex>}
          onClick={() => (currentUser._id === userId ? null : cancelFriendInvitation({ to: userId, from: currentUser._id }))}
        >
          Invitation envoyée
        </Button>
      )}
    </>
  );
};

export default FriendHandler;
