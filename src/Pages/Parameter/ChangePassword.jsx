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
  HStack,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUserContext } from "../../Controler/App";
import { useChangePasswordMutation } from "../../Controler/Redux/Features/userSlice";

const ChangePassword = ({ onOpen, onClose, isOpen }) => {
  const { currentUser } = useContext(currentUserContext);
  const [passwordErr, setPasswordErr] = useState(false);
  const [samePasswordErr, setSamePasswordErr] = useState(false);
  const submitControl = useRef();
  const confirmPassword = useRef();
  const oldPassword = useRef();
  const password = useRef();
  const bg = useColorModeValue("white", "dark.50");
  const navigate = useNavigate();
  const toast = useToast();
  const [changePassword, { isSuccess, isLoading, isError, error }] =
    useChangePasswordMutation();

  const changePasswordHandler = (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      setSamePasswordErr(true);
    } else if (
      oldPassword.current.value === password.current.value ||
      oldPassword.current.value === confirmPassword.current.value
    )
      onClose();
    else
      changePassword({
        userId: currentUser._id,
        password: oldPassword.current.value,
        newPassword: password.current.value,
      });
  };
  useEffect(() => {
    if (isSuccess) {
      onClose();
      navigate(-1);
      toast({
        title: "Changement réussi",
        description:
          "La modification de votre mot de passe est terminée avec succès",
        duration: 5000,
        isClosable: true,
        position: "top",
        status: "success",
      });
    }
    if (isError) {
      if (error.data === "Mot de passe incorrect") setPasswordErr(true);
      else if (error.status === 403) {
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
      } else {
        onClose();
        toast({
          title: "Changement échoué",
          description:
            "La modification de votre mot de passe a malheureusement échoué. Veuillez réessayer ultérieurement",
          duration: 5000,
          isClosable: true,
          position: "bottom",
          status: "error",
        });
      }
    }
  }, [isSuccess, isLoading, isError]);

  return (
    <Drawer size="full" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <DrawerContent bgColor={bg}>
        <DrawerCloseButton />
        <DrawerHeader paddingX={3}>Changer de mot de passe</DrawerHeader>
        <form onSubmit={changePasswordHandler}>
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
          <HStack width={"100%"}>
            <Button onClick={onClose} width="100%">
              Annuler
            </Button>
            <Button
              width="100%"
              isLoading={isLoading}
              variant="solid"
              onClick={() => submitControl.current.click()}
            >
              Changer
            </Button>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ChangePassword;
