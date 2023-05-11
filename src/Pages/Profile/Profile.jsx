import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
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
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Component/Navigation";
import { currentUserContext, data } from "../../Controler/App";
import { Scroll } from "../../Styles/Theme";
import UserInterviews from "./Contents/UserInterviews";
import UserArticles from "./Contents/UserArticles";
import EnableSubscription from "./Relation/EnableSubscription";
import RelationList from "./Relation/RelationList";
import Thumbs from "./Thumbs";
import AddressModal from "./UpdateProfile/AddressModal";
import JobModal from "./UpdateProfile/JobModal";
import PhilosophyModal from "./UpdateProfile/PhilosophyModal";
import ProfilePicture from "./UpdateProfile/ProfilePicture";
import ProjectModal from "./UpdateProfile/ProjectModal";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const navigate = useNavigate();
  const {
    onOpen: openAddressModal,
    isOpen: addressModal,
    onClose: closeAddressModal,
  } = useDisclosure();
  const {
    onOpen: openJobModal,
    isOpen: jobModal,
    onClose: closeJobModal,
  } = useDisclosure();
  const {
    onOpen: openProjectModal,
    isOpen: projectModal,
    onClose: closeProjectModal,
  } = useDisclosure();
  const {
    onOpen: openPhilosophyModal,
    isOpen: philosophyModal,
    onClose: closePhilosophyModal,
  } = useDisclosure();

  const fetchUser = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/api/user/" + currentUser._id)
      .then(
        (res) => setCurrentUser(res.data),
        () => {
          navigate(-1);
        }
      );
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {currentUser ? (
        <Stack
          position="relative"
          height="100%"
          spacing={0}
          maxWidth="100%"
          minH={450}
        >
          <Flex
            justify="space-between"
            borderBottom="1px solid"
            borderBottomColor="whiteAlpha.500"
          >
            <Button
              variant="float"
              className="bi-arrow-left"
              onClick={() => navigate(-1)}
            ></Button>
            <Button>Profil</Button>
            <Button
              variant="float"
              className="bi-gear"
              onClick={() => navigate("/parameters")}
            ></Button>
          </Flex>
          <Scroll paddingX={2} spacing={5} height="100%">
            {/* A B O U T  */}
            <HStack align="center" spacing={3}>
              <ProfilePicture />
              <Box>
                <Text
                  maxWidth="calc(100vw - 100px)"
                  fontWeight="bold"
                  fontSize="lg"
                >
                  {currentUser.name}
                </Text>
                <Stack spacing={0} marginLeft={3} fontSize="sm">
                  {/* JOB  */}
                  <HStack align="flex-start">
                    <span className="bi-briefcase-fill"></span>
                    {currentUser.job === "" ? (
                      <Button
                        size="sm"
                        variant="link"
                        onClick={openJobModal}
                        justifyContent="flex-start"
                      >
                        Ajouter votre profession
                      </Button>
                    ) : (
                      <Text onClick={openJobModal}>
                        {currentUser.job} <span className="bi-pencil"></span>
                      </Text>
                    )}
                  </HStack>
                  <JobModal
                    isOpen={jobModal}
                    onOpen={openJobModal}
                    onClose={closeJobModal}
                  />

                  {/* ADDRESS  */}
                  <HStack align="flex-start">
                    <span className="bi-geo-alt-fill"></span>
                    {currentUser.address === "" ? (
                      <Button
                        size="sm"
                        variant="link"
                        onClick={openAddressModal}
                        justifyContent="flex-start"
                      >
                        Ajouter votre lieu de travail
                      </Button>
                    ) : (
                      <Text onClick={openAddressModal}>
                        {currentUser.address}{" "}
                        <span className="bi-pencil"></span>
                      </Text>
                    )}
                  </HStack>
                  <AddressModal
                    isOpen={addressModal}
                    onOpen={openAddressModal}
                    onClose={closeAddressModal}
                  />

                  {/* PROJECT  */}
                  <HStack align="flex-start">
                    <span className="bi-flag-fill"></span>
                    {currentUser.project === "" ? (
                      <Button
                        size="sm"
                        variant="link"
                        onClick={openProjectModal}
                        justifyContent="flex-start"
                      >
                        Ajouter votre projet
                      </Button>
                    ) : (
                      <Text onClick={openProjectModal}>
                        {currentUser.project}{" "}
                        <span className="bi-pencil"></span>
                      </Text>
                    )}
                  </HStack>
                  <ProjectModal
                    isOpen={projectModal}
                    onOpen={openProjectModal}
                    onClose={closeProjectModal}
                  />
                </Stack>
              </Box>
            </HStack>

            {/* P H I L O  */}
            {currentUser.philosophy ? (
              <Text
                fontSize="sm"
                textAlign="center"
                fontStyle="italic"
                onClick={openPhilosophyModal}
              >
                <span className="bi-quote"></span>
                {currentUser.philosophy}
                <span className="bi-quote"></span>
              </Text>
            ) : (
              <Button
                onClick={openPhilosophyModal}
                leftIcon={<span className="bi-plus-circle"></span>}
                minHeight={10}
              >
                Ajouter votre philosophie de l'argent
              </Button>
            )}
            <PhilosophyModal
              isOpen={philosophyModal}
              onOpen={openPhilosophyModal}
              onClose={closePhilosophyModal}
            />

            {/* R E L A T I O N  */}
            <HStack justify="space-around">
              {/* <RelationList category="Followers" userId={currentUser._id} length={currentUser.followers.length}/>
              <RelationList category="Followings" userId={currentUser._id} length={currentUser.followings.length}/> */}
              {currentUser.subscription ? (
                <>
                  <RelationList category="Abonnés" userId={currentUser._id} length={currentUser.subscribers.length}/>
                  <RelationList
                    category="Abonnements"
                    userId={currentUser._id} length={currentUser.subscriptions.length}/>
                </>
              ) : (
                <EnableSubscription />
              )}
            </HStack>

            {/* P O S T S  T A B  */}
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
                    <Text fontSize="xl" className="bi-grid-3x3-gap"></Text>
                    <Text fontSize="xs">Publications</Text>
                  </Stack>
                </Tab>
                <Tab width="25%" overflowX="hidden">
                  <Stack spacing={0}>
                    <Text fontSize="xl" className="bi-bookmark"></Text>
                    <Text fontSize="xs">Enregistrements</Text>
                  </Stack>
                </Tab>
                <Tab width="25%">
                  <Stack spacing={0}>
                    <Text fontSize="xl" className="bi-wallet2"></Text>
                    <Text fontSize="xs">Portefeuille</Text>
                  </Stack>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel paddingY={1} paddingX={0}>
                  <UserInterviews user={currentUser._id} />
                </TabPanel>
                <TabPanel paddingY={1} paddingX={0}>
                  <UserArticles user={currentUser._id} />
                </TabPanel>
                <TabPanel paddingY={1} paddingX={0}>
                  <Flex wrap="wrap" justify="center">
                    {data.map((elt, key) => (
                      <Thumbs data={elt} key={key} />
                    ))}
                  </Flex>
                </TabPanel>
                <TabPanel paddingY={1} paddingX={0}>
                  <Flex justify="flex-end">
                    <Button variant="outline">Transfert</Button>
                  </Flex>
                  <Flex align="center" justify="center" height="100px">
                    <Text fontWeight="bold" fontSize="3xl" textAlign="center">
                      {currentUser.wallet} kAr
                    </Text>
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Scroll>

          <Navigation />
        </Stack>
      ) : (
        <Stack height="100%" maxWidth="100%" justify="center" paddingX={3}>
          <Image
            paddingX={3}
            paddingY={2}
            src="https://firebasestorage.googleapis.com/v0/b/rnvln-611b7.appspot.com/o/tantsaha.jpg?alt=media&token=75326712-8b3e-4d4e-af41-5ca288ee5591"
            alt="illustration"
          />
          <Button variant="cta">Se connecter</Button>
          <Button onClick={() => navigate(-1)}>Retour</Button>
        </Stack>
      )}
    </>
  );
};

export default Profile;
