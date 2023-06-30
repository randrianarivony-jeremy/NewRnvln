import {
  Avatar,
  Badge,
  Flex,
  Heading,
  Image,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClickableFlex } from "../../Component/Miscellanous";
import { currentUserContext } from "../../Controler/App";
import { chatSlice } from "../../Controler/Redux/Features/chatSlice";

const ConversationCard = ({ conversationId, category }) => {
  const { currentUser } = useContext(currentUserContext);
  const { conversation } = chatSlice.endpoints.fetchConversations.useQueryState(
    category,
    {
      selectFromResult: ({ data }) => ({
        conversation: data?.entities[conversationId],
      }),
    }
  );
  const userB = useRef(
    conversation.members.filter((member) => member._id !== currentUser._id)[0]
  );
  const navigate = useNavigate();
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <ClickableFlex
      justify="space-between"
      onClick={() => {
        navigate("/chat/" + userB.current._id);
      }}
    >
      <Flex>
        {userB.current.picture ? (
          <Flex boxSize={12} position="relative">
            <Image
              src={userB.current.picture}
              alt="profilepic"
              minWidth={12}
              rounded="full"
              objectFit="cover"
              onLoad={() => setImgLoading(false)}
              onError={() => setImgLoading(false)}
            />
            {imgLoading && <SkeletonCircle size={12} position="absolute" />}
          </Flex>
        ) : (
          <Avatar size="md" />
        )}
        <Stack spacing={1} marginLeft={2}>
          <Heading size="sm">{userB.current.name}</Heading>
          {conversation.lastMessage.contentType === "deleted" && (
            <Text>Message effacé</Text>
          )}
          {conversation.lastMessage.contentType === "string" && (
            <Text>{conversation.lastMessage.content}</Text>
          )}
          {conversation.lastMessage.contentType === "audio" && (
            <Text>Un message vocal</Text>
          )}
          {conversation.lastMessage.contentType === "image" && (
            <Text>Une photo</Text>
          )}
        </Stack>
      </Flex>
      <Stack align="center" spacing={0}>
        {conversation.unseenMessage.filter(
          (elt) => elt.user == currentUser._id
        )[0].new.length > 0 && (
          <Badge>
            {
              conversation.unseenMessage.filter(
                (elt) => elt.user == currentUser._id
              )[0].new.length
            }
          </Badge>
        )}
      </Stack>
    </ClickableFlex>
  );
};

export default ConversationCard;
