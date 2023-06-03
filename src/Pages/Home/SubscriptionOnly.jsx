import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Navigation from "../../Component/Navigation";

const SubscriptionOnly = () => {
  const homeSliderRef = useRef();
  let data = [1, 2];

  return (
    <Stack spacing={0} height="100%">
      <Button
        position="absolute"
        width="100%"
        zIndex={2}
        top={0}
        left="50%"
        transform="auto"
        translateX="-50%"
      >
        Abonnements
      </Button>
      <Swiper ref={homeSliderRef} className="feed-slides" direction="vertical">
        {data.map((elt, key) => (
          <SwiperSlide key={key}>
            <p>content</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <Navigation />
    </Stack>
  );
};

export default SubscriptionOnly;
