import { Heading } from '@chakra-ui/react';
import React, { useRef } from 'react';
import Swiper from 'swiper';
import { SwiperSlide } from 'swiper/react';
import PostContainer from '../../Component/Post/PostContainer';

const SubscriptionOnly = () => {
    const homeSliderRef=useRef();
    let data=[];

    return (
        <>
            <Heading position='absolute' size='sm' zIndex={2} top={2} left='50%' transform='auto' translateX='-50%'>Abonnements</Heading>
            <Swiper ref={homeSliderRef} className="feed-slides" direction="vertical">
      {data.map((elt, key) => (
        <SwiperSlide key={key}>
          <PostContainer post={elt} homeSlider={homeSliderRef}/>
        </SwiperSlide>
      ))}
    </Swiper>
        </>
    );
};

export default SubscriptionOnly;