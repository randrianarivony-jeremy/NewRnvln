import React from 'react';
import { Mousewheel, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Post from './Post';
import QuestionDisplay from './QuestionDisplay';

const PostContainer = ({post}) => {

    return (
        <>
            {post.type === "publication" ? (
            <Post post={post} />
          ) : (
            <Swiper
              direction="horizontal"
              mousewheel={true}
              modules={[Mousewheel,Pagination]}
              pagination={{
                type: "progressbar",
              }} className='post-slides'
            >
              <SwiperSlide>
                <Post post={post} />
              </SwiperSlide>
              <SwiperSlide className="question-slide">
                <QuestionDisplay post={post} />
              </SwiperSlide>
            </Swiper>
          )}
        </>
    );
};

export default PostContainer;