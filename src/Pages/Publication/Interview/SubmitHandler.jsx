import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { currentUserContext } from "../../../Controler/App";
import { interviewContext } from "./Interview";

const SubmitHandler = () => {
  const [submitting, setSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { responseData, swiperRef } = useContext(interviewContext);
  const { currentUser } = useContext(currentUserContext);
  const empty = useRef();

  const handleSubmit = () => {
    empty.current = responseData.current.indexOf("empty");
    if (empty.current !== -1) {
      swiperRef.current.swiper.slideTo(empty.current);
      onOpen();
    } else {
      console.log('mety');
    }
  };

  return (
    <>
      <Button
        isLoading={submitting}
        loadingText="Envoi"
        variant="primary"
        width="100%"
        onClick={handleSubmit}
      >
        Publier
      </Button>
      <Drawer
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        placement="bottom"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Avertissement</DrawerHeader>
          <DrawerBody>
            Vous avez oublié de répondre à la question {empty.current + 1}.
          </DrawerBody>
          <DrawerFooter>
            <ButtonGroup>
              <Button variant={"outline"}>Publier</Button>
              <Button variant={"primary"} onClick={onClose}>Compléter</Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SubmitHandler;
