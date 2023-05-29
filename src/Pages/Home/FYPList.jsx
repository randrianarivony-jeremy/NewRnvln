import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { apiSlice } from "../../Controler/Redux/Features/apiSlice";
import {
  selectAllPosts,
  useLazyFetchContentsQuery,
} from "../../Controler/Redux/Features/postSlice";
import QuestionCard from "../Question/QuestionCard";
import PostContainer from "../StandalonePost/PostContainer";
import { newsfeedContext } from "./Home";

const FYPList = () => {
  const homeSliderRef = useRef();
  const { entryTimeRef } = useContext(newsfeedContext);
  const { data } = apiSlice.endpoints.fetchContents.useQueryState(
    entryTimeRef.current
  );
  const lastSlideCreatedAt = useRef(
    new Date(data.entities[data.ids[data.ids.length - 1]].createdAt).getTime()
  );
  const [fetchContents, { isLoading, isSuccess }] = useLazyFetchContentsQuery();
  // const data = useSelector(selectAllPosts);
  const dispatch = useDispatch();

  const fetchMoreContents = () => {
    fetchContents(lastSlideCreatedAt.current);
  };

  useEffect(() => {
    homeSliderRef.current.swiper.setProgress(
      localStorage.getItem("for_you_page_current_slide"),
      0
    );
  }, []);

  return (
    <Swiper
      ref={homeSliderRef}
      className="feed-slides"
      direction="vertical"
      modules={[Keyboard, Mousewheel]}
      keyboard={true}
      onSlideChange={({ activeIndex }) =>
        localStorage.setItem(
          "for_you_page_current_slide",
          activeIndex / data.length
        )
      }
      mousewheel={{ enabled: true, forceToAxis: true }}
      onReachEnd={fetchMoreContents}
    >
      {data.ids.map((id) => (
        <SwiperSlide key={id}>
          {data.entities[id].type === "question" ? (
            <QuestionCard questions={data.entities[id]} />
          ) : (
            <PostContainer
              post={data.entities[id]}
              homeSlider={homeSliderRef}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FYPList;
