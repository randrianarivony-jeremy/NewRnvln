import {Box,Button,Flex,FormControl,FormErrorMessage,Grid,GridItem,Heading,Image,Input,InputGroup,InputRightElement,Stack,Text,} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import logo from "../../Assets/RANAVALONA.png";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setSignin }) => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const [mailError, setMailError] = useState();
  const passwordRef = useRef();
  const [passwordError, setPasswordError] = useState();
  const [showPwd, setShowPwd] = useState(false);
  // const greeting = (
  //   <Box className="ms-3">
  //     <p>Tongasoa indray 🥰</p>
  //     <p>Mahità izay iriana e 🔥</p>
  //   </Box>
  // );

  return (
    <Box className="signin" height="100%" width="100%" padding="10px 20px">
      <Grid templateRows="repeat(3, 3fr)" height="100%">
        <GridItem>
          <Button variant="float" className="bi-arrow-left"
            onClick={() => navigate(-1)}
          ></Button>
          <Image src={logo} alt="logo" width="100px" margin="auto" />
          <Heading size="md" textAlign="center" height={10}>
            Connexion
          </Heading>
        </GridItem>
        <Stack justify="center">
          <FormControl isRequired={true} isInvalid={mailError}>
            <Input ref={emailRef} placeholder="Téléphone ou Email" border={mailError && "2px solid red"}
              onChange={() => setMailError()}
            />
            <FormErrorMessage>{mailError}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={passwordError} isRequired={true}>
            <InputGroup>
              <InputRightElement
                as="button"
                bgColor={showPwd ? "dark.0" : "transparent"}
                onClick={() => setShowPwd(!showPwd)}
                children={<span className={showPwd ? "bi-eye" : "bi-eye-slash"}></span>}
              />
              <Input
                type={showPwd ? "text" : "password"}
                ref={passwordRef}
                placeholder="Mot de passe"
                border={passwordError && "2px solid red"}
                onChange={() => setPasswordError()}
              />
            </InputGroup>
            <FormErrorMessage>{passwordError}</FormErrorMessage>
          </FormControl>
          <Flex justify="flex-end">
            <Button variant="link" size='sm'>
              Mot de passe oublié ?
            </Button>
          </Flex>
          <Button
            variant="primary"
            onClick={() => (mailError || passwordError ? {} : navigate("/"))}
          >
            Se connecter
          </Button>
        </Stack>
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
