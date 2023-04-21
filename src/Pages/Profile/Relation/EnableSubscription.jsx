import {
  Button,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { currentUserContext } from "../../../Controler/App";

const EnableSubscription = () => {
  const [submitting, setSubmitting] = useState(false);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const initialFocus = useRef();
  const amountRef = useRef();
  const passwordRef = useRef();
  const toast = useToast();
  const [passwordErr, setPasswordErr] = useState(false);
  const submitControl = useRef();
  const { currentUser, setCurrentUser } = useContext(currentUserContext);

  const enableSubscription = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await axios
      .put(
        process.env.REACT_APP_API_URL +
          "/api/user/subscription/" +
          currentUser._id,
        {
          enabled: true,
          fees: amountRef.current.value,
          password: passwordRef.current.value,
        }
      )
      .then(
        (res) => {
          console.log(res.data)
          setSubmitting(false);
          setCurrentUser({ ...currentUser, subscription: true,fees:res.data.fees });
          onClose();
          toast({
            title: 'Abonnement activé',
            description: "L'abonnement à votre compte a été activé avec succès",
            duration: 5000,
            isClosable: true,
            position: "top",
            status: "success",
          });
        },
        (err) => {
          setSubmitting(false);
          if (err.response.data === "Mot de passe incorrect") setPasswordErr(true);
          else {
            onClose();
            toast({
              title: "Activation échoué",
              description: "L'activation de l'abonnement à votre compte a malheureusement échoué. Veuillez réessayer ultérieurement",
              duration: 5000,
              isClosable: true,
              position: "bottom",
              status: "error",
            });
          }
        }
      );
  };
  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        Activer l'abonnement
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpen={onOpen}
        placement="bottom"
        initialFocusRef={initialFocus}
      >
        <DrawerContent>
          <DrawerHeader>Activer l'abonnement</DrawerHeader>
          <Stack marginX={3} spacing={5}>
            <Text>
              Voulez-vous vraiment activer l'abonnement à votre compte ?
            </Text>
            <Text
              fontSize="sm"
              paddingX={3}
              paddingY={2}
              bgColor="info"
              rounded='md'
            >
              Activer l'abonnement vous permettra de ne montrer certains
              contenus qu'à vos abonnés. Ces abonnés devront payer
              mensuellement, à vous, une somme dont vous fixerez vous-même, pour
              pouvoir voir et réagir à vos contenus payants, et vous envoyer des
              messages privés.
            </Text>
            <form onSubmit={enableSubscription}>
            <Stack spacing={5}>
              <FormControl>
                <FormLabel>Montant :</FormLabel>
                <InputGroup>
                  <Input ref={amountRef} type="number" placeholder="10" isRequired/>
                  <InputRightAddon children="kAr" />
                </InputGroup>
                <FormHelperText>1000Ar = 1kA</FormHelperText>
                <Input ref={submitControl} type="submit" display="none" />
              </FormControl>

              <FormControl isInvalid={passwordErr}>
                <FormLabel>Confirmer l'activation avec votre mot de passe :</FormLabel>
                <Input
                  ref={passwordRef}
                  type="password"
                  isRequired
                  onChange={() => setPasswordErr(false)}
                />
                <FormErrorMessage>Mot de passe incorrect</FormErrorMessage>
              </FormControl>
            </Stack>
            </form>
          </Stack>
          <DrawerFooter>
            <Button ref={initialFocus} onClick={onClose}>
              Annuler
            </Button>
            <Button
              isLoading={submitting}
              variant="outline"
              onClick={() => submitControl.current.click()}
            >
              Activer
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default EnableSubscription;
