import { Button, Flex } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ErrorRender, Loader } from "../../Component/Miscellanous";
import { useFetchQuestionInterviewsQuery } from "../../Controler/Redux/Features/questionSlice";
import PostContainer from "../StandalonePost/PostContainer";

const QuestionInterviews = () => {
  const { questionId } = useParams();
  const { data, isSuccess, isError, isLoading } =
    useFetchQuestionInterviewsQuery(questionId);
  const swiperRef = useRef();
  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorRender />;
  if (isSuccess)
    return (
      <>
        <Flex position={"absolute"} zIndex={2}>
          <Button boxSize={12} onClick={() => navigate(-1)}>
            <IonIcon icon={arrowBack} />
          </Button>
          <Button size={"lg"} paddingX={0}>
            Même question
          </Button>
        </Flex>
        <Swiper
          ref={swiperRef}
          direction="vertical"
          modules={[Keyboard, Mousewheel]}
          keyboard={true}
          mousewheel={{ enabled: true, forceToAxis: true }}
        >
          {data.ids.map((id) => (
            <SwiperSlide key={id}>
              <PostContainer post={data.entities[id]} />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
};

export default QuestionInterviews;
