import {
    Button,
    Flex,
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
  import React, { useContext, useRef, useState } from "react";
  import { apiCall, currentUserContext } from "../../../Controler/App";
  
  const ProjectModal = ({ onOpen, isOpen, onClose }) => {
    const { currentUser, setCurrentUser } = useContext(currentUserContext);
    const inputRef = useRef();
    const bg = useColorModeValue('white','dark.50')
    const [submitting, setSubmitting] = useState(false);
    const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  
    const changeProject = async (project) => {
      await apiCall
        .put(
           "user/project/" + currentUser._id,
          {
            project,
          }
        )
        .then(
          (res) => {
            setSubmitting(false);
            setDeleteSubmitting(false);
            setCurrentUser({ ...currentUser, project: res.data.project });
            onClose();
          },
          (err) => {
            setSubmitting(false);
            setDeleteSubmitting(false);
            console.log(err);
          }
        );
    };
  
    return (
      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bgColor={bg}>
          <ModalHeader paddingX={3}>Changer votre projet</ModalHeader>
          <ModalBody paddingX={3}>
            <Input
              placeholder={currentUser.project ?? "Avoir une voiture"}
              type="text" defaultValue={currentUser.project?? null}
              ref={inputRef}
            />
          </ModalBody>
          <ModalFooter justifyContent={currentUser.project ? "space-between" : 'flex-end'} paddingX={3}>
            {currentUser.project && (
              <Button isLoading={deleteSubmitting} variant='dissuasive'
                onClick={() => {
                  changeProject("");
                  setDeleteSubmitting(true);
                }}
              >
                Supprimer
              </Button>
            )}
            <HStack marginLeft={2} justify="flex-end">
              <Button onClick={onClose}>Annuler</Button>
              <Button
                variant="outline"
                isLoading={submitting}
                onClick={() => {
                  changeProject(inputRef.current.value);
                  setSubmitting(true);
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
  