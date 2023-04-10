import { Heading } from '@chakra-ui/react';
import React from 'react';
import InfiniteSlider from './InfiniteSlider';

const QuestionsOnly = () => {
    return (
        <>
        <Heading size='sm' position='absolute' top={2} zIndex={2} left='50%' transform='auto' translateX='-50%'>Questions</Heading>
            <InfiniteSlider/>
        </>
    );
};

export default QuestionsOnly;