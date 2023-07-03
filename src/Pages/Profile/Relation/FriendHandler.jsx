import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { people, personAdd } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { currentUserContext } from "../../../Controler/App";
import { useFetchSubscriptionsQuery } from "../../../Controler/Redux/Features/subscriSlice";
import {
  useAddFriendMutation,
  useCancelFriendInvitationMutation,
  useConfirmFriendRequestMutation,
  useFetchUserQuery,
  usePullFriendMutation,
  userSlice,
} from "../../../Controler/Redux/Features/userSlice";

const FriendHandler = () => {
  const { userId } = useParams();
  const { data: user } = userSlice.endpoints.fetchUser.useQueryState(userId);
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const { friendInvitation, friendRequest, friends } = useFetchUserQuery(
    currentUser._id,
    {
      selectFromResult: ({ data }) => ({
        friendInvitation: data?.friendInvitation,
        friendRequest: data?.friendRequest,
        friends: data?.friends,
      }),
    }
  );
  const { isSuccess: subscriptionsSuccess, data: subscriptions } =
    useFetchSubscriptionsQuery({ userId: currentUser._id, details: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("white", "dark.50");
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
    if (friends.includes(userId)) setFriend("friend");
    else {
      if (friendRequest.includes(userId)) setFriend("request");
      else {
        if (friendInvitation.includes(userId)) setFriend("invitation");
        else setFriend("none");
      }
    }
  }, [friendInvitation, friendRequest, friends]);

  useEffect(() => {
    if (subscriptionsSuccess && subscriptions.includes(userId))
      setSubscribed(true);
    else setSubscribed(false);
  }, [subscriptions]);

  useEffect(() => {
    if (AFIsSuccess) {
      setCurrentUser({
        ...currentUser,
        friendInvitation: [...friendInvitation, userId],
      });
    }
  }, [AFIsLoading]);

  useEffect(() => {
    if (PFIsSuccess) {
      setCurrentUser({
        ...currentUser,
        friends: currentUser.friends.filter((elt) => elt !== userId),
      });
      // setUser({
      //   ...user,
      //   friends: user.friends.filter((elt) => elt !== currentUser._id),
      // });
    }
  }, [PFIsLoading]);

  useEffect(() => {
    if (CFIIsSuccess) {
      setCurrentUser({
        ...currentUser,
        friendInvitation: friendInvitation.filter((elt) => elt !== userId),
      });
    }
  }, [CFIIsLoading]);

  useEffect(() => {
    if (CFRIsSuccess) {
      setCurrentUser({
        ...currentUser,
        friendRequest: friendRequest.filter((elt) => elt !== userId),
        friends: [...currentUser.friends, userId],
      });
      // setUser({
      //   ...user,
      //   friends: [...user.friends, currentUser._id],
      // });
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
          onClick={() => (currentUser._id === userId ? null : onOpen())}
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
      <Modal isCentered onOpen={onOpen} onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent bg={bg}>
        <ModalHeader>Retirer</ModalHeader>
        <ModalBody>Voulez vous vraiment retirer {user.name} de vos partenaires ?</ModalBody>
        <ModalFooter>
            <Button
              variant="dissuasive"
              onClick={() => {
                pullFriend({ to: userId, from: currentUser._id })
                onClose();
              }}
            >
              Retirer
            </Button>
            <Button onClick={onClose}>Annuler</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  );
};

export default FriendHandler;
