import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {Button,FormControl,FormLabel,Input,Stack,} from "@chakra-ui/react";
import AuthSlide from "./Slides/AuthSlide";
import ProfessionSlide from "./Slides/ProfessionSlide";
import ProfilePictureSlide from "./Slides/ProfilePictureSlide";

const SignUpSliders = ({ setActiveIndex }) => {
  const signUpSwiperRef = useRef();

  return (
    <Stack justify="center" height="100%">
        <Swiper allowTouchMove={true} ref={signUpSwiperRef} autoHeight={true} className='signup-swiper' onSlideChange={({ realIndex }) => setActiveIndex(realIndex)} >
          <SwiperSlide>
            <Stack>
              <FormControl>
                <FormLabel>Quel nom voulez-vous utiliser :</FormLabel>
                <Input placeholder="Nom d'utilisateur" />
              </FormControl>
              <Button variant="primary" width="100%"
                onClick={() => signUpSwiperRef.current.swiper.slideNext()}
              >
                Suivant
              </Button>
            </Stack>
          </SwiperSlide>
          <SwiperSlide>
            <ProfessionSlide swiper={signUpSwiperRef.current?.swiper}/>
          </SwiperSlide>
          <SwiperSlide>
            <ProfilePictureSlide swiper={signUpSwiperRef.current?.swiper}/>
          </SwiperSlide>
          <SwiperSlide>
            <AuthSlide swiper={signUpSwiperRef.current?.swiper}/>
          </SwiperSlide>
        </Swiper>
    </Stack>
  );
};

export default SignUpSliders;
