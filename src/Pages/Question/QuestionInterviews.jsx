import React, { useRef } from "react";
import { useParams } from "react-router-dom";
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

  if (isLoading) return <Loader />;
  if (isError) return <ErrorRender />;
  if (isSuccess)
    return (
      <Swiper
        ref={swiperRef}
        direction="vertical"
        modules={[Keyboard, Mousewheel]}
        keyboard={true}
        mousewheel={{ enabled: true, forceToAxis: true }}
        // onReachEnd={() =>
        //   fetchMoreContents(
        //     new Date(postsList[postsList.length - 1].createdAt).getTime()
        //   )
        // }
        // onSlideChange={({ activeIndex }) => {
        //   localStorage.setItem("home_slide_position", activeIndex);
        //   console.log(activeIndex);
        // }}
      >
        {data.map((post, index) => (
          <SwiperSlide key={index}>
            <PostContainer post={post} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
};

export default QuestionInterviews;
