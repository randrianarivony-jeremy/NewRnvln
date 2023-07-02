// prettier-ignore
import {Button,Drawer,DrawerCloseButton,DrawerContent,DrawerFooter,DrawerHeader,FormControl,FormErrorMessage,FormLabel,HStack,Input,Stack,useColorModeValue,useToast,} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUserContext } from "../../Controler/App";
import {
  useChangeFeesMutation,
  useFetchUserQuery,
} from "../../Controler/Redux/Features/userSlice";

const ChangeFees = ({ onOpen, onClose, isOpen }) => {
  const { currentUser } = useContext(currentUserContext);
  const { fees } = useFetchUserQuery(currentUser._id, {
    selectFromResult: ({ data }) => ({
      fees: data?.fees,
    }),
  });
  const [passwordErr, setPasswordErr] = useState(false);
  const submitControl = useRef();
  const inputRef = useRef();
  const bg = useColorModeValue("white", "dark.50");
  const passwordRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const [changeFees, { isSuccess, isLoading, isError, error, data }] =
    useChangeFeesMutation();

  useEffect(() => {
    if (isSuccess) {
      onClose();
      navigate(-1);
      toast({
        title: "Changement réussi",
        description:
          "La modification de votre frais d'abonnement est terminée avec succès",
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
            "La modification de votre frais d'abonnement a malheureusement échoué. Veuillez réessayer ultérieurement",
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
        <DrawerHeader paddingX={3}>Frais d'abonnement</DrawerHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            changeFees({
              userId: currentUser._id,
              fees: inputRef.current.value,
              password: passwordRef.current.value,
            });
          }}
        >
          <Stack spacing={5} marginX={3}>
            <FormControl>
              <FormLabel>Nouvelle montant :</FormLabel>
              <Input
                type="number"
                ref={inputRef}
                defaultValue={fees}
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

export default ChangeFees;
