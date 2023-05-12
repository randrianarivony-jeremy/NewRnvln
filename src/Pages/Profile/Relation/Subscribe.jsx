import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { apiCall, currentUserContext } from "../../../Controler/App";
import { userContext } from "../UserProfile";
import Unsubscribe from "./Unsubscribe";

const Subscribe = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { onOpen:openUnsubscribeModal, isOpen:unsubscribeModal, onClose:closeUnsubscribeModal } = useDisclosure();
  let currentDate = new Date();
  const [passwordErr, setPasswordErr] = useState(false);
  const { user, setUser } = useContext(userContext);
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const [submitting, setSubmitting] = useState(false);
  const passwordRef = useRef();
  const submitControl = useRef();
  const toast = useToast();
  const [subscribed, setSubscribed] = useState(false);

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

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await apiCall
      .patch(
        
          "user/subscribe/" +
          currentUser._id,
        { id_user: user._id, password: passwordRef.current.value }
      )
      .then(
        (res) => {
          setCurrentUser({
            ...currentUser,
            subscriptions: [...currentUser.subscriptions, user._id],
          });
          setUser({
            ...user,
            subscribers: [...user.subscribers, currentUser._id],
          });
          setSubmitting(false);
          onClose();
          toast({
            title: "Abonnement réussi",
            description: `Félicitation ! Votre abonnement à ${user.name} est réussi`,
            duration: 5000,
            isClosable: true,
            position: "top",
            status: "success",
          });
        },
        (err) => {
          console.log(err);
          if (err.response.data === "Mot de passe incorrect")
            setPasswordErr(true);
          if (err.response.data === "insufficient") {
            onClose();
            toast({
              title: "Abonnement échoué",
              description: "Portefeuille insuffisante",
              duration: 5000,
              isClosable: true,
              position: "bottom",
              status: "error",
            });
          }

          setSubmitting(false);
        }
      );
  };

  useEffect(() => {
    if (currentUser.subscriptions.includes(user._id)) setSubscribed(true);
    else setSubscribed(false);
  }, [currentUser, user]);

  return (
    <>
      <Button
        width="100%"
        rounded='full'
        variant={subscribed ? "outline" : "cta"}
        onClick={()=>subscribed ? openUnsubscribeModal() : onOpen()}
      >
        {subscribed ? "Abonné" : "S'abonner"}
        {/* {subscribed ? "Abonné" : `S'abonner ${user.fees}kAr`} */}
      </Button>

      <Unsubscribe isOpen={unsubscribeModal} onOpen={openUnsubscribeModal} onClose={closeUnsubscribeModal}/>
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
                  {currentUser.wallet}
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
              <form onSubmit={handleSubscribe}>
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
                isLoading={submitting}
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
