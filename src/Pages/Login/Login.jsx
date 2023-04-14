import { Box } from "@chakra-ui/react";
import React, { createContext, useRef, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp/SignUp";

export const signUpContext = createContext();
const Login = () => {
  const [signin, setSignin] = useState(true);
  const name = useRef();
  const email = useRef();
  const [invalidEmail,setInvalidEmail]=useState(false)
  const phoneNumber = useRef();
  const [passwordError, setPasswordError] = useState(false);
  const password = useRef();
  const confirmPassword = useRef();
  const job = useRef();
  const address = useRef();
  const picture = useRef();
  return (
    <Box height="100%" minH='450px' className="login">
      {signin ? (
        <SignIn setSignin={setSignin} />
      ) : (
        <signUpContext.Provider
          value={{name,email,phoneNumber,password,confirmPassword,passwordError,setPasswordError,job,address,picture,
            invalidEmail,setInvalidEmail}}
        >
          <SignUp setSignin={setSignin} />
        </signUpContext.Provider>
      )}
    </Box>
  );
};

export default Login;
