import { Button, HStack, Input } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpContext } from "../Login";
import isEmail from "validator/lib/isEmail";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../Controler/firebase.config";
import AuthSlide from "./AuthSlide";
import { apiCall, currentUserContext } from "../../../Controler/App";

const SignUpSubmit = ({ swiper }) => {
  let {name,email,setInvalidEmail,phoneNumber,password,confirmPassword,setPasswordError,picture,job,address,} = useContext(signUpContext);
  let {setCurrentUser} = useContext(currentUserContext);
  const navigate = useNavigate();
  const submitRef = useRef();
  const [submitting, setSubmitting] = useState(false);

  const passwordChecking = (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value){
      setPasswordError(true);
      setSubmitting(false);
    }else {
      setSubmitting(true);
      if (
        email.current !== null &&
        email.current !== undefined &&
        !isEmail(email.current.value)
      ){
        setInvalidEmail(true);
        setSubmitting(false);
      }else {
        if (picture.current !== undefined) storePicture();
        else handleSubmit();
      }
    }
  };

  const storePicture = () => {
    const fileName = new Date().getTime();
    const storageRef = ref(storage, "profile/picture/" + fileName);
    uploadBytes(storageRef, picture.current).then((snapshot) =>
      getDownloadURL(snapshot.ref).then((url) => {
        picture.current = url;
        handleSubmit();
      })
    );
  };

  const handleSubmit = async () => {
    if (phoneNumber.current !== null) email.current = phoneNumber.current.value;
    else email.current = email.current.value;
    await apiCall
      .post(
         "auth/register",
        {
          name: name.current.value,
          email: email.current,
          password: password.current.value,
          job: job.current.value,
          address: address.current.value,
          picture: picture.current,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setSubmitting(false);
        setCurrentUser(res.data);
        navigate('/');
      },err=>{
        setSubmitting(false);
        console.log(err.response.data);
        // setEmailError(res.data.error.emailError);
        // setPasswordError(res.data.error.passwordError);
        // setSexError(res.data.error.sexError);
        // toast({
        //   title: "😕 OH OH !!!",
        //   status: "error",
        //   duration: 5000,
        //   isClosable: true,
        //   position: "bottom",
        // });
      });
  };

  return (
    <form
      onSubmit={passwordChecking}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <AuthSlide />
      <HStack marginTop={2}>
        <Button
          width="100%"
          variant="outline"
          onClick={() => swiper.slidePrev()}
        >
          Précédent
        </Button>
        <Button
          width="100%"
          variant="primary"
          isLoading={submitting}
          loadingText="Traitement"
          onClick={() => submitRef.current.click()}
        >
          Terminé
        </Button>
        <Input ref={submitRef} display="none" type="submit" />
      </HStack>
    </form>
  );
};

export default SignUpSubmit;
