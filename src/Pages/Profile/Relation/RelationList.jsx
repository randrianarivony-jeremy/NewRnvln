import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClickableFlex } from "../../../Styles/Theme";

const RelationList = ({ category, userId,length }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const list = useRef([1, 2, 3]);

  const fetchList = async () => {
    await axios
      .get(
        process.env.REACT_APP_API_URL +
          "/api/user/" +
          (category === "Abonnés"
            ? "subscribers"
            : category === "Followings"
            ? "followings"
            : category === "Followers"
            ? "followers"
            : "subscriptions") +
          "/" +
          userId
      )
      .then(
        (res) => {
          list.current = res.data;
          setLoading(false);
        },
        () => {
          onClose();
        }
      );
  };

  useEffect(() => {
    if (isOpen) fetchList();
  }, [isOpen]);

  return (
    <>
      <Button
        flexDir="column"
        onClick={() =>
          length > 0 ? onOpen() : null
        }
      >
        <Heading size="md">{length}</Heading>
        <Text fontSize="xs">{category}</Text>
      </Button>

      <Drawer
        onOpen={onOpen}
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent maxH="75vh">
          <DrawerCloseButton />
          <DrawerHeader textAlign="center" fontSize="md" fontWeight="bold">
            {category}
          </DrawerHeader>
          <DrawerBody paddingX={0}>
            <Stack>
              {list.current.map((elt, key) => (
                <Box key={key}>
                  {loading ? (
                    <HStack key={key}>
                      <SkeletonCircle boxSize={10} />
                      <Skeleton height={5} width={200} />
                    </HStack>
                  ) : (
                    <ClickableFlex key={key} justify="space-between">
                      <Flex>
                        {elt.picture ? (
                          <Image
                            src={elt.picture}
                            alt="profilepic"
                            boxSize={12}
                            rounded="full"
                            objectFit="cover"
                          />
                        ) : (
                          <Avatar size="md" />
                        )}
                        <Stack spacing={0} marginLeft={2} justify="center">
                          <Heading size="sm">{elt.name}</Heading>
                          {elt.job && <Text fontStyle="italic">{elt.job}</Text>}
                        </Stack>
                      </Flex>
                      {/* {category==='Followers' && <Button variant='primary'>Suivre</Button>}
                {category==='Followings' && <Button variant='outline'>Suivi</Button>}
                {category==='Abonnés' && <Button variant='cta' onClick={onOpenSubscription}>S'abonner</Button>}
                {category==='Abonnements' && <Button variant='outline'>Abonné</Button>}
      <SubscribeDrawer isOpen={isOpenSubscription} onClose={onCloseSubscription} onOpen={onOpenSubscription}/> */}
                    </ClickableFlex>
                  )}
                </Box>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RelationList;
