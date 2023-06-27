import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import { currentUserContext } from "../../../Controler/App";
import {
  useChangePhiloMutation,
  useFetchUserQuery,
} from "../../../Controler/Redux/Features/userSlice";

const PhilosophyModal = ({ onOpen, isOpen, onClose }) => {
  const { currentUser } = useContext(currentUserContext);
  const { philosophy } = useFetchUserQuery(currentUser._id, {
    selectFromResult: ({ data }) => ({
      philosophy: data?.philosophy,
    }),
  });
  const inputRef = useRef();
  const bg = useColorModeValue("white", "dark.50");
  const [changePhilo] = useChangePhiloMutation();

  return (
    <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bgColor={bg}>
        <ModalHeader paddingX={3}>Changer votre philosophie</ModalHeader>
        <ModalBody paddingX={3}>
          <Input
            placeholder={"Philosophie"}
            type="text"
            defaultValue={philosophy ?? null}
            ref={inputRef}
          />
        </ModalBody>
        <ModalFooter
          justifyContent={philosophy ? "space-between" : "flex-end"}
          paddingX={3}
        >
          {philosophy && (
            <Button
              variant="dissuasive"
              onClick={() => {
                changePhilo({
                  userId: currentUser._id,
                  address: "",
                });
                onClose();
              }}
            >
              Supprimer
            </Button>
          )}
          <HStack marginLeft={2} justify="flex-end">
            <Button onClick={onClose}>Annuler</Button>
            <Button
              variant="outline"
              onClick={() => {
                changePhilo({
                  userId: currentUser._id,
                  philosophy: inputRef.current.value,
                });
                onClose();
              }}
            >
              Enregistrer
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
  
  export default PhilosophyModal;
  