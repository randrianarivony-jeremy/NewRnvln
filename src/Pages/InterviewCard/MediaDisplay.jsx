import { Box, Image } from '@chakra-ui/react';
import React from 'react';

const MediaDisplay = ({type,content}) => {
    return (
        <Box width='100%' height='100%'>
            {type==='image' ? <Image height='100%' width='100%' src={content} alt='image' objectFit='cover'/> : 
            <video src={content} alt='video' style={{objectFit:'cover',height:'100%',width:'100%'}}></video>}
        </Box>
    );
};

export default MediaDisplay;