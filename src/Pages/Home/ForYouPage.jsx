import React, { createContext, useEffect, useRef, useState } from "react";
import { Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  useFetchContentsQuery,
  useLazyFetchContentsQuery,
} from "../../Controler/Redux/Features/postSlice";
import { Loader } from "../../Controler/Routes";
import QuestionCard from "../Question/QuestionCard";
import PostContainer from "../StandalonePost/PostContainer";
import FYPList from "./FYPList";

export const newsfeedContext = createContext();

const ForYouPage = () => {
  const parentSwiperRef = useRef();
  const [timeRange, setTimeRange] = useState(
    Date.now()
    // new Date("2023-05-23T05:09:45.772+00:00").getTime()
  );
  // const [timeRange, setTimeRange] = useState([
  //   Date.now(),
  //   new Date("2023-05-23T05:09:45.772+00:00").getTime(),
  // ]);
  const {
    data: initialData,
    isLoading: initialLoading,
    isSuccess: initialSuccessEvent,
    isError: initialErrorEvent,
    error: initialError,
  } = useFetchContentsQuery(timeRange);
  const [fetchContents, { data, isLoading, isSuccess, isError, error }] =
    useLazyFetchContentsQuery();
  const dataItem = useRef({ ids: [], entities: {} });
  // const [dataItem, setDataItem] = useState(initialData);

  const fetchMoreContents = (activeIndex) => {
    console.log("end");
    const lastSlideCreatedAt = new Date(
      dataItem.current.entities[dataItem.current.ids[activeIndex]].createdAt
    ).getTime();
    // console.log(timeRange[timeRange.length - 1], lastSlideCreatedAt);
    if (timeRange !== lastSlideCreatedAt) setTimeRange(lastSlideCreatedAt);
    // fetchContents(lastSlideCreatedAt);
    // data
  };

  // useEffect(() => {
  //   console.log(timeRange, dataItem.current);
  // }, [timeRange]);

  if (initialLoading) return <Loader />;
  if (initialErrorEvent) return <p>Error {initialError}</p>;
  if (initialSuccessEvent) {
    console.log(initialData);
    dataItem.current.ids = [...dataItem.current.ids, ...initialData.ids];
    dataItem.current.entities = {
      ...dataItem.current.entities,
      ...initialData.entities,
    };
    // dataItem.current = initialData;
    return (
      <newsfeedContext.Provider value={{ timeRange, setTimeRange }}>
        <Swiper
          ref={parentSwiperRef}
          className="feed-slides"
          direction="vertical"
          modules={[Keyboard, Mousewheel]}
          keyboard={true}
          mousewheel={{ enabled: true, forceToAxis: true }}
          onReachEnd={({ activeIndex }) => fetchMoreContents(activeIndex)}
        >
          {dataItem.current.ids.map((id) => (
            <SwiperSlide key={id}>
              {/* <FYPList timeRange={elt} /> */}
              {dataItem.current.entities[id].type === "question" ? (
                <QuestionCard questions={dataItem.current.entities[id]} />
              ) : (
                <PostContainer post={dataItem.current.entities[id]} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </newsfeedContext.Provider>
    );
  }
};

export default ForYouPage;
