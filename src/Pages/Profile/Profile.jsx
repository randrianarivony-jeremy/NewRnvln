import {Avatar,Box,Button,Flex,HStack,Image,Stack,Tab,TabList,TabPanel,TabPanels,Tabs,Text,} from "@chakra-ui/react";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Component/Navigation";
import {currentUserContext, data} from "../../Controler/App";
import { Scroll } from "../../Styles/Theme";
import RelationList from "./RelationList";
import Thumbs from "./Thumbs";

const Profile = () => {
  const {currentUser}=useContext(currentUserContext);
  const navigate = useNavigate();

  return (
    <>
    {currentUser ? <Stack height="100%" spacing={0} maxWidth='100%'>
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
          {currentUser.picture ? <Image src={currentUser.picture} alt='profile_pic' boxSize={12} rounded='full' objectFit='cover'/>
          :<Avatar size="md"/>}
          <Box overflowX='hidden'>
            <Text fontWeight='bold'>{currentUser.name}</Text>
            <Box marginLeft={3} fontSize="sm">
              <Text>
                {currentUser?.job ?? 'Activité'} <span className="bi-pencil"></span>
              </Text>
              <Text>
                {currentUser.address ?? 'Bureau'} <span className="bi-pencil"></span>
              </Text>
              <Text>
                {currentUser.project ?? 'Projet'} <span className="bi-pencil"></span>
              </Text>
            </Box>
          </Box>
        </HStack>
        {currentUser.philosophy ? 
        <Text>{currentUser.philosophy}</Text>
        : <Button
          variant="outline"
          minHeight={10}
          rightIcon={<span className="bi-pencil"></span>}
        >
          Ajouter votre philosophie de l'argent
        </Button>}
        <HStack justify="space-around">
          <RelationList category="Followings" list={currentUser.followings} />
          <RelationList category="Followers" list={currentUser.followers} />
          {currentUser.subscription ? <><RelationList category="Abonnements" list={currentUser.subscriptions} />
          <RelationList category="Abonnés" list={currentUser.subscribers} /></> :
          <Button variant='outline'>Activer l'abonnement</Button>}
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
              <Flex align='center' justify='center' height='100px'><Text fontWeight='bold' fontSize='3xl' textAlign='center'>{currentUser.wallet} kAr</Text></Flex>
              
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Scroll>

      <Navigation />
    </Stack> : <Stack height="100%" maxWidth='100%' justify='center' paddingX={3}>
      <Image paddingX={3} paddingY={2}
      src='https://firebasestorage.googleapis.com/v0/b/rnvln-611b7.appspot.com/o/tantsaha.jpg?alt=media&token=75326712-8b3e-4d4e-af41-5ca288ee5591' alt='illustration'/>
      <Button variant='cta'>Se connecter</Button>
      <Button onClick={() => navigate(-1)}>Retour</Button>
      </Stack>}
    </>
  );
};

export default Profile;
