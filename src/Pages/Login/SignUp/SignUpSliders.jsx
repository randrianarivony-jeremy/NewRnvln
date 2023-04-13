import React, { useContext, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {FormControl,FormLabel,Input,Stack} from "@chakra-ui/react";
import SignUpSubmit from "./SignUpSubmit";
import ProfessionSlide from "./ProfessionSlide";
import ProfilePictureSlide from "./ProfilePictureSlide";
import { signUpContext } from "../Login";

const SignUpSliders = ({ setActiveIndex }) => {
  const signUpSwiperRef = useRef();
  const {name}=useContext(signUpContext);

  const handleNext=e=>{
    e.preventDefault();
    if (name.current.checkValidity()) signUpSwiperRef.current.swiper.slideNext()
  }

  return (
    <Stack justify="center" height="100%">
        <Swiper spaceBetween={10} allowTouchMove={true} ref={signUpSwiperRef} autoHeight={true} className='signup-swiper' onSlideChange={({ realIndex }) => setActiveIndex(realIndex)} >
          <SwiperSlide>
            <form onSubmit={handleNext}>
            <Stack>
              <FormControl>
                <FormLabel>Quel nom voulez-vous utiliser :</FormLabel>
                <Input ref={name} placeholder="Nom d'utilisateur"isRequired/>
              </FormControl>
              <Input as='button' type='submit' bgColor='bleu' fontWeight='semibold'>Suivant</Input>
            </Stack>
            </form>
          </SwiperSlide>
          <SwiperSlide>
            <ProfessionSlide swiper={signUpSwiperRef.current?.swiper}/>
          </SwiperSlide>
          <SwiperSlide>
            <ProfilePictureSlide swiper={signUpSwiperRef.current?.swiper}/>
          </SwiperSlide>
          <SwiperSlide>
            <SignUpSubmit swiper={signUpSwiperRef.current?.swiper}/>
          </SwiperSlide>
        </Swiper>
    </Stack>
  );
};

export default SignUpSliders;
