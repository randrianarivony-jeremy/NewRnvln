import { Box, Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { arrowBack, chatbox } from "ionicons/icons";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader, Scroll } from "../../Component/Miscellanous";
import { currentUserContext } from "../../Controler/App";
import { useFetchUserQuery } from "../../Controler/Redux/Features/userSlice";
import ContentsTab from "./Contents/ContentsTab";
import FriendHandler from "./Relation/FriendHandler";
import RelationBoard from "./Relation/RelationBoard";
import Subscribe from "./Relation/Subscribe";
import UserProfilepic from "./UserProfilepic";

export const userContext = createContext();

const UserProfile = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(currentUserContext);
  const { userId } = useParams();
  const { data, isLoading, isSuccess, isError } = useFetchUserQuery(userId);
  const [user, setUser] = useState();
  const [friend, setFriend] = useState("none");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (isSuccess) setUser(data);
  }, [isSuccess]);

  useEffect(() => {
    if (currentUser.subscriptions.includes(userId)) setSubscribed(true);
    if (currentUser.friends.includes(userId)) setFriend("friend");
    else {
      if (currentUser.friendRequest.includes(userId)) setFriend("request");
      else {
        if (currentUser.friendInvitation.includes(userId))
          setFriend("invitation");
        else setFriend("none");
      }
    }
  }, [currentUser]);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p>
        Une erreur est survenue lors du chargement. Veuillez réessayer plus
        tard.
      </p>
    );
  if (isSuccess && user) {
    return (
      <Stack height="100%" spacing={0}>
        <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
          <Button boxSize={12} onClick={() => navigate(-1)}>
            <IonIcon icon={arrowBack} />
          </Button>
          <Button size={"lg"} paddingX={0}>
            Profil utilisateur
          </Button>
        </Flex>

        <userContext.Provider value={{ user, setUser }}>
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
              <HStack>
                {friend === "friend" && <FriendHandler />}
                <Button
                  width={"100%"}
                  variant={
                    (friend === "invitation" && subscribed) ||
                    friend === "friend"
                      ? "primary"
                      : "solid"
                  }
                  leftIcon={<IonIcon icon={chatbox} />}
                >
                  Envoyer un message
                </Button>
              </HStack>
              {friend !== "friend" && (
                <HStack justify="space-around" width="100%">
                  <FriendHandler />
                  <Subscribe />
                </HStack>
              )}
              <RelationBoard user={user} />
            </Stack>

            <ContentsTab userId={user._id} />
          </Scroll>
        </userContext.Provider>
      </Stack>
    );
  }
};

export default UserProfile;
