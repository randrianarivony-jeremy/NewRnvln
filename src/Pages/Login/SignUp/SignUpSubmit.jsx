import { Button, HStack, Input } from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { currentUserContext } from "../../../Controler/App";
import { storage } from "../../../Controler/firebase.config";
import { useSignUpMutation } from "../../../Controler/Redux/Features/authSlice";
import { signUpContext } from "../Login";
import AuthSlide from "./AuthSlide";

const SignUpSubmit = ({ swiper }) => {
  // prettier-ignore
  let {name,email,setInvalidEmail,phoneNumber,password,confirmPassword,setPasswordError,picture,job,address,} = useContext(signUpContext);
  let { setCurrentUser } = useContext(currentUserContext);
  const navigate = useNavigate();
  const submitRef = useRef();
  const [signUp, { isSuccess, data }] = useSignUpMutation();
  const [submitting, setSubmitting] = useState(false);

  const passwordChecking = (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      setPasswordError(true);
      setSubmitting(false);
    } else {
      setSubmitting(true);
      if (
        email.current !== null &&
        email.current !== undefined &&
        !isEmail(email.current.value)
      ) {
        setInvalidEmail(true);
        setSubmitting(false);
      } else {
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
    if (isSuccess) {
      setCurrentUser(data.user);
      navigate("/");
    }
  }, [isSuccess]);

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
