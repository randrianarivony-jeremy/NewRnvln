import { HStack, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

const UserLoader = ({length}) => {
    const loop = useRef([]);

    const range = ()=>{
        for (let i = 0;i<length;i++){
            loop.current = [...loop.current,i]
        }
    }

    useEffect(()=>{
        range();
    },[])
    return (
        <>
        {loop.current.map((i,j)=><HStack key={j}>
            <SkeletonCircle boxSize={10}/>
            <Stack width={200}>
                <Skeleton height={3}/>
                <Skeleton height={3}/>
            </Stack>
        </HStack>)}
        </>
    );
};

export default UserLoader;