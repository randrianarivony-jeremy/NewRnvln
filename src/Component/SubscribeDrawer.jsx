import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

const SubscribeDrawer = ({ onOpen, isOpen, onClose }) => {
  let currentDate = new Date();
  const [passwordErr, setPasswordErr] = useState(false);

  const handleDateFormat = () => {
    return currentDate.toLocaleString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const thirtyDaysFromNow = () => {
    currentDate.setDate(currentDate.getDate() + 30);
    return currentDate.toLocaleString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <>
      <Drawer
        onOpen={onOpen}
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign="center" fontSize='sm'>
            S'abonner à
          </DrawerHeader>
          <DrawerBody paddingX={2}>
            <Stack spacing={5}>
              <Flex>
                <Avatar size="md" />
                <Stack spacing={0} marginLeft={2} justify="center">
                  <Heading size="sm">Username</Heading>
                  <Text fontStyle="italic">UserJob</Text>
                </Stack>
              </Flex>
              <Text>
                Frais d'abonnement : <span fontSize="xl">12</span> kAr
              </Text>
              <Text>
                Votre portefeuille actuelle : <span fontSize="xl">78</span> kAr
              </Text>
              <Box>
                <Text
                  width="90%"
                  margin="auto"
                  bgColor="info"
                  rounded="md"
                  paddingX={3}
                  paddingY={2}
                >
                  <span fontSize="xl">78</span> kAr sera déduit de votre
                  portefeuille. Cet abonnement vous permettra de voir tous les
                  contenus publiés par Username, pour une période de 30 jours à
                  compter de ce jour, le {handleDateFormat()}
                </Text>
              </Box>
              <Text>Fin de l'abonnement: {thirtyDaysFromNow()}</Text>
              <Checkbox colorScheme="green">
                Se réabonner automatiquement
              </Checkbox>
              <FormControl isInvalid={passwordErr}>
                <FormLabel>
                  Pour confirmer votre abonnement, entrez votre mot de passe :
                </FormLabel>
                <Input
                  type="password"
                  onChange={() => setPasswordErr(!passwordErr)}
                />
                {passwordErr && (
                  <FormErrorMessage fontStyle="italic">
                    Mot de passe incorrect
                  </FormErrorMessage>
                )}
              </FormControl>
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <HStack>
              <Button width="100%" onClick={onClose}>
                Annuler
              </Button>
              <Button variant="primary" width="100%" onClick={onClose}>
                Confirmer
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SubscribeDrawer;
