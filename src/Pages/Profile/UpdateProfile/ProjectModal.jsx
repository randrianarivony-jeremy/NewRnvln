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
  useChangeProjectMutation,
  useFetchUserQuery,
} from "../../../Controler/Redux/Features/userSlice";

const ProjectModal = ({ onOpen, isOpen, onClose }) => {
  const { currentUser } = useContext(currentUserContext);
  const { project } = useFetchUserQuery(currentUser._id, {
    selectFromResult: ({ data }) => ({
      project: data?.project,
    }),
  });
  const [changeProject] = useChangeProjectMutation();
  const inputRef = useRef();
  const bg = useColorModeValue("white", "dark.50");

  return (
    <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bgColor={bg}>
        <ModalHeader paddingX={3}>Changer votre projet</ModalHeader>
        <ModalBody paddingX={3}>
          <Input
            placeholder={"Projet"}
            type="text"
            defaultValue={project ?? null}
            ref={inputRef}
          />
        </ModalBody>
        <ModalFooter
          justifyContent={project ? "space-between" : "flex-end"}
          paddingX={3}
        >
          {project && (
            <Button
              variant="dissuasive"
              onClick={() => {
                changeProject({
                  userId: currentUser._id,
                  project: "",
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
                changeProject({
                  userId: currentUser._id,
                  project: inputRef.current.value,
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
  
  export default ProjectModal;
  