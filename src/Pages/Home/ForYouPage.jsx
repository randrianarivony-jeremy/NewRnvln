import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Loader } from "../../Component/Miscellanous";
import {
  useFetchContentsQuery,
  useFetchMoreContentsMutation,
} from "../../Controler/Redux/Features/postSlice";
import QuestionCard from "../Question/QuestionCard";
import PostContainer from "../StandalonePost/PostContainer";

const ForYouPage = () => {
  const swiperRef = useRef();
  const {
    data: postsList,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useFetchContentsQuery();
  const [fetchMoreContents] = useFetchMoreContentsMutation();

  useLayoutEffect(() => {
    if (isSuccess)
      swiperRef.current.swiper.slideTo(
        localStorage.getItem("home_slide_position")
      );
  }, []);

  useEffect(() => {
    if (isSuccess && postsList.ids.length === 1)
      fetchMoreContents(
        new Date(postsList.entities[postsList.ids[0]].createdAt).getTime()
      );
  }, [isSuccess, postsList]);

  if (isError) return <p>Some error occurs {error}</p>;
  if (isLoading) return <Loader />;
  if (isSuccess)
    return (
      <Swiper
        ref={swiperRef}
        direction="vertical"
        modules={[Keyboard, Mousewheel]}
        keyboard={true}
        mousewheel={{ enabled: true, forceToAxis: true }}
        onReachEnd={() =>
          fetchMoreContents(
            new Date(
              postsList.entities[
                postsList.ids[postsList.ids.length - 1]
              ].createdAt
            ).getTime()
          )
        }
        onSlideChange={({ activeIndex }) =>
          localStorage.setItem("home_slide_position", activeIndex)
        }
      >
        {postsList.ids.map((id) => (
          <SwiperSlide key={id}>
            {postsList.entities[id].type === "question" ? (
              <QuestionCard questions={postsList.entities[id]} />
            ) : (
              <PostContainer post={postsList.entities[id]} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    );
};

export default ForYouPage;
