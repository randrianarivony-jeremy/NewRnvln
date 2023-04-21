import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUserContext } from "../../Controler/App";

const DisableSubscription = ({ onOpen, onClose, isOpen }) => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const [submitting, setSubmitting] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const submitControl = useRef();
  const inputRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();

  const changeFees = async (e) => {
    e.preventDefault();
    await axios
      .put(
        process.env.REACT_APP_API_URL +
          "/api/user/subscription/" +
          currentUser._id,
        {
          enabled: false,
          password: passwordRef.current.value,
        }
      )
      .then(
        (res) => {
          setSubmitting(false);
          setCurrentUser({
            ...currentUser,
            subscription: res.data.subscription,
          });
          onClose();
          navigate(-1);
          toast({
            title: "Désactivation effectuée",
            description:
              "La désactivation de l'abonnement à votre compte est terminée avec succès",
            duration: 5000,
            isClosable: true,
            position: "top",
            status: "success",
          });
        },
        (err) => {
          setSubmitting(false);
          if (err.response.data === "Mot de passe incorrect")
            setPasswordErr(true);
          else {
            onClose();
            toast({
              title: "Désactivation échouée",
              description:
                "La désactivation de l'abonnement à votre compte a malheureusement échoué. Veuillez réessayer ultérieurement",
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
    <Drawer size="full" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader paddingX={3}>Montant d'abonnement</DrawerHeader>
        <form onSubmit={changeFees}>
          <Stack spacing={5} marginX={3}>
            <Text rounded='md' border='1px solid' paddingX={3} paddingY={2}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
              nam ratione nobis est adipisci distinctio laboriosam, vitae
              molestiae enim necessitatibus, soluta tempora quisquam quasi
              fugit. Nihil in esse omnis quidem, et consequatur sit assumenda
            </Text>
            <FormControl isInvalid={passwordErr}>
              <FormLabel>Confirmer la désactivation avec votre mot de passe :</FormLabel>
              <Input
                ref={passwordRef}
                type="password"
                isRequired
                onChange={() => setPasswordErr(false)}
              />
              <FormErrorMessage>Mot de passe incorrect</FormErrorMessage>
            </FormControl>
            <Input ref={submitControl} type="submit" display="none" />
          </Stack>
        </form>
        <DrawerFooter paddingX={3}>
          <Button onClick={onClose} width="100%">
            Annuler
          </Button>
          <Button
            width="100%"
            isLoading={submitting}
            variant="outline"
            onClick={() => submitControl.current.click()}
          >
            Désactiver
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DisableSubscription;
