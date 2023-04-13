import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { signUpContext } from "../Login";

const AuthSlide = () => {
  const [usePhoneNumber, setUsePhoneNumber] = useState(true);
  const {
    phoneNumber,
    email,invalidEmail,setInvalidEmail,
    passwordError,
    setPasswordError,
    password,
    confirmPassword,
  } = useContext(signUpContext);

  const toggleEmailNumber = () => {
    setInvalidEmail(false);
    if (usePhoneNumber) phoneNumber.current.value = "";
    else email.current.value = "";
    setUsePhoneNumber(!usePhoneNumber);
  };

  return (
      <Stack>
        {usePhoneNumber ? (
          <FormControl>
            <FormLabel>Entrez votre numéro de mobile :</FormLabel>
            <Input
              ref={phoneNumber} type='number'
              isRequired
              placeholder="03* ** *** **"
              maxLength="10"
              minLength="10"
            />
          </FormControl>
        ) : (
          <FormControl isInvalid={invalidEmail}>
            <FormLabel>Entrez votre adresse email :</FormLabel>
            <Input
              ref={email} type='email'
              isRequired
              placeholder="Adresse email"
              onChange={()=>setInvalidEmail(false)}
            />
            <FormErrorMessage>Email invalide !</FormErrorMessage>
          </FormControl>
        )}
        <FormControl  isInvalid={passwordError}>
          <FormLabel>Entrez votre mot de passe :</FormLabel>
          <Input
            ref={password} isRequired
            onChange={() => setPasswordError(false)}
            placeholder="Mot de passe"
            type="password"
          />
        </FormControl>
        <FormControl isInvalid={passwordError}>
          <FormLabel>Confirmer votre mot de passe :</FormLabel>
          <Input
            ref={confirmPassword}
            placeholder="Mot de passe"
            isRequired
            type="password"
            onChange={() => setPasswordError(false)}
          />
          <FormErrorMessage>Mot de passe différent</FormErrorMessage>
        </FormControl>
        <Button onClick={toggleEmailNumber}>
          {usePhoneNumber
            ? "Utiliser une adresse email"
            : "Utiliser un numéro de téléphone"}
        </Button>
      </Stack>
  );
};

export default AuthSlide;
