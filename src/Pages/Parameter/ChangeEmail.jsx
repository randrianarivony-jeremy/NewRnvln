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
import {
  useChangeEmailMutation,
  useFetchUserQuery,
} from "../../Controler/Redux/Features/userSlice";

const ChangeEmail = ({ onOpen, onClose, isOpen }) => {
  const { currentUser } = useContext(currentUserContext);
  const { email } = useFetchUserQuery(currentUser._id, {
    selectFromResult: ({ data }) => ({
      email: data?.email,
    }),
  });
  const [passwordErr, setPasswordErr] = useState(false);
  const submitControl = useRef();
  const inputRef = useRef();
  const bg = useColorModeValue("white", "dark.50");
  const passwordRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const [changeEmail, { isSuccess, isLoading, isError, error, data }] =
    useChangeEmailMutation();

  useEffect(() => {
    if (isSuccess) {
      onClose();
      navigate(-1);
      toast({
        title: "Changement réussi",
        description:
          "La modification de votre adresse email est terminée avec succès",
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
            "La modification de votre adresse email a malheureusement échoué. Veuillez réessayer ultérieurement",
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
        <DrawerHeader paddingX={3}>Adresse email ou numéro mobile</DrawerHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            changeEmail({
              userId: currentUser._id,
              email: inputRef.current.value,
              password: passwordRef.current.value,
            });
          }}
        >
          <Stack spacing={5} marginX={3}>
            <FormControl>
              <FormLabel>Nouvelle adresse email/numéro téléphone :</FormLabel>
              <Input
                type="text"
                ref={inputRef}
                defaultValue={email}
                isRequired
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

export default ChangeEmail;
