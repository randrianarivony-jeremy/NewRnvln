import React, { createContext, useRef, useState } from 'react';
import { Mousewheel, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Post from './Post';
import TextPost from './TextPost';

export const postContext = createContext();

const PostContainer = ({post,homeSlider}) => {
  const [textOverflow,setTextOverflow]=useState(false);
  const postSwiper = useRef();

    return (
        <postContext.Provider value={{post,textOverflow,setTextOverflow,postSwiper}}>
            {!textOverflow ? (
            <Post post={post} />
          ) : (
            <Swiper ref={postSwiper}
              direction="horizontal" touchAngle={180}
              modules={[Pagination]}
              pagination={{
                type: "progressbar",
              }}
              // onSlideChange={({realIndex})=>console.log(realIndex)}
              onSlideChange={({realIndex})=>realIndex===1 ? homeSlider.current.swiper.disable() : homeSlider.current.swiper.enable()}
            >
              <SwiperSlide>
                <Post post={post} />
              </SwiperSlide>
              <SwiperSlide>
                <TextPost/>
              </SwiperSlide>
            </Swiper>
          )}
        </postContext.Provider>
    );
};

export default PostContainer;