import { Box, Image, Stack, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Mousewheel, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MediaDisplay from "./MediaDisplay";
import QuestionDisplay from "./QuestionDisplay";
import TextHandling from "./TextHandling";
import image from '../../Assets/tantsaha.jpg'
import video from '../../Assets/video.mp4'

const text1 =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda harum itaque quo dolore saepe qui, a non consectetur minima. Ipsum iusto, beatae distinctio assumenda unde modi explicabo amet libero fugiat vero est fuga. Impedit saepe sequi quod fuga recusandae maiores commodi dolore eaque tenetur, neque reiciendis explicabo eveniet culpa velit ipsam quasi fugit rem corporis blanditiis, nam laborum, quos harum! Inventore, nesciunt suscipit harum dolores nisi, quo ullam alias pariatur repellendus porro cum tempore expedita corrupti veniam exercitationem blanditiis rerum veritatis fuga voluptatibus assumenda molestias maiores aliquam nemo! Consectetur cupiditate vitae ab perspiciatis laudantium nihil eveniet et itaque assumenda minima.";
  const text2 =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae soluta dolorum nostrum perspiciatis consectetur doloribus unde, voluptas neque magnam labore.";
  const question =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda harum itaque quo dolore saepe qui, a non consectetur minima. Ipsum iusto, beatae distinctio assumenda unde modi explicabo amet libero fugiat vero est fuga. Impedit saepe sequi quod fuga recusandae maiores commodi dolore eaque tenetur, neque reiciendis explicabo eveniet culpa velit ipsam quasi fugit rem corporis blanditiis, nam laborum, quos harum! Inventore, nesciunt suscipit harum dolores nisi, quo ullam alias pariatur repellendus porro cum tempore expedita corrupti veniam exercitationem blanditiis rerum veritatis fuga voluptatibus assumenda molestias maiores aliquam nemo! Consectetur cupiditate vitae ab perspiciatis laudantium nihil eveniet et itaque assumenda minima.";

  const InterviewCard = () => {
  const postSwiper = useRef();

  return (
    <Box height="100%">
      <Swiper
        ref={postSwiper}
        direction="horizontal"
        mousewheel={{ enabled: true, forceToAxis: true }}
        modules={[Pagination, Mousewheel]}
        pagination={{
          type: "progressbar",
        }}
      >
        <SwiperSlide>
            <QuestionDisplay question={question}/>
            <TextHandling text={text1} />
        </SwiperSlide>
        <SwiperSlide>
          <QuestionDisplay question={question}/>
            <TextHandling text={text2} />
        </SwiperSlide>
        <SwiperSlide>
          <QuestionDisplay question={question}/>
            <MediaDisplay content={image} type='image'/>
        </SwiperSlide>
        <SwiperSlide>
          <QuestionDisplay question={question}/>
            <MediaDisplay content={video} type='video'/>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default InterviewCard;
