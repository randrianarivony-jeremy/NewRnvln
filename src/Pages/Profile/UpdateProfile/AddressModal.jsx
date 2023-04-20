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

const AddressModal = ({ onOpen, isOpen, onClose }) => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const inputRef = useRef();
  const [submitting, setSubmitting] = useState(false);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  const changeAddress = async (address) => {
    await axios
      .put(
        process.env.REACT_APP_API_URL + "/api/user/address/" + currentUser._id,
        {
          address,
        }
      )
      .then(
        (res) => {
          setSubmitting(false);
          setDeleteSubmitting(false);
          setCurrentUser({ ...currentUser, address: res.data.address });
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
        <ModalHeader paddingX={3}>Changer votre lieu de travail</ModalHeader>
        <ModalBody paddingX={3}>
          <Input
            placeholder={!currentUser.address && "Lieu de travail"}
            type="text" defaultValue={currentUser.address?? null}
            ref={inputRef}
          />
        </ModalBody>
        <ModalFooter justifyContent={currentUser.address ? "space-between" : 'flex-end'} paddingX={3}>
          {currentUser.address && (
            <Button isLoading={deleteSubmitting}
              onClick={() => {
                changeAddress("");
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
                changeAddress(inputRef.current.value);
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

export default AddressModal;
