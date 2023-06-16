import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { eye, eyeOffOutline } from "ionicons/icons";
import React, { useContext, useState } from "react";
import { signUpContext } from "../Login";

const AuthSlide = () => {
  const [usePhoneNumber, setUsePhoneNumber] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const {
    phoneNumber,
    email,
    invalidEmail,
    setInvalidEmail,
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
            ref={phoneNumber}
            type="number"
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
            ref={email}
            type="email"
            isRequired
            placeholder="Adresse email"
            onChange={() => setInvalidEmail(false)}
          />
          <FormErrorMessage>Email invalide !</FormErrorMessage>
        </FormControl>
      )}
      <FormControl isInvalid={passwordError}>
        <FormLabel>Entrez votre mot de passe :</FormLabel>
        {/* <Input
            ref={password} isRequired
            onChange={() => setPasswordError(false)}
            placeholder="Mot de passe"
            type="password"
          /> */}
        <InputGroup>
          <InputRightElement
            cursor="pointer"
            onClick={() => setShowPwd(!showPwd)}
            children={<IonIcon icon={showPwd ? eye : eyeOffOutline} />}
          />
          <Input
            ref={password}
            type={showPwd ? "text" : "password"}
            isRequired
            onChange={() => setPasswordError(false)}
            placeholder="Mot de passe"
          />
        </InputGroup>
      </FormControl>
      <FormControl isInvalid={passwordError}>
        <FormLabel>Confirmer votre mot de passe :</FormLabel>
        {/* <Input
            ref={confirmPassword}
            placeholder="Mot de passe"
            isRequired
            type="password"
            onChange={() => setPasswordError(false)}
          /> */}
        <InputGroup>
          <InputRightElement
            cursor="pointer"
            onClick={() => setShowPwd(!showPwd)}
            children={<IonIcon icon={showPwd ? eye : eyeOffOutline} />}
          />
          <Input
            ref={confirmPassword}
            type={showPwd ? "text" : "password"}
            placeholder="Mot de passe"
            isRequired
            onChange={() => setPasswordError(false)}
          />
        </InputGroup>
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
