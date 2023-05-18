import React, { createContext, useRef, useState } from 'react';
import TextPost from '../Article/TextPost';
import Post from './Post';

export const postContext = createContext();

const PostContainer = ({post}) => {
  const [textOverflow,setTextOverflow]=useState(false);
  const postSwiper = useRef();
  const containerRef = useRef();

    return (
        <postContext.Provider value={{post,textOverflow,setTextOverflow,postSwiper,containerRef}}>
            {post.contentType==='text'||post.contentType==='short'  ? (
              <TextPost/>
              ) : (
            <Post/>
          )}
        </postContext.Provider>
    );
};

export default PostContainer;