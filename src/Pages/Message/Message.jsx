import {
  Badge,
  Button,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import Navigation from "../../Component/Navigation";
import { socketContext } from "../../Controler/Socketio/RealtimeSocketContext";
import MainConversation from "./MainConversation";
import SecondaryConversation from "./SecondaryConversation";

const Message = () => {
  const {newMainMessage,newSecondMessage}=useContext(socketContext);

  return (
    <Stack height="100%" spacing={0}>
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button width="100%">Message</Button>
      </Flex>
      <Tabs isFitted height='100%' isLazy={true}>
        <TabList>
          <Tab>Principal &nbsp;
          {newMainMessage > 0 && <Badge bgColor='red'>{newMainMessage}</Badge>}
          </Tab>
          <Tab>Autres &nbsp;
          {newSecondMessage>0 && <Badge bgColor='red'>{newSecondMessage}</Badge>}
          </Tab>
        </TabList>
        <TabPanels height={'calc(100% - 42px)'}>
          <TabPanel padding={0} height={'100%'}><MainConversation/></TabPanel>
          <TabPanel padding={0} height={'100%'}><SecondaryConversation/></TabPanel>
        </TabPanels>
      </Tabs>
      
      <Navigation />
    </Stack>
  );
};

export default Message;
