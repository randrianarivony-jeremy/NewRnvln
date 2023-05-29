import React, { useContext, useRef } from "react";
import { Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFetchContentsQuery } from "../../Controler/Redux/Features/postSlice";
import { Loader } from "../../Controler/Routes";
import FYPList from "./FYPList";
import { newsfeedContext } from "./Home";

const FYPSwiper = () => {
  const parentSwiperRef = useRef();
  const { entryTimeRef } = useContext(newsfeedContext);
  const { isLoading, isSuccess, isError, error } = useFetchContentsQuery(
    entryTimeRef.current[0]
  );

  if (isLoading) return <Loader />;
  if (isError) return <p>Error {error}</p>;
  if (isSuccess)
    return (
      <Swiper
        ref={parentSwiperRef}
        className="feed-slides"
        direction="vertical"
        modules={[Keyboard, Mousewheel]}
        keyboard={true}
        mousewheel={{ enabled: true, forceToAxis: true }}
      >
        {entryTimeRef.current.map((elt, index) => (
          <SwiperSlide key={elt}>
            <FYPList index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
};

export default FYPSwiper;
