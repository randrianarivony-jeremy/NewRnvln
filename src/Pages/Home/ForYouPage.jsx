import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import PostContainer from '../../Component/Post/PostContainer';

const ForYouPage = () => {
    const homeSliderRef = useRef();
    const data = useSelector(state=>state.thread[0])
    return (
        <Swiper
          ref={homeSliderRef}
          className="feed-slides"
          direction="vertical"
        >
          {data?.map((elt, key) => (
            <SwiperSlide key={key}>
              <PostContainer post={elt} homeSlider={homeSliderRef} />
            </SwiperSlide>
          ))}
        </Swiper>
    );
};

export default ForYouPage;