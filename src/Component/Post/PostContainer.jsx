import React, { createContext, useRef, useState } from 'react';
import Post from './Post';

export const postContext = createContext();

const PostContainer = ({post}) => {
  const [textOverflow,setTextOverflow]=useState(false);
  const [showReaction,setShowReaction]=useState(true);
  const postSwiper = useRef();
  const containerRef = useRef();

    return (
        <postContext.Provider value={{post,textOverflow,setTextOverflow,showReaction,setShowReaction,postSwiper,containerRef}}>
            <Post/>
        </postContext.Provider>
    );
};

export default PostContainer;