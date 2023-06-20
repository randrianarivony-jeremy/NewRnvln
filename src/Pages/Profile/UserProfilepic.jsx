import {
  Avatar,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  Image,
  SkeletonCircle,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

const UserProfilepic = ({ picture }) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [imgLoading, setImgLoading] = useState(true);
  return (
    <>
      {picture ? (
        <Flex boxSize={"60px"} position="relative" onClick={onOpen}>
          <Image
            src={picture}
            alt="profile_pic"
            rounded="full"
            minWidth={"60px"}
            objectFit="cover"
            onLoad={() => setImgLoading(false)}
            onError={() => setImgLoading(false)}
          />
          {imgLoading && (
            <SkeletonCircle
              size={"60px"}
              position="absolute"
              top={0}
              zIndex={1}
            />
          )}
        </Flex>
      ) : (
        <Avatar size="md" onClick={onOpen} />
      )}

      <Drawer size="full" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <DrawerContent>
          <DrawerCloseButton />
          <Image src={picture} alt="profilePic" width="100%" margin="auto" />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserProfilepic;
