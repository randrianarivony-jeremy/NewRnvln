import React, { createContext, useEffect, useRef, useState } from "react";
import { Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  postSlice,
  useFetchContentsQuery,
  useLazyFetchContentsQuery,
} from "../../Controler/Redux/Features/postSlice";
import { Loader } from "../../Controler/Routes";
import QuestionCard from "../Question/QuestionCard";
import PostContainer from "../StandalonePost/PostContainer";
import FYPList from "./FYPList";

export const newsfeedContext = createContext();

const ForYouPage = () => {
  const entryTime = useRef(Date.now());
  const parentSwiperRef = useRef();
  const [feedsData, setFeedsData] = useState();
  const [fetchContents] = useLazyFetchContentsQuery();

  const fetchMoreContents = async (activeIndex) => {
    const lastSlideCreatedAt = new Date(
      feedsData.entities[feedsData.ids[activeIndex]].createdAt
    ).getTime();
    const { data } = await fetchContents(lastSlideCreatedAt);
    setFeedsData({
      ids: [...feedsData.ids, ...data.ids],
      entities: { ...feedsData.entities, ...data.entities },
    });
  };

  useEffect(() => {
    const fetchInitialContents = async () => {
      const { data } = await fetchContents(entryTime.current);
      setFeedsData(data);
    };
    fetchInitialContents();
  }, []);

  // useEffect(() => {
  //   console.log(feedsData);
  // }, [fetching]);
  if (feedsData)
    return (
      <Swiper
        ref={parentSwiperRef}
        className="feed-slides"
        direction="vertical"
        modules={[Keyboard, Mousewheel]}
        keyboard={true}
        mousewheel={{ enabled: true, forceToAxis: true }}
        onReachEnd={({ activeIndex }) => fetchMoreContents(activeIndex)}
      >
        {feedsData.ids.map((id) => (
          <SwiperSlide key={id}>
            {feedsData.entities[id].type === "question" ? (
              <QuestionCard questions={feedsData.entities[id]} />
            ) : (
              <PostContainer post={feedsData.entities[id]} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    );
  return <Loader />;
};

export default ForYouPage;
