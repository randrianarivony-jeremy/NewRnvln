import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import {
  help,
  homeOutline,
  logOutOutline,
  menuOutline,
  moonOutline,
  peopleOutline,
  settingsOutline,
  sunnyOutline,
} from "ionicons/icons";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { currentUserContext } from "../../Controler/App";
import { iconMd } from "../../Styles/Theme";
import Logout from "../Login/Logout";

const Menu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    onOpen: openLogoutModal,
    onClose: closeLogoutModal,
    isOpen: openedLogoutModal,
  } = useDisclosure();
  const { currentUser } = useContext(currentUserContext);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("whiteAlpha.900", "dark.50");

  return (
    <>
      <Button size={"lg"} position="absolute" zIndex={2} onClick={onOpen}>
        <IonIcon icon={menuOutline} style={{ fontSize: iconMd }} />
      </Button>
      <Drawer
        onOpen={onOpen}
        isOpen={isOpen}
        placement="left"
        onClose={() => {
          onClose();
          //   setLogoutModal(false);
        }}
      >
        <DrawerOverlay />
        <DrawerContent bgColor={bg}>
          <DrawerCloseButton />
          <DrawerHeader fontSize="md" fontWeight="bold">
            Menu
          </DrawerHeader>
          <DrawerBody paddingX={3} paddingY={0}>
            <Stack>
              <Button
                justifyContent="flex-start"
                onClick={() => {
                  navigate("/");
                  onClose();
                }}
                leftIcon={
                  <IonIcon
                    icon={homeOutline}
                    style={{ fontSize: iconMd, width: "40px" }}
                  />
                }
              >
                Accueil
              </Button>
              <Button
                justifyContent="flex-start"
                onClick={() => {
                  navigate("/subscriptions_only");
                  onClose();
                }}
                leftIcon={
                  <IonIcon
                    icon={peopleOutline}
                    style={{ fontSize: iconMd, width: "40px" }}
                  />
                }
              >
                Abonnements
              </Button>
              <Button
                justifyContent="flex-start"
                onClick={() => {
                  navigate("/questions_only");
                  onClose();
                }}
                leftIcon={
                  <IonIcon
                    icon={help}
                    style={{ fontSize: iconMd, width: "40px" }}
                  />
                }
              >
                Questionnaires
              </Button>
              <Button
                justifyContent="flex-start"
                onClick={() => navigate("/parameters")}
                leftIcon={
                  <IonIcon
                    icon={settingsOutline}
                    style={{ fontSize: iconMd, width: "40px" }}
                  />
                }
              >
                Paramètres
              </Button>
              <Button
                justifyContent="flex-start"
                onClick={toggleColorMode}
                leftIcon={
                  <IonIcon
                    icon={colorMode === "light" ? moonOutline : sunnyOutline}
                    style={{ fontSize: iconMd, width: "40px" }}
                  />
                }
              >
                <Text>
                  {colorMode === "light" ? "Dark mode" : "Light mode"}
                </Text>
              </Button>
              {currentUser && (
                <Button
                  justifyContent="flex-start"
                  onClick={openLogoutModal}
                  leftIcon={
                    <IonIcon
                      icon={logOutOutline}
                      style={{ fontSize: iconMd, width: "40px" }}
                    />
                  }
                >
                  Se déconnecter
                </Button>
              )}
              {currentUser ? (
                <Button variant="cta" onClick={() => navigate("/question")}>
                  Poser une question
                </Button>
              ) : (
                <Button variant="cta" onClick={() => navigate("/login")}>
                  Se connecter
                </Button>
              )}
            </Stack>
            <Logout
              onOpen={openLogoutModal}
              onClose={closeLogoutModal}
              isOpen={openedLogoutModal}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Menu;
