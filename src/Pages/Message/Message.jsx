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
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "../../Component/Navigation";
import MainConversation from "./MainConversation";
import SecondaryConversation from "./SecondaryConversation";

const Message = () => {
  const { newMainMessage, newSecondMessage } = useSelector(
    (state) => state.token
  );
  const [searchParams] = useSearchParams();
  const defaultIndex = useRef(
    searchParams.get("default_tabs") === "main" ? 0 : 1
  );
  const navigate = useNavigate();

  return (
    <Stack height="100%" spacing={0} position="relative">
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button width="100%">Message</Button>
      </Flex>
      <Tabs
        isFitted
        height="100%"
        isLazy={true}
        defaultIndex={defaultIndex.current}
      >
        <TabList>
          <Tab>
            Principal &nbsp;
            {newMainMessage > 0 && (
              <Badge bgColor="red">{newMainMessage}</Badge>
            )}
          </Tab>
          <Tab>
            Autres &nbsp;
            {newSecondMessage > 0 && (
              <Badge bgColor="red">{newSecondMessage}</Badge>
            )}
          </Tab>
        </TabList>
        <TabPanels height={"calc(100% - 42px)"}>
          <TabPanel padding={0} height={"100%"}>
            <MainConversation />
          </TabPanel>
          <TabPanel padding={0} height={"100%"}>
            <SecondaryConversation />
          </TabPanel>
        </TabPanels>
        <Button
          position={"absolute"}
          right={5}
          bottom={16}
          boxSize={16}
          rounded="full"
          variant={"primary"}
          fontSize="4xl"
          onClick={() => navigate("new")}
        >
          +
        </Button>
      </Tabs>
      <Navigation />
    </Stack>
  );
};

export default Message;
