import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { apiCall } from "../../Controler/App";
import { addContentFeeds } from "../../Controler/Redux/thread.reducer";
import QuestionCard from "../Question/QuestionCard";
import PostContainer from "../StandalonePost/PostContainer";

const ForYouPage = () => {
  const homeSliderRef = useRef();
  const contents = useSelector(({ thread }) => thread);
  const dispatch = useDispatch();

  const fetchMoreContents = async () => {
    const { data } = await apiCall.get(
      "feeds/" +
        contents.filter((post) => post.type === "article").reverse()[0]
          .createdAt +
        "/" +
        contents.filter((post) => post.type === "interview").reverse()[0]
          .createdAt
    );
    if (data.length !== 0) {
      dispatch(addContentFeeds(data));
    }
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
          activeIndex / contents.length
        )
      }
      mousewheel={{ enabled: true, forceToAxis: true }}
      onReachEnd={fetchMoreContents}
    >
      {contents?.map((elt) => (
        <SwiperSlide key={elt._id}>
          {elt.type === "question" ? (
            <QuestionCard questions={elt} />
          ) : (
            <PostContainer post={elt} homeSlider={homeSliderRef} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ForYouPage;
