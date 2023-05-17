import React, { createContext, useRef, useState } from 'react';
import { Mousewheel, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Post from './Post';
import TextPost from './TextPost';

export const postContext = createContext();

const PostContainer = ({post}) => {
  const [textOverflow,setTextOverflow]=useState(false);
  const postSwiper = useRef();

    return (
        <postContext.Provider value={{post,textOverflow,setTextOverflow,postSwiper}}>
            {/* {!textOverflow ? ( */}
            <Post/>
          {/* ) : (
            <Swiper ref={postSwiper}
              direction="horizontal" mousewheel={true}
              modules={[Pagination,Mousewheel]}
              pagination={{
                type: "progressbar",
              }}
            >
              <SwiperSlide>
                <Post/>
              </SwiperSlide>
              <SwiperSlide>
                <TextPost/>
              </SwiperSlide>
            </Swiper>
          )} */}
        </postContext.Provider>
    );
};

export default PostContainer;