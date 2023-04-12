import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const LikePost = ({post}) => {
    const [liked,setLiked]=useState(false);
    return (
        <Button flexDir='column' onClick={()=>setLiked(!liked)} color={post.contentType==='string' && post.bg!=='transparent' && 'black'}>
              <Flex className={liked ? 'bi-heart-fill' : 'bi-heart'} fontSize='xl' color={liked ? 'red' : ''}></Flex>
              <Text fontSize='xs'>101</Text>
            </Button>
    );
};

export default LikePost;