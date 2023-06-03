import React, { createContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  postSlice,
  selectAllPosts,
  useLazyFetchContentsQuery,
} from "../../Controler/Redux/Features/postSlice";
import { Loader } from "../../Controler/Routes";
import QuestionCard from "../Question/QuestionCard";
import PostContainer from "../StandalonePost/PostContainer";

export const newsfeedContext = createContext();

const ForYouPage = () => {
  const entryTime = useRef("1684818585772");
  // const entryTime = useRef(Date.now());
  const parentSwiperRef = useRef();
  const { data: payload } =
    postSlice.endpoints.fetchContents.useQueryState("1684818585772");
  const [feedsData, setFeedsData] = useState();
  const [fetchContents] = useLazyFetchContentsQuery();
  // const result = useSelector((state) => selectAllPosts(state, "1684818585772"));

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

  useEffect(() => {
    console.log(payload);
  }, [payload]);
  if (payload)
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
        {payload.ids.map((id) => (
          <SwiperSlide key={id}>
            {payload.entities[id].type === "question" ? (
              <QuestionCard questions={feedsData.entities[id]} />
            ) : (
              <PostContainer post={payload.entities[id]} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    );
  return <Loader />;
};

export default ForYouPage;
