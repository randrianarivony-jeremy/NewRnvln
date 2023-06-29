import { HStack, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react';
import React from "react";

const UserLoader = ({ length }) => {
  let loop = [];

  for (let i = 0; i < length; i++) {
    loop.push(i);
  }

  return (
    <Stack padding="8px 12px">
      {loop.map((i, j) => (
        <HStack key={j}>
          <SkeletonCircle boxSize={10} />
          <Stack width={200}>
            <Skeleton height={3} />
            <Skeleton height={3} />
          </Stack>
        </HStack>
      ))}
    </Stack>
  );
};

export default UserLoader;