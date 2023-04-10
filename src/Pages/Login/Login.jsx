import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Login = () => {
    const [signin,setSignin]=useState(true);
    return (
        <Box height='100%' className='login'>
            {signin ? <SignIn setSignin={setSignin}/> : <SignUp setSignin={setSignin}/>}
        </Box>
    );
};

export default Login;