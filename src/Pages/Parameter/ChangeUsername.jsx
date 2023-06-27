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
import { useChangeNameMutation } from "../../Controler/Redux/Features/userSlice";

const ChangeUsername = ({ onOpen, onClose, isOpen }) => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const [passwordErr, setPasswordErr] = useState(false);
  const submitControl = useRef();
  const inputRef = useRef();
  const passwordRef = useRef();
  const bg = useColorModeValue("white", "dark.50");
  const navigate = useNavigate();
  const toast = useToast();
  const [changeName, { isSuccess, isLoading, isError, error, data }] =
    useChangeNameMutation();

  const changeUsername = async (e) => {
    e.preventDefault();
    changeName({
      userId: currentUser._id,
      name: inputRef.current.value,
      password: passwordRef.current.value,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setCurrentUser({ ...currentUser, name: data.name });
      onClose();
      navigate(-1);
      toast({
        title: "Changement réussi",
        description:
          "La modification de votre nom d'utilisateur est terminée avec succès",
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
            "La modification de votre nom d'utilisateur a malheureusement échoué. Veuillez réessayer ultérieurement",
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
        <DrawerHeader paddingX={3}>Changer de nom d'utilisateur</DrawerHeader>
        <form onSubmit={changeUsername}>
          <Stack spacing={5} marginX={3}>
            <FormControl>
              <FormLabel>Nouveau nom d'utilisateur :</FormLabel>
              <Input
                type="text"
                ref={inputRef}
                defaultValue={currentUser.name}
                isRequired
                maxLength={30}
              />
            </FormControl>
            <FormControl isInvalid={passwordErr}>
              <FormLabel>
                Confirmer le changement avec votre mot de passe :
              </FormLabel>
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

export default ChangeUsername;
