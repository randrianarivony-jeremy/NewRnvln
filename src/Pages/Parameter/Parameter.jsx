import { Button, Flex, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClickableFlex,
  ErrorRender,
  Loader,
  Scroll,
} from "../../Component/Miscellanous";
import { currentUserContext } from "../../Controler/App";
import { useFetchUserQuery } from "../../Controler/Redux/Features/userSlice";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import ChangeUsername from "./ChangeUsername";

const Parameter = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(currentUserContext);
  const { isLoading, isSuccess, isError, error } = useFetchUserQuery(
    currentUser._id
  );
  const {
    isOpen: usernameDrawer,
    onOpen: openUsernameDrawer,
    onClose: closeUsernameDrawer,
  } = useDisclosure();
  const {
    isOpen: passwordDrawer,
    onOpen: openPasswordDrawer,
    onClose: closePasswordDrawer,
  } = useDisclosure();
  const {
    isOpen: emailDrawer,
    onOpen: openEmailDrawer,
    onClose: closeEmailDrawer,
  } = useDisclosure();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorRender isError={isError} error={error} />;
  if (isSuccess)
    return (
      <Stack height="100%">
        <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
          <Button variant="float" onClick={() => navigate(-1)}>
            <IonIcon icon={arrowBack} />
          </Button>
          <Button>Paramètres</Button>
        </Flex>
        <Scroll paddingX={3} height="100%">
          <Stack spacing={5}>
            <Stack>
              <Heading size="sm">Compte personnelle</Heading>
              <Stack spacing={0}>
                <ClickableFlex onClick={openUsernameDrawer}>
                  Nom d'utilisateur
                </ClickableFlex>
                <ChangeUsername
                  onOpen={openUsernameDrawer}
                  onClose={closeUsernameDrawer}
                  isOpen={usernameDrawer}
                />

                <ClickableFlex onClick={openEmailDrawer}>
                  Adresse email et numéro de téléphone
                </ClickableFlex>
                <ChangeEmail
                  onOpen={openEmailDrawer}
                  onClose={closeEmailDrawer}
                  isOpen={emailDrawer}
                />

                <ClickableFlex onClick={openPasswordDrawer}>
                  Mot de passe
                </ClickableFlex>
                <ChangePassword
                  onOpen={openPasswordDrawer}
                  onClose={closePasswordDrawer}
                  isOpen={passwordDrawer}
                />

                <ClickableFlex>Supprimer votre compte</ClickableFlex>
              </Stack>
            </Stack>
          </Stack>
        </Scroll>
      </Stack>
    );
};

export default Parameter;
