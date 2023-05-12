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
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall, currentUserContext } from "../../Controler/App";

const ChangePassword = ({ onOpen, onClose, isOpen }) => {
  const { currentUser } = useContext(currentUserContext);
  const [submitting, setSubmitting] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [samePasswordErr, setSamePasswordErr] = useState(false);
  const submitControl = useRef();
  const confirmPassword = useRef();
  const oldPassword = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const toast = useToast();

  const changePassword = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      setSamePasswordErr(true);
    } else {
      await apiCall
        .put(
          
            "user/password/" +
            currentUser._id,
          {
            password: oldPassword.current.value,
            newPassword: password.current.value,
          }
        )
        .then(
          () => {
            setSubmitting(false);
            onClose();
            navigate(-1);
            toast({
                title: "Changement réussi",
                description: "La modification de votre mot de passe est terminée avec succès",
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
                title: "Changement échoué",
                description: "La modification de votre mot de passe a malheureusement échoué. Veuillez réessayer ultérieurement",
                duration: 5000,
                isClosable: true,
                position: "bottom",
                status: "error",
              });
            }
          }
        );
    }
  };

  return (
    <Drawer size="full" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader paddingX={3}>Changer de mot de passe</DrawerHeader>
        <form onSubmit={changePassword}>
          <Stack spacing={3} marginX={3}>
            <FormControl isInvalid={passwordErr}>
              <FormLabel>Mot de passe actuel :</FormLabel>
              <Input
                type="password"
                ref={oldPassword}
                isRequired
                onChange={() => setPasswordErr(false)}
              />
            <FormErrorMessage>Mot de passe incorrect</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={samePasswordErr}>
              <FormLabel>Nouveau mot de passe :</FormLabel>
              <Input
                ref={password}
                type="password"
                isRequired
                onChange={() => setSamePasswordErr(false)}
              />
              <FormErrorMessage>Mot de passe différent</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={samePasswordErr}>
              <FormLabel>Confirmer votre nouveau mot de passe :</FormLabel>
              <Input
                ref={confirmPassword}
                type="password"
                isRequired
                onChange={() => setSamePasswordErr(false)}
              />
              <FormErrorMessage>Mot de passe différent</FormErrorMessage>
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
            variant="primary"
            onClick={() => submitControl.current.click()}
          >
            Changer
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ChangePassword;
