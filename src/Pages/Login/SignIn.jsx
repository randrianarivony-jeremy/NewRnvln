// prettier-ignore
import {Box,Button,Flex,FormControl,FormErrorMessage,Grid,GridItem,Heading,Image,Input,InputGroup,InputRightElement,Stack,Text,} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { arrowBack, eye, eyeOffOutline } from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/RANAVALONA.png";
import { currentUserContext } from "../../Controler/App";
import {
  useInitiateMutation,
  useLoginMutation,
} from "../../Controler/Redux/Features/authSlice";

const SignIn = ({ setSignin }) => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const submitRef = useRef();
  const [mailError, setMailError] = useState();
  const passwordRef = useRef();
  const [passwordError, setPasswordError] = useState();
  const [showPwd, setShowPwd] = useState(false);
  const [
    login,
    { error, isSuccess: loginSuccess, isError, isLoading: loginLoading },
  ] = useLoginMutation();
  const [initiate, { data, isSuccess, isLoading }] = useInitiateMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  useEffect(() => {
    setCurrentUser();
  }, []);

  useEffect(() => {
    if (isError) {
      if (error.status === 404) setMailError("Utilisateur inconnu");
      else if (error.status === 406) setPasswordError("Mot de passe incorrect");
      else if (error.status === 400) {
        setMailError("Veuillez compléter tous les champs");
        setPasswordError("Veuillez compléter tous les champs");
      }
    }
  }, [isError]);

  useEffect(() => {
    if (loginSuccess) {
      initiate();
    }
  }, [loginSuccess]);

  useEffect(() => {
    if (isSuccess) {
      setCurrentUser(data.user);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <Box
      className="signin"
      h="100%"
      width="100%"
      paddingX={3}
      paddingBottom={2}
    >
      <Grid templateRows="repeat(3, 3fr)" height="100%">
        <GridItem>
          <Button variant="float" onClick={() => navigate(-1)}>
            <IonIcon icon={arrowBack} />
          </Button>
          <Image src={logo} alt="logo" width="80px" margin="auto" />
          <Heading size="md" textAlign="center" height={10}>
            Connexion
          </Heading>
        </GridItem>
        <form onSubmit={handleSubmit}>
          <Stack justify="center">
            <FormControl isInvalid={mailError}>
              <Input
                ref={emailRef}
                type="text"
                isRequired
                placeholder="Téléphone ou Email"
                border={mailError && "2px solid red"}
                onChange={() => setMailError()}
              />
              <FormErrorMessage>{mailError}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={passwordError}>
              <InputGroup>
                <InputRightElement
                  cursor="pointer"
                  onClick={() => setShowPwd(!showPwd)}
                  children={<IonIcon icon={showPwd ? eye : eyeOffOutline} />}
                />
                <Input
                  type={showPwd ? "text" : "password"}
                  isRequired
                  ref={passwordRef}
                  placeholder="Mot de passe"
                  border={passwordError && "2px solid red"}
                  onChange={() => setPasswordError()}
                />
              </InputGroup>
              <FormErrorMessage>{passwordError}</FormErrorMessage>
            </FormControl>
            <Flex justify="flex-end">
              <Button variant="link" size="sm">
                Mot de passe oublié ?
              </Button>
            </Flex>
            <Button
              isLoading={loginLoading || isLoading}
              loadingText="Connexion"
              variant="primary"
              onClick={() => submitRef.current.click()}
            >
              Se connecter
            </Button>
          </Stack>
          <Input ref={submitRef} type="submit" display="none" />
        </form>
        <Flex alignItems="flex-end">
          <Text textAlign="center" marginX="auto">
            Vous n'avez pas encore un compte ?{" "}
            <Button variant="link" onClick={() => setSignin(false)}>
              S'inscrire
            </Button>
          </Text>
        </Flex>
      </Grid>
    </Box>
  );
};

export default SignIn;
