import React, { createContext, useContext, useRef } from "react";
import { Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import FYPList from "./FYPList";

export const newsfeedContext = createContext();

const ForYouPage = () => {
  const parentSwiperRef = useRef();
  const entryTimeRef = useRef([Date.now()]);

  return (
    <newsfeedContext.Provider value={{ entryTimeRef }}>
      <Swiper
        ref={parentSwiperRef}
        className="feed-slides"
        direction="vertical"
        modules={[Keyboard, Mousewheel]}
        keyboard={true}
        mousewheel={{ enabled: true, forceToAxis: true }}
      >
        {entryTimeRef.current.map((elt) => (
          <SwiperSlide key={elt}>
            <FYPList timeRange={elt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </newsfeedContext.Provider>
  );
};

export default ForYouPage;
