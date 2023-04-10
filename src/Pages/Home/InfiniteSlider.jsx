import React, { useRef } from 'react';
import { Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Post from '../../Component/Post/Post';
import { data } from '../../Controler/App';

const InfiniteSlider = () => {
    const homeSliderRef=useRef();
    
    return (
        <Swiper ref={homeSliderRef} className='feed-slides' direction='vertical' mousewheel={true} modules={[Mousewheel]}>
          {data.map((elt,key)=>
          <SwiperSlide key={key}>
            <Post post={elt}/>
          </SwiperSlide>)}
        </Swiper>
    );
};

export default InfiniteSlider;