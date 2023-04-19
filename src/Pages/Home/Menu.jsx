import {Button,Drawer,DrawerBody,DrawerCloseButton,DrawerContent,DrawerHeader,DrawerOverlay,Flex,Stack,Text,useColorMode,useDisclosure,} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { currentUserContext } from "../../Controler/App";
import Logout from "../Login/Logout";

const Menu = () => {
  const { isOpen, onOpen,onClose } = useDisclosure();
  const { onOpen:openLogoutModal,onClose:closeLogoutModal,isOpen:openedLogoutModal } = useDisclosure();
  const {currentUser}=useContext(currentUserContext);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Button className="bi-list" fontSize='xl' position='absolute' zIndex={2} onClick={onOpen}></Button>
      <Drawer onOpen={onOpen} isOpen={isOpen} placement="left"
        onClose={() => {
          onClose();
        //   setLogoutModal(false);
        }}
        >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize='md' fontWeight='bold'>Menu</DrawerHeader>
          <DrawerBody paddingX={3} paddingY={0}>
            <Stack>
              <Button justifyContent='flex-start' onClick={()=>{navigate('/');onClose()}}>
                <Flex className="bi-house" width={10} fontSize='xl'></Flex>
                <Text>Accueil</Text>
              </Button>
              <Button justifyContent='flex-start' onClick={()=>{navigate('/subscriptions_only');onClose()}}>
                <Flex className="bi-people" width={10} fontSize='xl'></Flex>
                <Text>Abonnements</Text>
              </Button>
              <Button justifyContent='flex-start' onClick={()=>{navigate('/questions_only');onClose()}}>
                <Flex className="bi-question-lg" width={10} fontSize='xl'></Flex>
                <Text>Questionnaires</Text>
              </Button>
              <Button justifyContent='flex-start' onClick={()=>navigate('/parameters')}>
                <Flex className="bi-gear" width={10} fontSize='xl'></Flex>
                <Text>Paramètres</Text>
              </Button>
              <Button justifyContent='flex-start' onClick={toggleColorMode}>
                <Flex className={colorMode === "light" ? "bi-moon" : "bi-sun"} width={10} fontSize='xl'></Flex>
                <Text>{colorMode === "light" ? "Dark mode" : "Light mode"}</Text>
              </Button>
              {currentUser && <Button justifyContent='flex-start' onClick={openLogoutModal}>
                <Flex className='bi-box-arrow-right' width={10} fontSize='xl'></Flex>
                <Text>Se déconnecter</Text>
              </Button>}
            {currentUser ? 
            <Button variant='cta' onClick={()=>navigate('/question')}>Poser des questions</Button>
            : 
            <Button variant='cta' onClick={()=>navigate('/login')}>Se connecter</Button>}
            </Stack>
            <Logout onOpen={openLogoutModal} onClose={closeLogoutModal} isOpen={openedLogoutModal}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Menu;
