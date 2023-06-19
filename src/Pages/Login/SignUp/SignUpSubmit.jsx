import { Button, HStack, Input } from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { currentUserContext } from "../../../Controler/App";
import { storage } from "../../../Controler/firebase.config";
import {
  useInitiateMutation,
  useSignUpMutation,
} from "../../../Controler/Redux/Features/authSlice";
import { signUpContext } from "../Login";
import AuthSlide from "./AuthSlide";

const SignUpSubmit = ({ swiper }) => {
  // prettier-ignore
  let {name,email,setInvalidEmail,phoneNumber,password,confirmPassword,setPasswordError,picture,job,address,} = useContext(signUpContext);
  let { currentUser, setCurrentUser } = useContext(currentUserContext);
  const navigate = useNavigate();
  const submitRef = useRef();
  const [signUp, { isSuccess: signUpSuccess, isError: signUpErrorEvent }] =
    useSignUpMutation();
  const [initiate, { data, isSuccess, isLoading, isError }] =
    useInitiateMutation();
  const [submitting, setSubmitting] = useState(false);

  const passwordChecking = (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      setPasswordError(true);
    } else {
      if (
        email.current !== null &&
        email.current !== undefined &&
        !isEmail(email.current.value)
      ) {
        setInvalidEmail(true);
      } else {
        setSubmitting(true);
        if (picture.current !== undefined) storePicture();
        else
          signUp({
            name: name.current.value,
            email:
              phoneNumber.current !== null
                ? phoneNumber.current.value
                : email.current.value,
            password: password.current.value,
            job: job.current.value,
            address: address.current.value,
            picture: picture.current,
          });
      }
    }
  };

  const storePicture = () => {
    const fileName = new Date().getTime();
    const storageRef = ref(storage, "profile/picture/" + fileName);
    uploadBytes(storageRef, picture.current).then((snapshot) =>
      getDownloadURL(snapshot.ref).then((url) => {
        picture.current = url;
        signUp({
          name: name.current.value,
          email:
            phoneNumber.current !== null
              ? phoneNumber.current.value
              : email.current.value,
          password: password.current.value,
          job: job.current.value,
          address: address.current.value,
          picture: picture.current,
        });
      })
    );
  };

  useEffect(() => {
    if (isError || signUpErrorEvent) {
      setSubmitting(false);
    }
  }, [isError, signUpErrorEvent]);

  useEffect(() => {
    if (signUpSuccess) {
      initiate();
    }
  }, [signUpSuccess]);

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
