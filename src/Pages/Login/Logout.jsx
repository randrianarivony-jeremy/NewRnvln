import axios from "axios";
import React, { useContext } from "react";
import cookie from "js-cookie";
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,Button,useToast,useColorModeValue,ButtonGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { currentUserContext } from "../../Controler/App";

const Logout = ({onOpen,onClose,isOpen}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const {setCurrentUser}=useContext(currentUserContext);
  const bg = useColorModeValue('white','dark.0')

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const handleLogout = async () => {
    await axios.get(process.env.REACT_APP_API_URL+"/api/user/logout",
      {withCredentials: true},
    )
      .then((res) => {
        console.log(res);
        removeCookie("jwt");
        toast({
          title: "Vous avez déconnecté",
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setCurrentUser();
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
      <Modal isCentered onOpen={onOpen} onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bg={bg}>
          <ModalHeader>Déconnexion</ModalHeader>
          <ModalBody>Tena hi-déconnecte marina ve ?</ModalBody>
          <ModalFooter d='flex'>
            <ButtonGroup>
            <Button bgColor='transparent' onClick={handleLogout}>Confirmer</Button>
            <Button variant='outline' onClick={onClose}>Annuler</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
};

export default Logout;
