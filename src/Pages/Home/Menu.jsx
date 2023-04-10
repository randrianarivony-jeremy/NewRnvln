import {Button,Drawer,DrawerBody,DrawerCloseButton,DrawerContent,DrawerHeader,DrawerOverlay,Flex,Stack,Text,useColorMode,useDisclosure,} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import HomeFeed from "./HomeFeed";
import QuestionsOnly from "./QuestionsOnly";
import SubscriptionOnly from "./SubscriptionOnly";

const Menu = ({setThread}) => {
  const { isOpen, onOpen,onClose } = useDisclosure();
  const navigate = useNavigate();
//   const [logoutModal, setLogoutModal] = useState(false);
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
              <Button justifyContent='flex-start' onClick={()=>{setThread(<HomeFeed/>);onClose()}}>
                <Flex className="bi-house" width={10} fontSize='xl'></Flex>
                <Text>Accueil</Text>
              </Button>
              <Button justifyContent='flex-start' onClick={()=>{setThread(<SubscriptionOnly/>);onClose()}}>
                <Flex className="bi-people" width={10} fontSize='xl'></Flex>
                <Text>Abonnements</Text>
              </Button>
              <Button justifyContent='flex-start' onClick={()=>{setThread(<QuestionsOnly/>);onClose()}}>
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
              <Button justifyContent='flex-start'>
                <Flex className='bi-box-arrow-right' width={10} fontSize='xl'></Flex>
                <Text>Se déconnecter</Text>
              </Button>
            <Button variant='cta' onClick={()=>navigate('/login')}>Se connecter</Button>
            </Stack>
            {/* {logoutModal && <Logout status={logoutModal} />} */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Menu;
