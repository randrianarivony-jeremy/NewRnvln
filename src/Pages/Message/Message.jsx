import {
  Avatar,
  Badge,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Component/Navigation";
import { ClickableFlex, Scroll } from "../../Styles/Theme";
import { apiCall, currentUserContext } from "../../Controler/App";
import { Loader } from "../../Controler/Routes";
import { useDispatch } from "react-redux";
import { selectRecipient } from "../../Controler/Redux/chat.reducer";

const Message = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useContext(currentUserContext);
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConversation = async () => {
    await apiCall
      .get(
         "conversation/" + currentUser._id
      )
      .then(
        (res) => {
          setConversation(res.data);
          // console.log(res.data);
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
    <Stack height="100%" spacing={0}>
      <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
        <Button width="100%">Message</Button>
      </Flex>
      {loading ? (
        <Loader />
      ) : (
        <Scroll height="100%">
          {conversation?.map((convers, key) => (
            <ClickableFlex
              key={key}
              justify="space-between"
              onClick={() => {dispatch(selectRecipient(convers.members.filter(
                (member) => member._id !== currentUser._id
              )[0]));
              navigate("/chat/"+convers._id)
            }}
            >
              <Flex>
                {convers.members.filter((member) => member._id !== currentUser._id)[0].picture ? (
                  <Image src={convers.members.filter((member) => member._id !== currentUser._id)[0].picture}
                  boxSize={12} rounded='full' objectFit='cover'/>
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
                  {convers.messages[0].contentType==='string' && <Text>{convers.messages[0].content}</Text>}
                  {convers.messages[0].contentType==='video' && <Text>a envoyé un vidéo</Text>}
                  {convers.messages[0].contentType==='audio' && <Text>a envoyé un message vocal</Text>}
                  {convers.messages[0].contentType==='image' && <Text>a envoyé une photo</Text>}
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
      <Navigation />
    </Stack>
  );
};

export default Message;
