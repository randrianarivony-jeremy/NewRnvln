import {Box,Button,Flex,Heading,Image,Stack,Text,} from "@chakra-ui/react";
import React, { useState } from "react";
import logo from "../../../Assets/logo.svg";
import { useNavigate } from "react-router-dom";
import SignUpSliders from "./SignUpSliders";
import PaginationSignUpSlide from "./PaginationSignUpSlide";
import { Scroll } from "../../../Styles/Theme";

const SignUp = ({ setSignin }) => {
  const navigate = useNavigate();
  const [activeIndex,setActiveIndex]=useState(0);
  
  return (
    <Stack className="signup" height="100%" width="100%" paddingX={3} paddingBottom={2}>
      <Box height="20%">
        <Button variant="float" className="bi-arrow-left"
          onClick={() => navigate(-1)}
        ></Button>
        <Image src={logo} alt="logo" width="80px" margin="auto" />
        <Heading size="md" textAlign="center" height={10}>
          Rejoindre Ranavalona
        </Heading>
      </Box>
      <Scroll height="60%">
        <SignUpSliders setActiveIndex={setActiveIndex}/>
      </Scroll>
      <Flex flexDir='column' justify="flex-end" height="20%">
        <PaginationSignUpSlide activeIndex={activeIndex}/>
        <Text textAlign="center" marginX="auto">
          Vous avez déjà un compte ?{" "}
          <Button variant="link" onClick={() => setSignin(true)}>
            Se connecter
          </Button>
        </Text>
      </Flex>
    </Stack>
  );
};

export default SignUp;
