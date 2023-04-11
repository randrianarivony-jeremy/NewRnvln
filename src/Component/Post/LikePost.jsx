import { Button, Text } from '@chakra-ui/react';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const LikePost = ({post}) => {
    const [liked,setLiked]=useState(false);
    return (
        <Button flexDir='column' onClick={()=>setLiked(!liked)} color={post.contentType==='string' && 'black'}>
              <FontAwesomeIcon size='lg' color={liked ? 'red' : ''} icon={liked ? faHeartFill : faHeart}></FontAwesomeIcon>
              <Text fontSize='xs'>101</Text>
            </Button>
    );
};

export default LikePost;