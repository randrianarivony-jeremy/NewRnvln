import {
  Avatar,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { currentUserContext } from "../../Controler/App";
import textFit from "textfit";
import { ClickableFlex, iconMd } from "../../Styles/Theme";
import {IonIcon} from '@ionic/react';
import {chatbubblesOutline} from 'ionicons/icons';

const QuestionCard = ({ question }) => {
  const { currentUser } = useContext(currentUserContext);
  const navigate = useNavigate();
  const questionDataRef = useRef();

  useEffect(() => {
    textFit(questionDataRef.current, {
      minFontSize: 16,
      maxFontSize: 25,
      reProcess: false,
    });
  }, []);

  return (
    <Flex height="100%" bg={question.bg} justify="center" align="center">
      <Flex
        ref={questionDataRef}
        justify="center"
        align={"center"}
        whiteSpace="pre-wrap"
        height="60vh"
        width="80%"
        fontSize="2xl"
        marginX={3}
      >
        {question.data}
      </Flex>

      {/* I N F O  */}
      <Flex
        position="absolute"
        left={0}
        top={10}
        marginX={3} cursor='pointer'
        textAlign="left"
        maxWidth="80%"
        onClick={() =>
          question.interviewer._id === currentUser._id
            ? navigate("/profile")
            : navigate("/profile/" + question.interviewer._id)
        }
        zIndex={2}
        justify="space-between"
      >
        {question.interviewer.picture ? (
          <Image
            src={question.interviewer.picture}
            alt="profilepic"
            boxSize={12}
            rounded="full"
            objectFit="cover"
          />
        ) : (
          <Avatar size="md" />
        )}
        <Stack spacing={0} marginLeft={2} justify="center">
          <Heading size="sm">{question.interviewer.name}</Heading>
          {question.interviewer.job && (
            <Text fontStyle="italic">{question.interviewer.job}</Text>
          )}
        </Stack>
      </Flex>

      {/* R E A C T I O N              */}
      <Button
        position="absolute"
        right={0}
        bottom={2}
        zIndex={2}
        flexDir="column"
      >
        <IonIcon icon={chatbubblesOutline} style={{fontSize:iconMd}}/>
        <Text fontSize="xs">{question.interviews.length}</Text>
      </Button>

      <Button
        position="absolute"
        left={3}
        bottom={2}
        zIndex={2}
        variant="cta"
        leftIcon={<IonIcon style={{fontWeight:'100',fontSize:'20px'}} icon={chatbubblesOutline}/>}
        onClick={()=>navigate('/interview/'+question._id)}
      >
        Répondre
      </Button>
    </Flex>
  );
};

export default QuestionCard;
