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
import React, { useContext, useEffect, useRef } from "react";
import { currentUserContext } from "../../../Controler/App";
import { useChangeJobMutation } from "../../../Controler/Redux/Features/userSlice";

const JobModal = ({ onOpen, isOpen, onClose }) => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const inputRef = useRef();
  const bg = useColorModeValue("white", "dark.50");
  const [changeJob, { isSuccess, data }] = useChangeJobMutation();

  useEffect(() => {
    if (isSuccess) {
      setCurrentUser({ ...currentUser, job: data.job });
    }
  }, [isSuccess]);

  return (
    <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bgColor={bg}>
        <ModalHeader paddingX={3}>Changer votre profession</ModalHeader>
        <ModalBody paddingX={3}>
          <Input
            placeholder={"Profession"}
            type="text"
            defaultValue={currentUser.job ?? null}
            ref={inputRef}
          />
        </ModalBody>
        <ModalFooter
          justifyContent={currentUser.job ? "space-between" : "flex-end"}
          paddingX={3}
        >
          {currentUser.job && (
            <Button
              variant="dissuasive"
              onClick={() => {
                changeJob({
                  userId: currentUser._id,
                  job: "",
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
                changeJob({
                  userId: currentUser._id,
                  job: inputRef.current.value,
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
  
  export default JobModal;
  