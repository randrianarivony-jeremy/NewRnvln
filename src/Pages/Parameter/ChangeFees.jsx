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
  import axios from "axios";
  import React, { useContext, useRef, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { currentUserContext } from "../../Controler/App";
  
  const ChangeFees = ({ onOpen, onClose, isOpen }) => {
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
          process.env.REACT_APP_API_URL + "/api/user/fees/" + currentUser._id,
          {
            fees: inputRef.current.value,
            password: passwordRef.current.value,
          }
        )
        .then(
          (res) => {
            setSubmitting(false);
              setCurrentUser({ ...currentUser, fees: res.data.fees });
              onClose();
              navigate(-1);
              toast({
                  title: "Changement réussi",
                  description: "La modification de votre montant d'abonnement est terminée avec succès",
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
                description: "La modification de votre montant d'abonnement a malheureusement échoué. Veuillez réessayer ultérieurement",
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
              <FormControl>
                <FormLabel>Nouveau montant d'abonnement :</FormLabel>
                <Input
                  type="number"
                  ref={inputRef}
                  defaultValue={currentUser.fees}
                  isRequired
                  maxLength={5}
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
  
  export default ChangeFees;
  