import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ClickableFlex, Scroll } from "../../Styles/Theme";
import { apiCall, currentUserContext } from "../../Controler/App";
import { Loader } from "../../Controler/Routes";
import { Avatar, Badge, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';

const SecondaryConversation = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(currentUserContext);
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchConversation = async () => {
      await apiCall.get("conversation/strangers").then(
        (res) => {
          setConversation(res.data);
          setLoading(false);
        },
        (err) => {
          console.log(err);
          navigate(-1);
        }
      );
    };
  
    useEffect(() => {
      fetchConversation();
    }, []);
    return (
        <>
            {loading ? (
          <Loader />
        ) : (
          <Scroll height="100%">
            {conversation?.map((convers, key) => (
              <ClickableFlex
                key={key}
                justify="space-between"
                onClick={() => {
                  navigate(
                    "/chat/" +
                      convers.members.filter(
                        (member) => member._id !== currentUser._id
                      )[0]._id
                  );
                }}
              >
                <Flex>
                  {convers.members.filter(
                    (member) => member._id !== currentUser._id
                  )[0].picture ? (
                    <Image
                      src={
                        convers.members.filter(
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
                        convers.members.filter(
                          (member) => member._id !== currentUser._id
                        )[0].name
                      }
                    </Heading>
                    {convers.messages[0].contentType === "string" && (
                      <Text>{convers.messages[0].content}</Text>
                    )}
                    {convers.messages[0].contentType === "video" && (
                      <Text>a envoyé un vidéo</Text>
                    )}
                    {convers.messages[0].contentType === "audio" && (
                      <Text>a envoyé un message vocal</Text>
                    )}
                    {convers.messages[0].contentType === "image" && (
                      <Text>a envoyé une photo</Text>
                    )}
                  </Stack>
                </Flex>
                <Stack align="center" spacing={0}>
                  {/* <TimeDisplayer dateToFormat={convers.messages[0].createdAt}/> */}
                  <Badge>1</Badge>
                </Stack>
              </ClickableFlex>
            ))}
          </Scroll>
        )}
        </>
    );
};

export default SecondaryConversation;