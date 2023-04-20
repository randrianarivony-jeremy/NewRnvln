import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubscribeDrawer from "../../Component/SubscribeDrawer";
import {
  data,
  followers,
  followings,
  subscribers,
  subscriptions,
} from "../../Controler/App";
import { Loader } from "../../Controler/Routes";
import { Scroll } from "../../Styles/Theme";
import RelationList from "./RelationList";
import Thumbs from "./Thumbs";
import UserProfilepic from "./UserProfilepic";

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [user, setUser] = useState();

  const fetchUser = async () => {
    await axios.get(process.env.REACT_APP_API_URL + "/api/user/" + userId).then(
      (res) => setUser(res.data),
      () => {
        navigate(-1);
      }
    );
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
      {user ? (
        <Scroll paddingX={2} paddingY={2} spacing={5} height="100%">
          <HStack align="flex-start" spacing={3}>
            <UserProfilepic picture={user.picture} />
            <Box overflowX="hidden">
              <Text
                maxWidth="calc(100vw - 100px)"
                fontWeight="bold"
                fontSize="lg"
              >
                {user.name}
              </Text>
              <Box marginLeft={3} fontSize="sm">
                {user.job!=='' && <HStack align="flex-start">
                  <span className="bi-briefcase-fill"></span>
                  <Text>{user.job} </Text>
                </HStack>}
                {user.address!=='' && <HStack align="flex-start">
                  <span className="bi-geo-alt-fill"></span>
                  <Text>{user.address} </Text>
                </HStack>}
                {user.project!=='' && <HStack align="flex-start">
                  <span className="bi-flag-fill"></span>
                  <Text>{user.project} </Text>
                </HStack>}
              </Box>
            </Box>
          </HStack>
          {user.philosophy && (
            <Text fontSize="sm" textAlign="center" fontStyle="italic">
              <span className="bi-quote"></span>
              {user.philosophy}
              <span className="bi-quote"></span>
            </Text>
          )}
          <HStack justify="space-around">
            <Button width="100%" variant="outline" rounded="full">
              Suivre
            </Button>
            <Button width="100%" variant="cta" onClick={onOpen}>
              S'abonner
            </Button>
            <SubscribeDrawer
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            />
          </HStack>
          <HStack justify="space-around">
            <RelationList category="Followings" list={user.followings} />
            <RelationList category="Followers" list={user.followers} />
            <RelationList category="Abonnements" list={user.subscriptions} />
            <RelationList category="Abonnés" list={user.subscribers} />
          </HStack>
          <Tabs size="sm" isFitted height="100%" isLazy={true}>
            <TabList>
              <Tab>
                <Stack spacing={0}>
                  <FontAwesomeIcon size="xl" icon={faComments} />
                  <Text fontSize="xs">Interviews</Text>
                </Stack>
              </Tab>
              <Tab>
                <Stack spacing={0}>
                  <Text fontSize="xl" className="bi-grid-3x3-gap"></Text>
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
      ) : (
        <Loader />
      )}
    </Stack>
  );
};

export default UserProfile;
