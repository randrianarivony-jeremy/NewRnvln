import React, { useContext, useEffect, useRef } from "react";
import { Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  useFetchContentsQuery,
  useLazyFetchContentsQuery,
} from "../../Controler/Redux/Features/postSlice";
import { Loader } from "../../Controler/Routes";
import QuestionCard from "../Question/QuestionCard";
import PostContainer from "../StandalonePost/PostContainer";
import { newsfeedContext } from "./ForYouPage";

const FYPList = ({ timeRange }) => {
  console.log(timeRange);
  const { setTimeRange } = useContext(newsfeedContext);
  const homeSliderRef = useRef();
  const { data, isLoading, isSuccess, isError, error } =
    useFetchContentsQuery(timeRange);
  const [fetchContents] = useLazyFetchContentsQuery();

  const fetchMoreContents = (activeIndex) => {
    const lastSlideCreatedAt = new Date(
      data.entities[data.ids[activeIndex]].createdAt
    ).getTime();
    fetchContents(lastSlideCreatedAt);
    setTimeRange((current) => [...current, lastSlideCreatedAt]);
  };

  useEffect(() => {
    if (isSuccess) {
      homeSliderRef.current.swiper.setProgress(
        localStorage.getItem("for_you_page_current_slide"),
        0
      );
    }
  }, [isLoading]);

  if (isLoading) return <Loader />;
  if (isError) return <p>Error {error}</p>;
  if (isSuccess)
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
            activeIndex / data.ids.length
          )
        }
        mousewheel={{ enabled: true, forceToAxis: true }}
        onReachEnd={({ activeIndex }) => fetchMoreContents(activeIndex)}
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
