import { Heading, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PostContainer from "../../Component/Post/PostContainer";
import QuestionCard from "../Question/QuestionCard";

const QuestionsOnly = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const homeSliderRef = useRef();
  
  const fetchQuestions = async () => {
    await apiCall
      .get( "question")
      .then((res) => {
        console.log(res.data)
        // setData(res.data)
        // setLoading(false);
      });
  };

  useEffect(()=>{
    fetchQuestions();
  },[])
  return (
    <>
      <Heading size="sm" position="absolute" top={2} zIndex={2} left="50%" transform="auto" translateX="-50%"   >
        Questions
      </Heading>
      {loading ? <Spinner/> : <Swiper ref={homeSliderRef} className="feed-slides" direction="vertical">
        {data.map((elt, key) => (
          <SwiperSlide key={key}>
            {/* <PostContainer post={elt} homeSlider={homeSliderRef} /> */}
            <QuestionCard question={elt}/>
          </SwiperSlide>
        ))}
      </Swiper>}
    </>
  );
};

export default QuestionsOnly;
