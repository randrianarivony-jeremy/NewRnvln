import {
  Button,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import Navigation from "../../Component/Navigation";
import MainConversation from "./MainConversation";
import SecondaryConversation from "./SecondaryConversation";

const Message = () => {
  return (
    <Stack height="100%" spacing={0}>
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button width="100%">Message</Button>
      </Flex>
      <Tabs isFitted height='100%' isLazy={true}>
        <TabList>
          <Tab>Principal</Tab>
          <Tab>Autres</Tab>
        </TabList>
        <TabPanels>
          <TabPanel padding={0}><MainConversation/></TabPanel>
          <TabPanel padding={0}><SecondaryConversation/></TabPanel>
        </TabPanels>
      </Tabs>
      
      <Navigation />
    </Stack>
  );
};

export default Message;
