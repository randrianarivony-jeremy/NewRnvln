import {
  Button,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import InterviewSearchResult from "./InterviewSearchResult";
import PublicationSearchResult from "./PublicationSearchResult";
import QuestionSearchResult from "./QuestionSearchResult";
import UserSearchResult from "./UserSearchResult";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const defaultIndex = searchParams.get("default_index");
  const inputRef = useRef();
  const searchSubmit = useRef(false);

  return (
    <Stack>
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button variant="float" onClick={() => navigate(-1)}>
          <IonIcon icon={arrowBack} />
        </Button>
        <Button>Recherche</Button>
      </Flex>
      <Text>
        Résultats pour <b>"{keyword}"</b>
      </Text>
      <Tabs isLazy={true} width="100%">
        <TabList width={"100%"} overflowX={"auto"} className="scrollablefeed">
          <Tab>Personnes</Tab>
          <Tab>Publications</Tab>
          <Tab>Interviews</Tab>
          <Tab>Questions</Tab>
        </TabList>
        <TabPanels>
          <TabPanel padding={0}>
            <UserSearchResult />
          </TabPanel>
          <TabPanel padding={0}>
            <PublicationSearchResult />
          </TabPanel>
          <TabPanel padding={0}>
            <InterviewSearchResult />
          </TabPanel>
          <TabPanel padding={0}>
            <QuestionSearchResult />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default Search;
