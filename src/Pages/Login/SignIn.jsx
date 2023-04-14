import {Box,Button,Flex,FormControl,FormErrorMessage,Grid,GridItem,Heading,Image,Input,InputGroup,InputRightElement,Stack,Text, useToast,} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import logo from "../../Assets/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { currentUserContext } from "../../Controler/App";

const SignIn = ({ setSignin }) => {
  const { setCurrentUser } = useContext(currentUserContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const submitRef = useRef();
  const toast=useToast();
  const [mailError, setMailError] = useState();
  const passwordRef = useRef();
  const [passwordError, setPasswordError] = useState();
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/api/user/login",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        { withCredentials: true } //tsy mahazo cookie rah tsisy anio
      )
      .then(
        (res) => {
          console.log(res.data);
          setSubmitting(false);
          setCurrentUser(res.data);
          navigate("/");
          toast({
            title: `Manahoana ${res.data.name} a !`,
            description: 'Tongasoa',
            duration: 5000,
            isClosable: true,
            position: "top",
            status: "success",
          });
        },
        (err) => {
          let error = err.response.data;
          console.log(error);
          if (err.response.data.includes("Email")) setMailError(error);
          else setPasswordError(error);
          setSubmitting(false);
        }
      );
  };

  return (
    <Box
      className="signin"
      height="100%" minH='80vh'
      width="100%"
      paddingX={3}
      paddingBottom={2}
    >
      <Grid templateRows="repeat(3, 3fr)" height="100%">
        <GridItem>
          <Button
            variant="float"
            className="bi-arrow-left"
            onClick={() => navigate(-1)}
          ></Button>
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
                  as="button"
                  bgColor={showPwd ? "dark.0" : "transparent"}
                  onClick={() => setShowPwd(!showPwd)}
                  children={
                    <span
                      className={showPwd ? "bi-eye" : "bi-eye-slash"}
                    ></span>
                  }
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
              isLoading={submitting}
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
