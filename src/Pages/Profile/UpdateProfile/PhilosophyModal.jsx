import {
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
  } from "@chakra-ui/react";
  import React, { useContext, useRef, useState } from "react";
  import { apiCall, currentUserContext } from "../../../Controler/App";
  
  const PhilosophyModal = ({ onOpen, isOpen, onClose }) => {
    const { currentUser, setCurrentUser } = useContext(currentUserContext);
    const inputRef = useRef();
    const [submitting, setSubmitting] = useState(false);
    const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  
    const changePhilosophy = async (philosophy) => {
      await apiCall
        .put(
           "user/philosophy/" + currentUser._id,
          {
            philosophy,
          }
        )
        .then(
          (res) => {
            setSubmitting(false);
            setDeleteSubmitting(false);
            setCurrentUser({ ...currentUser, philosophy: res.data.philosophy });
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
        <ModalContent>
          <ModalHeader paddingX={3}>Changer votre philosophie</ModalHeader>
          <ModalBody paddingX={3}>
            <Input
              placeholder={currentUser.philosophy ?? "Ny vola no maha rangahy"}
              type="text" defaultValue={currentUser.philosophy?? null}
              ref={inputRef}
            />
          </ModalBody>
          <ModalFooter justifyContent={currentUser.philosophy ? "space-between" : 'flex-end'} paddingX={3}>
            {currentUser.philosophy && (
              <Button isLoading={deleteSubmitting}
                onClick={() => {
                  changePhilosophy("");
                  setDeleteSubmitting(true);
                }}
              >
                Supprimer
              </Button>
            )}
            <Flex justify="flex-end">
              <Button onClick={onClose}>Annuler</Button>
              <Button
                variant="outline"
                isLoading={submitting}
                onClick={() => {
                  changePhilosophy(inputRef.current.value);
                  setSubmitting(true);
                }}
              >
                Enregistrer
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default PhilosophyModal;
  