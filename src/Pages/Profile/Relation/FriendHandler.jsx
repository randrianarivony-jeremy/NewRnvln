import { Button, Flex, useToast } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { people, personAdd } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiCall, currentUserContext } from "../../../Controler/App";
import {
  useAddFriendMutation,
  useCancelFriendInvitationMutation,
  useConfirmFriendRequestMutation,
  usePullFriendMutation,
} from "../../../Controler/Redux/Features/userSlice";

const FriendHandler = () => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const { userId } = useParams();
  const toast = useToast();
  const [friend, setFriend] = useState("none");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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

  // const addFriend = async () => {
  //   setSubmitting(true);
  //   await apiCall
  //     .patch("user/friend_invitation/", { to: userId, from: currentUser._id })
  //     .then(
  //       () => {
  //         setCurrentUser({
  //           ...currentUser,
  //           friendInvitation: [...currentUser.friendInvitation, userId],
  //         });
  //       },
  //       () => {
  //         toast({
  //           status: "error",
  //           duration: 5000,
  //           isClosable: true,
  //           title: "Error",
  //           description: "Une erreur est survenue",
  //         });
  //       }
  //     )
  //     .finally(() => setSubmitting(false));
  // };

  const confirmRequest = async () => {
    setSubmitting(true);
    await apiCall
      .patch("user/accept_friend/", { to: userId, from: currentUser._id })
      .then(
        () => {
          setCurrentUser({
            ...currentUser,
            friendRequest: currentUser.friendRequest.filter(
              (elt) => elt !== userId
            ),
            friends: [...currentUser.friends, userId],
          });
          setSubmitting(false);
        },
        () => {
          toast({
            status: "error",
            duration: 5000,
            isClosable: true,
            title: "Error",
            description: "Une erreur est survenue",
          });
        }
      )
      .finally(() => setSubmitting(false));
  };
  const cancelInvitation = async () => {
    setSubmitting(true);
    await apiCall
      .patch("user/cancel_invitation/", { to: userId, from: currentUser._id })
      .then(
        () => {
          setCurrentUser({
            ...currentUser,
            friendInvitation: currentUser.friendInvitation.filter(
              (elt) => elt !== userId
            ),
          });
          setSubmitting(false);
        },
        () => {
          toast({
            status: "error",
            duration: 5000,
            isClosable: true,
            title: "Error",
            description: "Une erreur est survenue",
          });
        }
      )
      .finally(() => setSubmitting(false));
  };

  // const pullFriend = async () => {
  //   setSubmitting(true);
  //   await apiCall
  //     .patch("user/pull_friend/", { to: userId, from: currentUser._id })
  //     .then(
  //       () => {
  //         setCurrentUser({
  //           ...currentUser,
  //           friends: currentUser.friends.filter((elt) => elt !== userId),
  //         });
  //         setSubmitting(false);
  //       },
  //       () => {
  //         toast({
  //           status: "error",
  //           duration: 5000,
  //           isClosable: true,
  //           title: "Error",
  //           description: "Une erreur est survenue",
  //         });
  //       }
  //     )
  //     .finally(() => setSubmitting(false));
  // };

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
    if (AFIsSuccess)
      setCurrentUser({
        ...currentUser,
        friendInvitation: [...currentUser.friendInvitation, userId],
      });
  }, [AFIsLoading]);

  useEffect(() => {
    if (PFIsSuccess)
      setCurrentUser({
        ...currentUser,
        friends: currentUser.friends.filter((elt) => elt !== userId),
      });
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
    if (CFRIsSuccess)
      setCurrentUser({
        ...currentUser,
        friendRequest: currentUser.friendRequest.filter(
          (elt) => elt !== userId
        ),
        friends: [...currentUser.friends, userId],
      });
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
