import { Button, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/RANAVALONA.png";

const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button variant="float" onClick={() => navigate(-1)}>
          <IonIcon icon={arrowBack} />
        </Button>
        <Button>A propos</Button>
      </Flex>
      <Flex justify={"center"} align="center" flexDir={"column"} height={200}>
        <Image src={logo} alt="logo" height={75} />
        <Heading size={"lg"}>Plusvaloo</Heading>
      </Flex>
      <Stack spacing={10} paddingBottom={5} paddingX={3}>
        <Stack spacing={5}>
          <Heading size={"md"}>Ce que nous faisons :</Heading>
          <Text>
            Imagineo hoe misy base de donnée iray dia hita ao daholo ny fomba
            ahitana vola rehetra miaraka amin'ny "ingredients" sy ny "recette"
            hampiodinana azy.
          </Text>
          <Text>
            Hitanareo ohatra hoe hitanao tsy ampy mpivaro-kena eo amin'ny
            quartier anao.
          </Text>
          <ul style={{ marginLeft: 40 }}>
            <li>Ahoana ny atao raha hanangana fivarotan-kena ?</li>
            <li>Inona avy ny étape arahana ? ("Recette")</li>
            <li>Mila fonds ve ? Raha mila dia hoatrinona ?</li>
            <li>Iza daholo ny mpivaro-kena azonao iresahana ?</li>
            <li>
              Inona daholo ny compétences mila ananana raha hisehatra amin'izany
              ?
            </li>
            <li>Inona daholo ny fitaovana mila atao vonona ?</li>
            <li>Ho vitanao irery ve ny mampiodina azy sa mila mpanampy ?</li>
            <li>Sao dia misy namanao liana koa hiaraka hanao azy ?</li>
            <li>
              Tahatahaka ny ahoana izany fiainana mivaro-kena izany ? Hety
              aminao ve ?
            </li>
            <li>
              Misy matières premières ilaina ve ? Raha misy dia aiza ny ahitanao
              fournisseur ?
            </li>
            <li>...</li>
          </ul>
          <Text>
            Hifampizara information hoatrin'izany ny hatao ato amin'ny
            Plusvaloo.
          </Text>
        </Stack>
        <Stack>
          <Heading size={"md"}>Notre vision :</Heading>
          <Text>Hanana activités mahavelona azy ny rehetra.</Text>
        </Stack>
      </Stack>
    </>
  );
};

export default About;
