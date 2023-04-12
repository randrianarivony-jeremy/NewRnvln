import {Avatar,Box,Button,Flex,HStack,Stack,Tab,TabList,TabPanel,TabPanels,Tabs,Text,} from "@chakra-ui/react";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Component/Navigation";
import {data,followers,followings,subscribers,subscriptions,} from "../../Controler/App";
import { Scroll } from "../../Styles/Theme";
import RelationList from "./RelationList";
import Thumbs from "./Thumbs";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <Stack height="100%" spacing={0} maxWidth='100%'>
      <Flex
        justify="space-between"
        borderBottom="1px solid"
        borderBottomColor="whiteAlpha.500"
      >
        <Button
          variant="float"
          className="bi-arrow-left"
          onClick={() => navigate(-1)}
        ></Button>
        <Button>Profil</Button>
        <Button
          variant="float"
          className="bi-gear"
          onClick={() => navigate("/parameters")}
        ></Button>
      </Flex>
      <Scroll paddingX={3}
        spacing={5}
        height='100%'
      >
        <HStack align="center" spacing={3}>
          <Avatar size="md"/>
          <Box overflowX='hidden'>
            <Text fontSize="sm" fontWeight='bold'>Username</Text>
            <Box marginLeft={3}>
              <Text>
                Activity <span className="bi-pencil"></span>
              </Text>
              <Text>
                Place <span className="bi-pencil"></span>
              </Text>
              <Text>
                Projet <span className="bi-pencil"></span>
              </Text>
            </Box>
          </Box>
        </HStack>
        <Button
          variant="outline"
          minHeight={10}
          rightIcon={<span className="bi-pencil"></span>}
        >
          Ajouter votre philosophie de l'argent
        </Button>
        <HStack justify="space-around">
          <RelationList category="Followings" list={followings} />
          <RelationList category="Followers" list={followers} />
          <RelationList category="Abonnements" list={subscriptions} />
          <RelationList category="Abonnés" list={subscribers} />
        </HStack>
        <Tabs size="sm" isFitted height="100%"  isLazy={true}>
          <TabList>
            <Tab width='25%'>
              <Stack spacing={0}>
                  <FontAwesomeIcon size="xl" icon={faComments} />
                <Text fontSize="xs">Interviews</Text>
              </Stack>
            </Tab>
            <Tab width='25%'>
              <Stack spacing={0}>
                <Text fontSize='xl' className="bi-grid-3x3-gap"></Text>
                <Text fontSize="xs">Publications</Text>
              </Stack>
            </Tab>
            <Tab width='25%'>
              <Stack spacing={0}>
                <Text fontSize='xl' className="bi-bookmark"></Text>
                <Text fontSize="xs">Enregistrements</Text>
              </Stack>
            </Tab>
            <Tab width='25%'>
              <Stack spacing={0}>
                <Text fontSize='xl' className="bi-wallet2"></Text>
                <Text fontSize="xs">Portefeuille</Text>
              </Stack>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel paddingY={1} paddingX={0}>
              <Flex wrap="wrap" justify="center">
                {data.map((elt, key) => (
                  <Thumbs data={elt} key={key} />
                ))}
              </Flex>
            </TabPanel>
            <TabPanel paddingY={1} paddingX={0}>
              <Flex wrap="wrap" justify="center">
                {data.map((elt, key) => (
                  <Thumbs data={elt} key={key} />
                ))}
              </Flex>
            </TabPanel>
            <TabPanel paddingY={1} paddingX={0}>
              <Flex wrap="wrap" justify="center">
                {data.map((elt, key) => (
                  <Thumbs data={elt} key={key} />
                ))}
              </Flex>
            </TabPanel>
            <TabPanel paddingY={1} paddingX={0}>
              <Flex justify='flex-end'><Button variant='outline'>Transfert</Button></Flex>
              <Flex align='center' justify='center' height='100px'><Text fontWeight='bold' fontSize='3xl' textAlign='center'>78 kAr</Text></Flex>
              
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Scroll>

      <Navigation />
    </Stack>
  );
};

export default Profile;
