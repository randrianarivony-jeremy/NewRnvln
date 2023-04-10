import {Avatar,Button,Drawer,DrawerBody,DrawerCloseButton,DrawerContent,DrawerHeader,DrawerOverlay,Flex,Heading,Stack,Text,useDisclosure,} from "@chakra-ui/react";
import React from "react";
import SubscribeDrawer from "../../Component/SubscribeDrawer";
import { ClickableFlex } from "../../Styles/Theme";

const RelationList = ({category,list}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:isOpenSubscription, onOpen:onOpenSubscription, onClose:onCloseSubscription } = useDisclosure();
  return (
    <>
      <Button flexDir="column" onClick={onOpen}>
        <Heading size='md'>{list.length}</Heading>
        <Text fontSize="xs">{category}</Text>
      </Button>
      <Drawer
        onOpen={onOpen}
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign="center" fontSize='md' fontWeight="bold">
            {category}
          </DrawerHeader>
          <DrawerBody paddingX={0}>
            <Stack>
              {list.map((elt,key)=><ClickableFlex key={key} justify="space-between">
                <Flex>
                  <Avatar size="md" />
                  <Stack spacing={0} marginLeft={2} justify='center'>
                    <Heading size="sm">{elt.name}</Heading>
                    {elt.job && <Text fontStyle="italic">{elt.job}</Text>}
                  </Stack>
                </Flex>
                {category==='Followers' && <Button variant='primary'>Suivre</Button>}
                {category==='Followings' && <Button variant='outline'>Suivi</Button>}
                {category==='Abonnés' && <Button variant='cta' onClick={onOpenSubscription}>S'abonner</Button>}
                {category==='Abonnements' && <Button variant='outline'>Abonné</Button>}
      <SubscribeDrawer isOpen={isOpenSubscription} onClose={onCloseSubscription} onOpen={onOpenSubscription}/>
              </ClickableFlex>)}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RelationList;
