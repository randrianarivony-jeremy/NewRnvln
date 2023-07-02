// prettier-ignore
import { Button, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
// prettier-ignore
import { apps, bookmarkOutline, walletOutline } from "ionicons/icons";
import React, { useContext } from "react";
import { currentUserContext } from "../../../Controler/App";
import { userSlice } from "../../../Controler/Redux/Features/userSlice";
import UserArticles from "./UserArticles";
import UserInterviews from "./UserInterviews";

const ContentsTab = ({ userId }) => {
  const { currentUser } = useContext(currentUserContext);
  const { wallet } = userSlice.endpoints.fetchUser.useQueryState(
    currentUser._id,
    { selectFromResult: ({ data }) => ({ wallet: data.wallet }) }
  );
  return (
    <Tabs size="sm" isFitted height="100%" isLazy={true}>
      <TabList>
        <Tab width="25%">
          <Stack spacing={0}>
            <FontAwesomeIcon size="xl" icon={faComments} />
            <Text fontSize="xs">Interviews</Text>
          </Stack>
        </Tab>
        <Tab width="25%">
          <Stack spacing={0}>
            <Text fontSize="xl">
              <IonIcon icon={apps} />
            </Text>
            <Text fontSize="xs">Publications</Text>
          </Stack>
        </Tab>
        {userId === currentUser._id && (
          <Tab width="25%" overflowX="hidden">
            <Stack spacing={0}>
              <Text fontSize="xl">
                <IonIcon icon={bookmarkOutline} />
              </Text>
              <Text fontSize="xs">Enregistrements</Text>
            </Stack>
          </Tab>
        )}
        {userId === currentUser._id && (
          <Tab width="25%">
            <Stack spacing={0}>
              <Text fontSize="xl">
                <IonIcon icon={walletOutline} />
              </Text>
              <Text fontSize="xs">Portefeuille</Text>
            </Stack>
          </Tab>
        )}
      </TabList>

      <TabPanels>
        <TabPanel paddingY={1} paddingX={0}>
          <UserInterviews user={userId} />
        </TabPanel>
        <TabPanel paddingY={1} paddingX={0}>
          <UserArticles user={userId} />
        </TabPanel>
        {userId === currentUser._id && (
          <TabPanel paddingY={1} paddingX={0}>
            <Flex wrap="wrap" justify="center">
              EMPTY STATE
            </Flex>
          </TabPanel>
        )}
        {userId === currentUser._id && (
          <TabPanel paddingY={1} paddingX={0}>
            <Flex justify="flex-end">
              <Button variant="outline">Transfert</Button>
            </Flex>
            <Flex align="center" justify="center" height="100px">
              <Text fontWeight="bold" fontSize="3xl" textAlign="center">
                {wallet} kA
              </Text>
            </Flex>
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  );
};

export default ContentsTab;
