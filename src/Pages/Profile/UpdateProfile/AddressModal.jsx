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
  useChangeAddressMutation,
  useFetchUserQuery,
} from "../../../Controler/Redux/Features/userSlice";

const AddressModal = ({ onOpen, isOpen, onClose }) => {
  const { currentUser } = useContext(currentUserContext);
  const { address } = useFetchUserQuery(currentUser._id, {
    selectFromResult: ({ data }) => ({
      address: data?.address,
    }),
  });
  const [changeAddress] = useChangeAddressMutation();
  const inputRef = useRef();
  const bg = useColorModeValue("white", "dark.50");

  return (
    <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bgColor={bg}>
        <ModalHeader paddingX={3}>Changer votre lieu de travail</ModalHeader>
        <ModalBody paddingX={3}>
          <Input
            placeholder={!address ? "Lieu de travail" : null}
            type="text"
            defaultValue={address ?? null}
            ref={inputRef}
          />
        </ModalBody>
        <ModalFooter
          justifyContent={address ? "space-between" : "flex-end"}
          paddingX={3}
        >
          {address && (
            <Button
              variant="dissuasive"
              onClick={() => {
                changeAddress({
                  userId: currentUser._id,
                  address: "",
                });
                onClose();
              }}
            >
              Supprimer
            </Button>
          )}
          <HStack justify="flex-end" marginLeft={2}>
            <Button onClick={onClose}>Annuler</Button>
            <Button
              variant="outline"
              onClick={() => {
                changeAddress({
                  userId: currentUser._id,
                  address: inputRef.current.value,
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

export default AddressModal;
