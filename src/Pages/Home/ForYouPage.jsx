import React, { createContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Loader } from "../../Component/Miscellanous";
import {
  selectAllPosts,
  useFetchContentsQuery,
  useFetchMoreContentsMutation,
} from "../../Controler/Redux/Features/postSlice";
import QuestionCard from "../Question/QuestionCard";
import PostContainer from "../StandalonePost/PostContainer";

export const newsfeedContext = createContext();

const ForYouPage = () => {
  const swiperRef = useRef();
  const postsList = useSelector(selectAllPosts);
  const { isLoading, isSuccess, isError, error } = useFetchContentsQuery();
  const [fetchMoreContents] = useFetchMoreContentsMutation();

  useEffect(() => {
    if (isSuccess) {
      if (postsList.length === 1)
        fetchMoreContents(new Date(postsList[0].createdAt).getTime());
      else
        swiperRef.current.swiper.once("reachEnd", () =>
          fetchMoreContents(
            new Date(postsList[postsList.length - 1].createdAt).getTime()
          )
        );
    }
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
      >
        {postsList.map((post, index) => (
          <SwiperSlide key={index}>
            {post.type === "question" ? (
              <QuestionCard questions={post} />
            ) : (
              <PostContainer post={post} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    );
};

export default ForYouPage;
