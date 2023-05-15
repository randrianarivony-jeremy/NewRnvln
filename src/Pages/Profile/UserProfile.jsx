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
} from "@chakra-ui/react";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../Controler/Routes";
import { Scroll } from "../../Styles/Theme";
import UserInterviews from "./Contents/UserInterviews";
import UserArticles from "./Contents/UserArticles";
import FriendHandler from "./Relation/FriendHandler";
import RelationList from "./Relation/RelationList";
import Subscribe from "./Relation/Subscribe";
import UserProfilepic from "./UserProfilepic";
import { apiCall } from "../../Controler/App";

export const userContext = createContext();

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState();

  const fetchUser = async () => {
    await apiCall.get( "user/user/" + userId).then(
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

      <userContext.Provider value={{ user, setUser }}>
        {user ? (
          <Scroll paddingX={2} paddingY={2} spacing={5} height="100%">
            {/* A B O U T  */}
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
                  {user.job !== "" && (
                    <HStack align="flex-start">
                      <span className="bi-briefcase-fill"></span>
                      <Text>{user.job} </Text>
                    </HStack>
                  )}
                  {user.address !== "" && (
                    <HStack align="flex-start">
                      <span className="bi-geo-alt-fill"></span>
                      <Text>{user.address} </Text>
                    </HStack>
                  )}
                  {user.project !== "" && (
                    <HStack align="flex-start">
                      <span className="bi-flag-fill"></span>
                      <Text>{user.project} </Text>
                    </HStack>
                  )}
                </Box>
              </Box>
            </HStack>

            {/* P H I L O  */}
            {user.philosophy && (
              <Text fontSize="sm" textAlign="center" fontStyle="italic">
                <span className="bi-quote"></span>
                {user.philosophy}
                <span className="bi-quote"></span>
              </Text>
            )}

            {/* R E L A T I O N  */}
            <Stack>
              <HStack justify="space-around" width="100%">
                <FriendHandler/>
                {user.subscription ? (
                  <Subscribe
                  />
                ) : 
                <Button variant='outline' width='100%' leftIcon={<Flex className='bi-chat-left'></Flex>} onClick={()=>navigate("/chat/"+user._id)}>Message</Button>
                }
              </HStack>
              <HStack justify="space-around" width="100%">
                {user.subscription && (
                  <>
                    <RelationList
                      category="Abonnements"
                      userId={userId} length={user.subscriptions.length}
                    />
                    <RelationList category="Abonnés" userId={userId} length={user.subscribers.length}/>
                  </>
                )}
              </HStack>
            </Stack>

            {/* P O S T S  */}
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
                  <UserInterviews user={user._id}/>
                </TabPanel>
                <TabPanel paddingY={1} paddingX={0}>
                  <UserArticles user={user._id}/>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Scroll>
        ) : (
          <Loader />
        )}
      </userContext.Provider>
    </Stack>
  );
};

export default UserProfile;
