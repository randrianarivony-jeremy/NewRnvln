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
  
  const ChangeEmail = ({ onOpen, onClose, isOpen }) => {
    const { currentUser, setCurrentUser } = useContext(currentUserContext);
    const [submitting, setSubmitting] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const submitControl = useRef();
    const inputRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const toast = useToast();
  
    const changeEmail = async (e) => {
      e.preventDefault();
      await apiCall
        .put(
           "user/email/" + currentUser._id,
          {
            email: inputRef.current.value,
            password: passwordRef.current.value,
          }
        )
        .then(
          (res) => {
            setSubmitting(false);
              setCurrentUser({ ...currentUser, name: res.data.name });
              onClose();
              navigate(-1);
              toast({
                  title: "Changement réussi",
                  description: "La modification de votre adresse email est terminée avec succès",
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
                description: "La modification de votre adresse email a malheureusement échoué. Veuillez réessayer ultérieurement",
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
          <DrawerHeader paddingX={3}>Adresse email ou numéro mobile</DrawerHeader>
          <form onSubmit={changeEmail}>
            <Stack spacing={5} marginX={3}>
              <FormControl>
                <FormLabel>Nouvelle adresse email/numéro téléphone :</FormLabel>
                <Input
                  type="text"
                  ref={inputRef}
                  defaultValue={currentUser.email}
                  isRequired
                  maxLength={30}
                />
              </FormControl>
              <FormControl isInvalid={passwordErr}>
                <FormLabel>Confirmer le changement avec votre mot de passe :</FormLabel>
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
  
  export default ChangeEmail;
  