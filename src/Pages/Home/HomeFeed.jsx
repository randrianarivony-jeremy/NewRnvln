import { Box } from '@chakra-ui/react';
import React from 'react';
import InfiniteSlider from './InfiniteSlider';

const HomeFeed = () => {
    return (
            <Box className='homefeed' width='100%' height='100%'>
                <InfiniteSlider/>
            </Box>
    );
};

export default HomeFeed;