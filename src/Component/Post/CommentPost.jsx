import { Button,Drawer,DrawerBody,DrawerCloseButton,DrawerContent,DrawerHeader,DrawerOverlay,Flex,Input,Stack,Text,useDisclosure,} from "@chakra-ui/react";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";

const CommentPost = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const inputRef=useRef();

  return (
    <>
      <Button flexDir="column" onClick={onOpen}>
        <FontAwesomeIcon size="lg" icon={faComment}></FontAwesomeIcon>
        <Text fontSize='xs'>26</Text>
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
          <DrawerHeader textAlign="center" fontWeight='bold' fontSize='xl'>
            Commentaires
          </DrawerHeader>
          <DrawerBody paddingX={0}>
            <Stack>
              <Button justifyContent="flex-start">
                <Flex className="bi-house" width={10} fontSize="xl"></Flex>
                <Text>Accueil</Text>
              </Button>
              <Button justifyContent="flex-start">
                <Flex className="bi-people" width={10} fontSize="xl"></Flex>
                <Text>Abonnements</Text>
              </Button>
              <Button justifyContent="flex-start">
                <Flex
                  className="bi-question-lg"
                  width={10}
                  fontSize="xl"
                ></Flex>
                <Text>Questionnaires</Text>
              </Button>
              <Button justifyContent="flex-start">
                <Flex className="bi-gear" width={10} fontSize="xl"></Flex>
                <Text>Paramètres</Text>
              </Button>
              <Button justifyContent="flex-start">
                <Flex className="bi-sun" width={10} fontSize="xl"></Flex>
                <Text>Light mode</Text>
              </Button>
              <Button justifyContent="flex-start">
                <Flex
                  className="bi-box-arrow-right"
                  width={10}
                  fontSize="xl"
                ></Flex>
                <Text>Se déconnecter</Text>
              </Button>
              <Flex paddingX={3}>
                  <Input ref={inputRef} placeholder="Ajouter un commentaire" />
                <Button variant="float" className="bi-send"></Button>
              </Flex>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CommentPost;
