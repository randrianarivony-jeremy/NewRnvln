import {Button,Flex,Heading,Stack,Text,} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClickableFlex } from "../../Styles/Theme";

const Parameter = () => {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(false);
  return (
    <>
      <Flex borderBottom='1px solid' borderBottomColor='whiteAlpha.500'>
        <Button variant='float' className="bi-arrow-left" onClick={() => navigate(-1)}></Button>
        <Button>Paramètres</Button>
      </Flex>
      <Stack paddingX={3} paddingY={2}>
        <Stack spacing={5}>
          <Stack>
            <Heading size="sm">Compte personnelle</Heading>
            <Stack spacing={0}>
            <ClickableFlex>
              Nom d'utilisateur
            </ClickableFlex>
            <ClickableFlex>
              Adresse email et numéro de téléphone
            </ClickableFlex>
            <ClickableFlex>
              Activité et lieu
            </ClickableFlex>
            <ClickableFlex>
              Mot de passe
            </ClickableFlex>
            <ClickableFlex>
              Supprimer votre compte
            </ClickableFlex>
            </Stack>
          </Stack>

          <Stack>
            <Heading size="sm">Abonnement</Heading>
            {subscription ? (
              <Stack>
                <ClickableFlex>
                  Montant
                </ClickableFlex>
                <ClickableFlex>
                  Débloquer la messagerie privée pour les non-abonnés
                </ClickableFlex>
                <ClickableFlex>
                  Désactivez votre abonnement
                </ClickableFlex>
              </Stack>
            ) : (
              <Stack>
                <Text fontSize="sm" paddingX={3}paddingY={2} bgColor='info' borderRadius={10} >
                  Activer l'abonnement vous permettra de ne montrer certains
                  contenus qu'à vos abonnés. Ces abonnés devront payer
                  mensuellement, à vous, une somme dont vous fixerez vous-même,
                  pour pouvoir voir et réagir à vos contenus payants, et vous
                  envoyer des messages privés.
                </Text>
                <Button variant="cta" size="md" onClick={() => setSubscription(true)} >
                  Activer l'abonnement
                </Button>
              </Stack>
            )}
          </Stack>
          
          <Stack>
            <Heading size="sm">Portefeuille</Heading>
            <Stack spacing={0}>
            <ClickableFlex>
              Montant
            </ClickableFlex>
            <ClickableFlex>
              Débloquer la messagerie privée pour les non-abonnés
            </ClickableFlex>
            <ClickableFlex>
              Désactivez votre abonnement
            </ClickableFlex>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Parameter;
