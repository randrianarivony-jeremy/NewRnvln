import {Box,Button,Flex,Heading,Image,Stack,Text,} from "@chakra-ui/react";
import React, { useState } from "react";
import logo from "../../Assets/RANAVALONA.png";
import { useNavigate } from "react-router-dom";
import SignUpSliders from "./SignUpSliders";
import PaginationSignUpSlide from "./PaginationSignUpSlide";

const SignUp = ({ setSignin }) => {
  const navigate = useNavigate();
  const [activeIndex,setActiveIndex]=useState(0);
  
  return (
    <Stack className="signup" height="100%" width="100%" padding="10px 20px">
      <Box height="25%">
        <Button variant="float" className="bi-arrow-left"
          onClick={() => navigate(-1)}
        ></Button>
        <Image src={logo} alt="logo" width="100px" margin="auto" />
        <Heading size="md" textAlign="center" height={10}>
          Rejoindre Ranavalona
        </Heading>
      </Box>
      <Box height="50%">
        <SignUpSliders setActiveIndex={setActiveIndex}/>
      </Box>
      <Flex flexDir='column' justify="flex-end" height="25%">
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
