import {
  Avatar,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { chatbubblesOutline } from "ionicons/icons";
import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Mousewheel, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import textFit from "textfit";
import { currentUserContext } from "../../Controler/App";
import { iconMd } from "../../Styles/Theme";

const QuestionCard = ({ questions }) => {
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
    <Flex height="100%" bg={questions.bg} justify="center" align="center">
      <Swiper
        mousewheel={{ enabled: true, forceToAxis: true }}
        modules={[Pagination, Mousewheel]}
        pagination={{ type: "progressbar" }}
      >
        {questions.data.map((question, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Flex
              ref={questionDataRef}
              justify="center"
              align={"center"}
              whiteSpace="pre-wrap"
              height="50vh"
              width="80%"
              fontSize="2xl"
              marginX={3}
              textAlign="center"
            >
              {question}
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* I N F O  */}
      <Flex
        position="absolute"
        left={0}
        top={12}
        marginX={3}
        cursor="pointer"
        textAlign="left"
        maxWidth="80%"
        onClick={() =>
          questions.interviewer._id === currentUser._id
            ? navigate("/profile")
            : navigate("/profile/" + questions.interviewer._id)
        }
        zIndex={2}
        justify="space-between"
      >
        {questions.interviewer.picture ? (
          <Image
            src={questions.interviewer.picture}
            alt="profilepic"
            boxSize={12}
            rounded="full"
            objectFit="cover"
          />
        ) : (
          <Avatar size="md" />
        )}
        <Stack spacing={0} marginLeft={2} justify="center">
          <Heading size="sm">{questions.interviewer.name}</Heading>
          {questions.interviewer.job && (
            <Text fontStyle="italic">{questions.interviewer.job}</Text>
          )}
        </Stack>
      </Flex>

      {/* R E A C T I O N              */}
      <Button
        position="absolute"
        right={0}
        bottom={2}
        zIndex={2}
        size="lg"
        flexDir="column"
        onClick={() => navigate("/question/interviews/" + questions._id)}
      >
        <IonIcon icon={chatbubblesOutline} style={{ fontSize: iconMd }} />
        <Text fontSize="xs">{questions.interviews.length}</Text>
      </Button>

      <Button
        position="absolute"
        left={3}
        bottom={2}
        zIndex={2}
        variant="cta"
        leftIcon={
          <IonIcon
            style={{ fontWeight: "100", fontSize: "20px" }}
            icon={chatbubblesOutline}
          />
        }
        onClick={() => navigate("/interview/" + questions._id)}
      >
        Répondre
      </Button>
    </Flex>
  );
};

export default QuestionCard;
