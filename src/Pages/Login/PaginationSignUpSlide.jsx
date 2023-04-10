import { Text } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { Pagination } from 'swiper';
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';

const PaginationSignUpSlide = ({activeIndex}) => {
    const paginationRef=useRef();
    const pagination = {
        renderBullet: (index, className)=> {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
          },
    }

    useEffect(()=>{
        paginationRef.current.swiper.slideTo(activeIndex)
    },[activeIndex])
    return (
        <Swiper ref={paginationRef} allowTouchMove={false} pagination={pagination} modules={[Pagination]}
       style={{height:'50px'}} className='pagination-signup-swiper'
       >
        <SwiperSlide><Text fontSize='xs' fontStyle='italic'>Nom d'utilisateur</Text></SwiperSlide>
        <SwiperSlide><Text fontSize='xs' fontStyle='italic'>Profession</Text></SwiperSlide>
        <SwiperSlide><Text fontSize='xs' fontStyle='italic'>Photo de profil</Text></SwiperSlide>
        <SwiperSlide><Text fontSize='xs' fontStyle='italic'>Authentification</Text></SwiperSlide>
      </Swiper>
    );
};

export default PaginationSignUpSlide;