import React, { useContext, useEffect, useRef } from "react";
import { Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFetchContentsQuery } from "../../Controler/Redux/Features/postSlice";
import { Loader } from "../../Controler/Routes";
import QuestionCard from "../Question/QuestionCard";
import PostContainer from "../StandalonePost/PostContainer";
import { newsfeedContext } from "./ForYouPage";

const FYPList = ({ timeRange }) => {
  const { data, isLoading, isSuccess, isError, error } =
    useFetchContentsQuery(timeRange);

  // useEffect(() => {
  //   if (isSuccess) {
  //     homeSliderRef.current.swiper.setProgress(
  //       localStorage.getItem("for_you_page_current_slide"),
  //       0
  //     );
  //   }
  // }, [isLoading]);

  if (isLoading) return <Loader />;
  if (isError) return <p>Error {error}</p>;
  if (isSuccess)
    return (
      // <>
      //   {data.ids.map((id) => (
      <SwiperSlide>
        {/* {data.entities[id].type === "question" ? (
              <QuestionCard questions={data.entities[id]} />
            ) : (
              <PostContainer post={data.entities[id]} />
            )} */}
        1
      </SwiperSlide>
      //   <SwiperSlide>2</SwiperSlide>
      //   ))}
      // </>
    );
};

export default FYPList;
