import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {Stack} from "@chakra-ui/react";
import SignUpSubmit from "./SignUpSubmit";
import ProfessionSlide from "./ProfessionSlide";
import ProfilePictureSlide from "./ProfilePictureSlide";
import UsernameSlide from "./UsernameSlide";

const SignUpSliders = ({ setActiveIndex }) => {
  const signUpSwiperRef = useRef();


  return (
    <Stack justify="center" height="100%" minW='100%'>
        <Swiper spaceBetween={10} allowTouchMove={false} ref={signUpSwiperRef} autoHeight={true} className='signup-swiper' onSlideChange={({ realIndex }) => setActiveIndex(realIndex)} >
          <SwiperSlide>
            <UsernameSlide swiper={signUpSwiperRef}/>
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
