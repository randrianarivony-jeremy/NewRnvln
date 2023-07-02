import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../Controler/Redux/Features/authSlice";

const Logout = ({ onOpen, onClose, isOpen }) => {
  const navigate = useNavigate();
  const bg = useColorModeValue("white", "dark.50");
  const [sendLogout] = useSendLogoutMutation();

  return (
    <Modal isCentered onOpen={onOpen} onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent bg={bg}>
        <ModalHeader>Déconnexion</ModalHeader>
        <ModalBody>Voulez vous vraiment vous déconnecter ?</ModalBody>
        <ModalFooter d="flex">
          <ButtonGroup>
            <Button
              variant="dissuasive"
              onClick={() => {
                sendLogout();
                navigate("/login");
              }}
            >
              Se déconnecter
            </Button>
            <Button onClick={onClose}>Annuler</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Logout;
