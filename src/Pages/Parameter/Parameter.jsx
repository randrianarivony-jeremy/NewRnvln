import {Button,Flex,Heading,Stack,Text, useDisclosure,} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClickableFlex, Scroll } from "../../Styles/Theme";
import ChangeUsername from "./ChangeUsername";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import ChangeFees from "./ChangeFees";
import { currentUserContext } from "../../Controler/App";
import EnableSubscription from "../Profile/Relation/EnableSubscription";
import DisableSubscription from "./DisableSubscription";

const Parameter = () => {
  const navigate = useNavigate();
  const {currentUser}=useContext(currentUserContext);
  const {isOpen:usernameDrawer,onOpen:openUsernameDrawer,onClose:closeUsernameDrawer}=useDisclosure();
  const {isOpen:passwordDrawer,onOpen:openPasswordDrawer,onClose:closePasswordDrawer}=useDisclosure();
  const {isOpen:emailDrawer,onOpen:openEmailDrawer,onClose:closeEmailDrawer}=useDisclosure();
  const {isOpen:feesDrawer,onOpen:openFeesDrawer,onClose:closeFeesDrawer}=useDisclosure();
  const {isOpen:cancelSubscriptionDrawer,onOpen:openCancelSubscriptionDrawer,onClose:closeCancelSubscriptionDrawer}=useDisclosure();

  return (
    <Stack height='100%'>
      <Flex borderBottom='1px solid' borderBottomColor='whiteAlpha.500'>
        <Button variant='float' className="bi-arrow-left" onClick={() => navigate(-1)}></Button>
        <Button>Paramètres</Button>
      </Flex>
      <Scroll paddingX={3} height='100%'>
        <Stack spacing={5}>
          <Stack>
            <Heading size="sm">Compte personnelle</Heading>
            <Stack spacing={0}>
            <ClickableFlex onClick={openUsernameDrawer}>
              Nom d'utilisateur
            </ClickableFlex>
            <ChangeUsername onOpen={openUsernameDrawer} onClose={closeUsernameDrawer} isOpen={usernameDrawer}/>
            
            <ClickableFlex onClick={openEmailDrawer}>
              Adresse email et numéro de téléphone
            </ClickableFlex>
            <ChangeEmail onOpen={openEmailDrawer} onClose={closeEmailDrawer} isOpen={emailDrawer}/>

            <ClickableFlex onClick={openPasswordDrawer}>
              Mot de passe
            </ClickableFlex>
            <ChangePassword onOpen={openPasswordDrawer} onClose={closePasswordDrawer} isOpen={passwordDrawer}/>

            <ClickableFlex>
              Supprimer votre compte
            </ClickableFlex>
            </Stack>
          </Stack>

          <Stack>
            <Heading size="sm">Abonnement</Heading>
            {currentUser.subscription ? (
              <Stack>
                <ClickableFlex justify='space-between' align='flex-end' onClick={openFeesDrawer}>
                  <Text>Montant</Text>
                  <Text fontSize='lg' fontWeight='bold'>{currentUser.fees}kAr</Text>
                </ClickableFlex >
                <ChangeFees  onOpen={openFeesDrawer} onClose={closeFeesDrawer} isOpen={feesDrawer}/>
                <ClickableFlex>
                  Débloquer la messagerie privée pour les non-abonnés
                </ClickableFlex>
                <ClickableFlex onClick={openCancelSubscriptionDrawer}>
                  Désactivez votre abonnement
                </ClickableFlex>
                <DisableSubscription onOpen={openCancelSubscriptionDrawer} onClose={closeCancelSubscriptionDrawer} isOpen={cancelSubscriptionDrawer}/>
              </Stack>
            ) : (
              <Stack>
                <Text fontSize="sm" paddingX={3}paddingY={2} bgColor='info' rounded='md' >
                  Activer l'abonnement vous permettra de ne montrer certains
                  contenus qu'à vos abonnés. Ces abonnés devront payer
                  mensuellement, à vous, une somme dont vous fixerez vous-même,
                  pour pouvoir voir et réagir à vos contenus payants, et vous
                  envoyer des messages privés.
                </Text>
                <EnableSubscription/>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Scroll>
    </Stack>
  );
};

export default Parameter;
