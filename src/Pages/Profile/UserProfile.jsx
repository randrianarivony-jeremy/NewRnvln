import {Avatar,Box,Button,Flex,HStack,Stack,Tab,TabList,TabPanel,TabPanels,Tabs,Text,useDisclosure,} from "@chakra-ui/react";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import SubscribeDrawer from "../../Component/SubscribeDrawer";
import {data,followers,followings,subscribers,subscriptions,} from "../../Controler/App";
import { Scroll } from "../../Styles/Theme";
import RelationList from "./RelationList";
import Thumbs from "./Thumbs";

const Profile = () => {
  const navigate = useNavigate();
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <Stack height="100%" spacing={0}>
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button
          variant="float"
          className="bi-arrow-left"
          onClick={() => navigate(-1)}
        ></Button>
        <Button>Profil utilisateur</Button>
      </Flex>
      <Scroll
        paddingX={3} paddingY={2}
        spacing={5}
        height='100%'
      >
        <HStack align="flex-start" spacing={3}>
          <Avatar size="md" />
          <Box overflowX='hidden'>
            <Text size="sm" fontWeight='bold'>Username</Text>
            <Box marginLeft={5}>
              <Text>Activity </Text>
              <Text>Place </Text>
              <Text>Projet </Text>
            </Box>
          </Box>
        </HStack>
        <Text fontSize="sm" textAlign="center" fontStyle="italic">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ut
          tenetur exercitationem nesciunt mollitia corporis minima accusamus
          quod explicabo alias?
        </Text>
        <HStack justify="space-around">
          <Button width="100%" variant="outline" rounded="full">
            Suivre
          </Button>
          <Button width="100%" variant="cta" onClick={onOpen}>
            S'abonner
          </Button>
          <SubscribeDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        </HStack>
        <HStack justify="space-around">
          <RelationList category="Followings" list={followings} />
          <RelationList category="Followers" list={followers} />
          <RelationList category="Abonnements" list={subscriptions} />
          <RelationList category="Abonnés" list={subscribers} />
        </HStack>
        <Tabs size="sm" isFitted height="100%" isLazy={true}>
          <TabList>
            <Tab>
              <Stack spacing={0}>
                  <FontAwesomeIcon size='xl' icon={faComments} />
                <Text fontSize="xs">Interviews</Text>
              </Stack>
            </Tab>
            <Tab>
              <Stack spacing={0}>
                <Text fontSize='xl' className="bi-grid-3x3-gap"></Text>
                <Text fontSize="xs">Publications</Text>
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
          </TabPanels>
        </Tabs>
      </Scroll>
    </Stack>
  );
};

export default Profile;
