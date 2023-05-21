import { Image } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef } from 'react';
import { currentUserContext } from '../../Controler/App';
import { chatContext } from './Chat';

const ImageItem = ({data}) => {
    const {currentUser}=useContext(currentUserContext);
    const {setSubmitting}=useContext(chatContext);
    const mediaRef=useRef();

    const handleImageScroll=()=>{
        if (mediaRef.current.complete) setSubmitting(false);
        else handleImageScroll();
      }
    useEffect(()=>{
        handleImageScroll();
    },[])

    return (
        <Image ref={mediaRef}
        src={data.content}
        alt="picture" rounded="xl"
        borderBottomLeftRadius={data.sender!==currentUser._id && 0}
        borderBottomRightRadius={data.sender===currentUser._id && 0}
        />
    );
};

export default ImageItem;