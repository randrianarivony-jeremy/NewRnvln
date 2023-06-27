// prettier-ignore
import { Avatar, Box, Button, Checkbox, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Image, Input, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUserContext } from "../../../Controler/App";
import {
  useFetchUserQuery,
  useSubscribeMutation
} from "../../../Controler/Redux/Features/userSlice";
import { userContext } from "../UserProfile";
import Unsubscribe from "./Unsubscribe";

const Subscribe = () => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const { friendInvitation, friendRequest, wallet } = useFetchUserQuery(
    currentUser._id,
    {
      selectFromResult: ({ data }) => ({
        friendInvitation: data?.friendInvitation,
        friendRequest: data?.friendRequest,
        wallet: data?.wallet,
      }),
    }
  );
  const [subscribe, { isLoading, isSuccess, isError, error }] =
    useSubscribeMutation();

  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    onOpen: openUnsubscribeModal,
    isOpen: unsubscribeModal,
    onClose: closeUnsubscribeModal,
  } = useDisclosure();
  let currentDate = new Date();
  const [passwordErr, setPasswordErr] = useState(false);
  const { user, setUser } = useContext(userContext);
  const passwordRef = useRef();
  const submitControl = useRef();
  const toast = useToast();
  const [subscribed, setSubscribed] = useState(false);
  const [friend, setFriend] = useState("none");

  const navigate = useNavigate();

  const handleDateFormat = () => {
    return currentDate.toLocaleString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const thirtyDaysFromNow = () => {
    currentDate.setDate(currentDate.getDate() + 30);
    return currentDate.toLocaleString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  useEffect(() => {
    if (currentUser.subscriptions.includes(user._id)) setSubscribed(true);
    else setSubscribed(false);

    if (currentUser.friends.includes(user._id)) setFriend("friend");
    else {
      if (friendRequest.includes(user._id)) setFriend("request");
      else {
        if (friendInvitation.includes(user._id)) setFriend("invitation");
        else setFriend("none");
      }
    }
  }, [currentUser, user]);

  useEffect(() => {
    if (isSuccess) {
      setCurrentUser({
        ...currentUser,
        subscriptions: [...currentUser.subscriptions, user._id],
      });
      setUser({
        ...user,
        subscribers: [...user.subscribers, currentUser._id],
      });
      onClose();
      toast({
        title: "Abonnement réussi",
        description: `Félicitation ! Votre abonnement à ${user.name} est réussi`,
        duration: 5000,
        isClosable: true,
        position: "top",
        status: "success",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (error.status === 403) {
        toast({
          title: "Expiration",
          description:
            "Vous avez atteint un mois de connexion. Veillez vous reconnecter",
          status: "info",
          position: "bottom",
          duration: 5000,
          isClosable: true,
        });
        navigate("/login");
      } else if (error.data.message === "Mot de passe incorrect")
        setPasswordErr(true);
      else if (error.data.message === "insufficient") {
        onClose();
        toast({
          title: "Abonnement échoué",
          description: "Portefeuille insuffisante",
          duration: 5000,
          isClosable: true,
          position: "bottom",
          status: "error",
        });
      } else {
        onClose();
        toast({
          title: "Abonnement échoué",
          description:
            "Une erreur est survenue. Veuillez réessayer ultérieurement",
          duration: 5000,
          isClosable: true,
          position: "bottom",
          status: "error",
        });
      }
    }
  }, [isError]);

  return (
    <>
      <Button
        width="100%"
        variant={
          !subscribed && (friend === "none" || friend === "invitation")
            ? "primary"
            : "solid"
        }
        onClick={() => (subscribed ? openUnsubscribeModal() : onOpen())}
      >
        {/* {subscribed ? "Abonné" : "S'abonner"} */}
        {subscribed ? "Abonné" : `S'abonner ${user.fees}kA`}
      </Button>

      <Unsubscribe
        isOpen={unsubscribeModal}
        onOpen={openUnsubscribeModal}
        onClose={closeUnsubscribeModal}
      />
      <Drawer
        onOpen={onOpen}
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent maxH="90%">
          <DrawerCloseButton />
          <DrawerHeader textAlign="center" fontSize="sm">
            S'abonner à
          </DrawerHeader>
          <DrawerBody paddingX={3}>
            <Stack spacing={5}>
              <Flex>
                {user.picture ? (
                  <Image
                    src={user.picture}
                    alt="profilepic"
                    boxSize={12}
                    rounded="full"
                    objectFit="cover"
                  />
                ) : (
                  <Avatar size="md" />
                )}
                <Stack spacing={0} marginLeft={2} justify="center">
                  <Heading size="sm">{user.name}</Heading>
                  {user.job !== "" && (
                    <Text fontStyle="italic">{user.job}</Text>
                  )}
                </Stack>
              </Flex>
              <Text>
                Frais d'abonnement :{" "}
                <span style={{ fontSize: "20px", fontWeight: "500" }}>
                  {user.fees}
                </span>{" "}
                kAr
              </Text>
              <Text>
                Votre portefeuille actuelle :{" "}
                <span style={{ fontSize: "20px", fontWeight: "500" }}>
                  {wallet}
                </span>{" "}
                kAr
              </Text>
              <Box>
                <Text
                  width="90%"
                  margin="auto"
                  bgColor="info"
                  rounded="md"
                  paddingX={3}
                  paddingY={2}
                  fontWeight="normal"
                >
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {user.fees}
                  </span>{" "}
                  kAr sera déduit de votre portefeuille. Cet abonnement vous
                  permettra de voir tous les contenus publiés par{" "}
                  <span style={{ fontWeight: "bold" }}>{user.name}</span>, pour
                  une période de 30 jours à compter de ce jour, le{" "}
                  {handleDateFormat()}
                </Text>
              </Box>
              <Text>Fin de l'abonnement: {thirtyDaysFromNow()}</Text>
              <Checkbox colorScheme="green">
                Se réabonner automatiquement
              </Checkbox>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  subscribe({
                    id_user: user._id,
                    password: passwordRef.current.value,
                  });
                }}
              >
                <FormControl isInvalid={passwordErr}>
                  <FormLabel>
                    Pour confirmer votre abonnement, entrez votre mot de passe :
                  </FormLabel>
                  <Input
                    ref={passwordRef}
                    type="password"
                    isRequired
                    onChange={() => setPasswordErr(false)}
                  />
                  <FormErrorMessage fontStyle="italic">
                    Mot de passe incorrect
                  </FormErrorMessage>
                </FormControl>
                <Input ref={submitControl} type="submit" display="none" />
              </form>
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <HStack>
              <Button width="100%" onClick={onClose}>
                Annuler
              </Button>
              <Button
                isLoading={isLoading}
                variant="primary"
                width="100%"
                onClick={() => submitControl.current.click()}
              >
                Confirmer
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Subscribe;
