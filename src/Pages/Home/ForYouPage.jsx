import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { EmptyState, ErrorRender, Loader } from "../../Component/Miscellanous";
import {
  useFetchContentsQuery,
  useFetchMoreContentsMutation,
} from "../../Controler/Redux/Features/postSlice";
import QuestionCard from "../Question/QuestionCard";
import PostContainer from "../StandalonePost/PostContainer";

const ForYouPage = () => {
  const swiperRef = useRef();
  const hasMore = useRef(true);
  const {
    data: postsList,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useFetchContentsQuery();
  const [
    fetchMoreContents,
    { isLoading: loading, data: more, isSuccess: moreSuccess },
  ] = useFetchMoreContentsMutation();

  useLayoutEffect(() => {
    if (isSuccess)
      swiperRef.current.swiper.slideTo(
        localStorage.getItem("home_slide_position")
      );
  }, []);

  useEffect(() => {
    if (moreSuccess && more === null) hasMore.current = false;
  }, [moreSuccess]);

  useEffect(() => {
    if (isSuccess && postsList.ids.length >0 && postsList.ids.length < 5)
      fetchMoreContents(
        new Date(
          postsList.entities[postsList.ids[postsList.ids.length - 1]].createdAt
        ).getTime()
      );
  }, [isSuccess, postsList]);

  if (isError) return <ErrorRender isError={isError} error={error} />;
  if (isLoading) return <Loader />;
  if (isSuccess && postsList.ids.length>0)
    return (
      <Swiper
        ref={swiperRef}
        direction="vertical"
        modules={[Keyboard, Mousewheel]}
        keyboard={true}
        mousewheel={{ enabled: true, forceToAxis: true }}
        onSlideChange={({ activeIndex }) => {
          localStorage.setItem("home_slide_position", activeIndex);
          if (activeIndex === postsList.ids.length - 2 && hasMore.current)
            fetchMoreContents(
              new Date(
                postsList.entities[
                  postsList.ids[postsList.ids.length - 1]
                ].createdAt
              ).getTime()
            );
        }}
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
        {loading && (
          <SwiperSlide className="loading">
            <Loader />
          </SwiperSlide>
        )}
      </Swiper>
    );
    if (isSuccess && postsList.ids.length===0) return <EmptyState/>
};

export default ForYouPage;
