import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUserContext } from "../../../Controler/App";
import { useUnsubscribeMutation } from "../../../Controler/Redux/Features/userSlice";
import { userContext } from "../UserProfile";

const Unsubscribe = ({ onOpen, isOpen, onClose }) => {
  const { user, setUser } = useContext(userContext);
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const [unsubscribe, { isSuccess, isError, error, isLoading }] =
    useUnsubscribeMutation();
  const [submitting, setSubmitting] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const passwordRef = useRef();
  const submitControl = useRef();
  const toast = useToast();
  const navigate = useNavigate();

  // const stopSubscription = async (e) => {
  //   e.preventDefault();
  //   setSubmitting(true);
  //   await apiCall
  //     .patch(
  //         "user/unsubscribe/" +
  //         currentUser._id,
  //       { id_user: user._id, password: passwordRef.current.value }
  //     )
  //     .then(
  //       () => {
  //           setCurrentUser({...currentUser,subscriptions:currentUser.subscriptions.filter(elt=>elt!==user._id)});
  //           setUser({...user,subscribers:user.subscribers.filter(elt=>elt!==currentUser._id)})
  //         setSubmitting(false);
  //         onClose();
  //         toast({
  //           title: "Désabonnement effectué",
  //           description: `Vous n'êtes plus abonnés à ${user.name}`,
  //           duration: 5000,
  //           isClosable: true,
  //           position: "top",
  //           status: "info",
  //         });
  //       },
  //       (err) => {
  //         console.log(err);
  //         if (err.response.data === "Mot de passe incorrect") setPasswordErr(true);
  //         setSubmitting(false);
  //       }
  //     );
  // };

  useEffect(() => {
    if (isSuccess) {
      setCurrentUser({
        ...currentUser,
        subscriptions: currentUser.subscriptions.filter(
          (elt) => elt !== user._id
        ),
      });
      setUser({
        ...user,
        subscribers: user.subscribers.filter((elt) => elt !== currentUser._id),
      });
      setSubmitting(false);
      onClose();
      toast({
        title: "Désabonnement effectué",
        description: `Vous n'êtes plus abonnés à ${user.name}`,
        duration: 5000,
        isClosable: true,
        position: "top",
        status: "info",
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
      else {
        onClose();
        toast({
          title: "Désabonnement échoué",
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
    <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader paddingX={3}>Désabonnement</ModalHeader>
        <Stack paddingX={3} spacing={5}>
          <Text
            textAlign="center"
            rounded="md"
            paddingX={3}
            paddingY={2}
            border="1px solid"
          >
            Vous ne verrez plus les contenus payants que {user.name} publie
          </Text>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              unsubscribe({
                id_user: user._id,
                password: passwordRef.current.value,
              });
            }}
          >
            <FormControl isInvalid={passwordErr}>
              <FormLabel>
                Pour confirmer votre désabonnement, entrez votre mot de passe :
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
        <ModalFooter paddingX={3}>
          <Button onClick={onClose}>Annuler</Button>
          <Button
            variant="outline"
            isLoading={isLoading}
            onClick={() => submitControl.current.click()}
          >
            Me désabonner
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Unsubscribe;
