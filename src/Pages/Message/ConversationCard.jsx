import { Avatar, Badge, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUserContext } from '../../Controler/App';
import { ClickableFlex } from '../../Styles/Theme';

const ConversationCard = ({conversation}) => {
    const { currentUser } = useContext(currentUserContext);
    const navigate = useNavigate();

    return (
        <ClickableFlex
                justify="space-between"
                onClick={() => {
                  navigate(
                    "/chat/" +
                      conversation.members.filter(
                        (member) => member._id !== currentUser._id
                      )[0]._id
                  );
                }}
              >
                <Flex>
                  {conversation.members.filter(
                    (member) => member._id !== currentUser._id
                  )[0].picture ? (
                    <Image
                      src={
                        conversation.members.filter(
                          (member) => member._id !== currentUser._id
                        )[0].picture
                      }
                      boxSize={12}
                      rounded="full"
                      objectFit="cover"
                    />
                  ) : (
                    <Avatar size="md" />
                  )}
                  <Stack spacing={1} marginLeft={2}>
                    <Heading size="sm">
                      {
                        conversation.members.filter(
                          (member) => member._id !== currentUser._id
                        )[0].name
                      }
                    </Heading>
                    {conversation.messages[0].contentType === "string" && (
                      <Text>{conversation.messages[0].content}</Text>
                    )}
                    {conversation.messages[0].contentType === "audio" && (
                      <Text>a envoyé un message vocal</Text>
                    )}
                    {conversation.messages[0].contentType === "image" && (
                      <Text>a envoyé une photo</Text>
                    )}
                  </Stack>
                </Flex>
                <Stack align="center" spacing={0}>
                  {conversation.unseenMessage.filter(elt=>elt.user==currentUser._id)[0].new>0 && 
                  <Badge>{conversation.unseenMessage.filter(elt=>elt.user==currentUser._id)[0].new}</Badge>}
                </Stack>
              </ClickableFlex>
    );
};

export default ConversationCard;