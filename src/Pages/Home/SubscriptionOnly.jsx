import { Heading } from '@chakra-ui/react';
import React from 'react';
import InfiniteSlider from './InfiniteSlider';

const SubscriptionOnly = () => {
    return (
        <>
            <Heading position='absolute' size='sm' zIndex={2} top={2} left='50%' transform='auto' translateX='-50%'>Abonnements</Heading>
            <InfiniteSlider/>
        </>
    );
};

export default SubscriptionOnly;