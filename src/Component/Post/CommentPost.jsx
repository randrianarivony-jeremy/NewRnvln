import {Button,Drawer,DrawerBody,DrawerCloseButton,DrawerContent,DrawerHeader,DrawerOverlay,Flex,Heading,Input,InputGroup,InputRightElement,Popover,PopoverArrow,PopoverBody,PopoverContent,PopoverTrigger,Stack,Text,useColorModeValue,useDisclosure,} from "@chakra-ui/react";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmojiPicker from "emoji-picker-react";
import React, { useRef } from "react";

const CommentPost = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const emojibg = useColorModeValue("light", "dark");
  const inputRef=useRef();

  const emojiClick = (emojiData) => {
    inputRef.current.value += emojiData.emoji;
  };

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
          <DrawerHeader textAlign="center">
            <Heading size="sm">Commentaires</Heading>
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
                <InputGroup>
                  <Input ref={inputRef} placeholder="Ajouter un commentaire" />
                  <InputRightElement
                    children={
                      <Popover isLazy={true} returnFocusOnClose={false}>
                        <PopoverTrigger>
                          <Button className="bi-emoji-smile"></Button>
                        </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody style={{ padding: 0 }}>
                              <EmojiPicker
                                theme={emojibg}
                                height="200px"
                                lazyLoadEmojis={true}
                                searchDisabled={true}
                                width="100%"
                                previewConfig={{ showPreview: false }}
                                onEmojiClick={emojiClick}
                              />
                            </PopoverBody>
                          </PopoverContent>
                      </Popover>
                    }
                  />
                </InputGroup>
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
