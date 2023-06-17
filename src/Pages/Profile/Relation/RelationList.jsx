import {
  Avatar,
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
import React, { useEffect } from "react";
import { ClickableFlex } from "../../../Component/Miscellanous";
import { useLazyFetchUserFriendsQuery } from "../../../Controler/Redux/Features/userSlice";

const RelationList = ({ category, userId, length }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fetchUserFriends, { isLoading, isSuccess, isError, data }] =
    useLazyFetchUserFriendsQuery();

  useEffect(() => {
    if (isOpen)
      fetchUserFriends(
        {
          userId,
          category:
            category === "Abonnés"
              ? "subscribers"
              : category === "Partenaires"
              ? "friends"
              : category === "Demandes"
              ? "requests"
              : "subscriptions",
        },
        { preferCacheValue: true }
      );
  }, [isOpen]);

  let display;
  if (isLoading)
    display = (
      <HStack>
        <SkeletonCircle boxSize={10} />
        <Skeleton height={5} width={200} />
      </HStack>
    );
  if (isError)
    display = (
      <p>
        Une erreur est survenue lors du chargement. Veuillez réessayer plus
        tard.
      </p>
    );
  if (isSuccess)
    display = (
      <Stack>
        {data.map((elt, key) => (
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
            {category === "Demandes" && (
              <Button variant="primary">Confirmer</Button>
            )}
            {category === "Partenaires" && (
              <Button variant="outline">Retirer</Button>
            )}
          </ClickableFlex>
        ))}
      </Stack>
    );

  return (
    <>
      <Button flexDir="column" onClick={() => (length > 0 ? onOpen() : null)}>
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
            {/* <Stack>
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
                      {category==='Demandes' && <Button variant='primary'>Confirmer</Button>}
                {category==='Partenaires' && <Button variant='outline'>Retirer</Button>}
                    </ClickableFlex>
                  )}
                </Box>
              ))}
            </Stack> */}
            {display}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RelationList;
