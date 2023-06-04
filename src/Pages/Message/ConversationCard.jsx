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
import { currentUserContext } from "../../Controler/App";
import { ClickableFlex } from "../../Styles/Theme";

const ConversationCard = ({ conversation }) => {
  const { currentUser } = useContext(currentUserContext);
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
            />
            {imgLoading && <SkeletonCircle size={12} position="absolute" />}
          </Flex>
        ) : (
          <Avatar size="md" />
        )}
        <Stack spacing={1} marginLeft={2}>
          <Heading size="sm">{userB.current.name}</Heading>
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
        {conversation.unseenMessage.filter(
          (elt) => elt.user == currentUser._id
        )[0].new > 0 && (
          <Badge>
            {
              conversation.unseenMessage.filter(
                (elt) => elt.user == currentUser._id
              )[0].new
            }
          </Badge>
        )}
      </Stack>
    </ClickableFlex>
  );
};

export default ConversationCard;
