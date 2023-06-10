import {
  Avatar,
  Flex,
  Heading,
  Image,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ClickableFlex } from "../Styles/Theme";

const UserItem = ({ user }) => {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <ClickableFlex>
      {user.picture ? (
        <Flex boxSize={12} position="relative">
          <Image
            src={user.picture}
            alt="profilepic"
            boxSize={12}
            minW={12}
            rounded="full"
            objectFit="cover"
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
          {imageLoading && <SkeletonCircle size={12} position="absolute" />}
        </Flex>
      ) : (
        <Avatar size="md" />
      )}
      <Stack spacing={0} marginLeft={2} justify="center">
        <Heading size="sm">{user.name}</Heading>
        {user.job && <Text fontStyle="italic">{user.job}</Text>}
      </Stack>
    </ClickableFlex>
  );
};

export default UserItem;
