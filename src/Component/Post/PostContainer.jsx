import { Image } from '@chakra-ui/react';
import React, { createContext, useRef, useState } from 'react';
import { Mousewheel, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Post from './Post';
import TextPost from './TextPost';
import image from '../../Assets/image.jpg'

export const postContext = createContext();

const PostContainer = ({post,homeSlider}) => {
  const [textOverflow,setTextOverflow]=useState(false);
  const postSwiper = useRef();

    return (
        <postContext.Provider value={{post,textOverflow,setTextOverflow,postSwiper}}>
            {/* {post.contentType==='string' ? (
            // {!textOverflow ? (
            <Post post={post} />
          ) : ( */}
            <Swiper ref={postSwiper}
              direction="horizontal"
              modules={[Pagination]}
              pagination={{
                type: "progressbar",
              }}
              // onSlideChange={({realIndex})=>console.log(realIndex)}
              // onSlideChange={({realIndex})=>realIndex===1 ? homeSlider.current.swiper.disable() : homeSlider.current.swiper.enable()}
            >
              <SwiperSlide>
                <Post post={post} />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={image} alt='try' width='100%' height='100%' objectFit='contain'/>
                {/* <TextPost/> */}
              </SwiperSlide>
            </Swiper>
          {/* )} */}
        </postContext.Provider>
    );
};

export default PostContainer;