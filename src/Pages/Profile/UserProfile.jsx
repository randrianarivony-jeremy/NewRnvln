import { Box, Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorRender, Loader, Scroll } from "../../Component/Miscellanous";
import { currentUserContext } from "../../Controler/App";
import { useFetchUserQuery } from "../../Controler/Redux/Features/userSlice";
import ContentsTab from "./Contents/ContentsTab";
import RelationBoard from "./Relation/RelationBoard";
import RelationPanel from "./Relation/RelationPanel";
import UserProfilepic from "./UserProfilepic";

const UserProfile = () => {
  const { currentUser } = useContext(currentUserContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useFetchUserQuery(userId);
  const {
    isSuccess: myUserSuccess,
    myUserIsError,
    myUserError,
  } = useFetchUserQuery(currentUser._id);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorRender isError={isError} error={error} />;
  if (isSuccess) {
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
            <RelationPanel />
            <RelationBoard userId={user._id} />
          </Stack>

          {myUserSuccess ? (
            <ContentsTab userId={user._id} />
          ) : (
            myUserIsError && (
              <ErrorRender isError={myUserIsError} error={myUserError} />
            )
          )}
        </Scroll>
      </Stack>
    );
  }
};

export default UserProfile;
