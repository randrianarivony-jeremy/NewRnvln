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
  import axios from "axios";
  import React, { useContext, useRef, useState } from "react";
  import { currentUserContext } from "../../../Controler/App";
  
  const JobModal = ({ onOpen, isOpen, onClose }) => {
    const { currentUser, setCurrentUser } = useContext(currentUserContext);
    const inputRef = useRef();
    const [submitting, setSubmitting] = useState(false);
    const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  
    const changeJob = async (job) => {
      await axios
        .put(
          process.env.REACT_APP_API_URL + "/api/user/job/" + currentUser._id,
          {
            job,
          }
        )
        .then(
          (res) => {
            setSubmitting(false);
            setDeleteSubmitting(false);
            setCurrentUser({ ...currentUser, job: res.data.job });
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
          <ModalHeader paddingX={3}>Changer votre profession</ModalHeader>
          <ModalBody paddingX={3}>
            <Input
              placeholder={currentUser.job ?? "Mpivarotra charbon"}
              type="text" defaultValue={currentUser.job?? null}
              ref={inputRef}
            />
          </ModalBody>
          <ModalFooter justifyContent={currentUser.job ? "space-between" : 'flex-end'} paddingX={3}>
            {currentUser.job && (
              <Button isLoading={deleteSubmitting}
                onClick={() => {
                  changeJob("");
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
                  changeJob(inputRef.current.value);
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
  
  export default JobModal;
  