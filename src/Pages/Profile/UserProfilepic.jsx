import { Avatar, Drawer, DrawerCloseButton, DrawerContent, Image, useDisclosure } from '@chakra-ui/react';

const UserProfilepic = ({picture}) => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    return (
        <>
            {picture ? (
            <Image
              src={picture}
              alt="profile_pic"
              boxSize='60px'
              rounded="full"
              objectFit="cover" onClick={onOpen}
            />
          ) : (
            <Avatar size="md" onClick={onOpen}/>
          )}
          
      <Drawer size='full' isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <DrawerContent>
        <DrawerCloseButton/>
          <Image src={picture} alt='profilePic' width='100%' margin='auto'/>
        </DrawerContent>
      </Drawer>
        </>
    );
};

export default UserProfilepic;