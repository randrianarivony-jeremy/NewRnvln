import React, { createContext, useRef, useState } from "react";
import { Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import FYPList from "./FYPList";

export const newsfeedContext = createContext();

const ForYouPage = () => {
  const parentSwiperRef = useRef();
  const [timeRange, setTimeRange] = useState([Date.now()]);

  return (
    <newsfeedContext.Provider value={{ timeRange, setTimeRange }}>
      <Swiper
        ref={parentSwiperRef}
        className="feed-slides"
        direction="vertical"
        modules={[Keyboard, Mousewheel]}
        keyboard={true}
        // mousewheel={{ enabled: true, forceToAxis: true }}
      >
        {timeRange.map((elt, index) => (
          <SwiperSlide key={elt}>
            <FYPList index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </newsfeedContext.Provider>
  );
};

export default ForYouPage;
