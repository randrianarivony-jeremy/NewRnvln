import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Input,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { ClickableFlex, Scroll } from "../../Styles/Theme";

const CommentPost = ({ post }) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const inputRef = useRef();

  return (
    <>
      <Button
        flexDir="column"
        onClick={onOpen} className='bi-chat' fontSize='xl'
        color={
          post.contentType === "string" && post.bg !== "transparent" && "black"
        }
      >
        <Text fontSize="xs">26</Text>
      </Button>
      <Drawer
        onOpen={onOpen}
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent maxH='75%'>
          <DrawerCloseButton top={1}/>
          <DrawerHeader paddingY={2} textAlign="center" fontWeight="bold" fontSize="sm">
            Commentaires
          </DrawerHeader>
          <DrawerBody paddingX={0}>
            <Scroll>
              <ClickableFlex align="flex-start">
                <Avatar size="md" />
                <Stack spacing={1} marginLeft={2}>
                  <Heading size="sm">Username</Heading>
                  <Text>
                    Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem
                    ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum
                    dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor
                    sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
                    amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
                    amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.
                  </Text>
                </Stack>
              </ClickableFlex>
              <ClickableFlex align="flex-start">
                <Avatar size="md" />
                <Stack spacing={1} marginLeft={2}>
                  <Heading size="sm">Username</Heading>
                  <Text>
                    Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem
                    ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum
                    dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor
                    sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
                    amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
                    amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.
                  </Text>
                </Stack>
              </ClickableFlex>
            </Scroll>
          </DrawerBody>
          <DrawerFooter paddingX={3} paddingTop={0} paddingBottom={2}>
                <Input ref={inputRef} placeholder="Ajouter un commentaire" />
                <Button variant="float" className="bi-send"></Button>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CommentPost;
