import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/RANAVALONA.png";
import { apiCall, currentUserContext } from "../../Controler/App";
import { postSlice } from "../../Controler/Redux/Features/postSlice";

const SignIn = ({ setSignin }) => {
  const { setCurrentUser } = useContext(currentUserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const submitRef = useRef();
  const toast = useToast();
  const [mailError, setMailError] = useState();
  const passwordRef = useRef();
  const [passwordError, setPasswordError] = useState();
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await apiCall
      .post("auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then(
        (res) => {
          setCurrentUser(res.data);
          dispatch(
            postSlice.util.invalidateTags([{ type: "Post", id: "LIST" }])
          );
          setSubmitting(false);
          navigate("/");
        },
        (err) => {
          let error = err.response.data;
          if (err.response.data.includes("Email")) setMailError(error);
          else setPasswordError(error);
          setSubmitting(false);
        }
      );
  };

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
