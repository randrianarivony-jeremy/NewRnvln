import { Box, Button, Flex, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Navigation from "../../Component/Navigation";
import PostContainer from "../../Component/Post/PostContainer";
import Menu from "./Menu";

const Home = () => {
  const navigate = useNavigate();
  const homeSliderRef = useRef();
  const data = useSelector(state=>state.thread[0])

  return (
    <Flex flexDir="column" spacing={0} className="home" height="100%">
      {/* {loading ? (
        <Flex align="center" justify="center" height="100%" width="100%">
          <Spinner />
        </Flex>
      ) : ( */}
        <Swiper
          ref={homeSliderRef}
          className="feed-slides"
          direction="vertical"
        >
          {data?.map((elt, key) => (
            <SwiperSlide key={key}>
              <PostContainer post={elt} homeSlider={homeSliderRef} />
            </SwiperSlide>
          ))}
        </Swiper>
      {/* )} */}
      <Navigation />

      <Menu />
      <Button
        position="absolute"
        className="bi-search"
        fontSize="xl"
        onClick={() => navigate("/search")}
        right={0}
        top={0}
        zIndex={2}
      ></Button>
    </Flex>
  );
};

export default Home;
