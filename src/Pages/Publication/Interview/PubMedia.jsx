import { Image, Stack, Textarea } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import AudioDisplay from "../../../Component/AudioDisplay";
import { interviewContext } from "./Interview";

const PubMedia = ({ data }) => {
  const { swiperRef, responseData, showOptions } = useContext(interviewContext);

  useEffect(() => {
    if (showOptions[swiperRef.current.swiper.activeIndex] === false)
      responseData.current[swiperRef.current.swiper.activeIndex] = data;
  }, [showOptions]);

  return (
    <Stack height="100%">
      <Stack paddingX={3}>
        {data.contentType === "image" ? (
          <Image
            src={URL.createObjectURL(data.content)}
            alt="image"
            height="50vh"
            border="1px solid"
            rounded="md"
            borderColor="blackAlpha.200"
            objectFit="contain"
          />
        ) : data.contentType === "image_url" ? (
          <Image
            src={data.content}
            alt="image"
            height="50vh"
            rounded="md"
            borderColor="blackAlpha.200"
            objectFit="contain"
            border="1px solid red"
          />
        ) : data.contentType === "audio" ? (
          <AudioDisplay audio={URL.createObjectURL(data.content)} />
        ) : (
          <video
            height="50vh"
            src={URL.createObjectURL(data.content)}
            alt="video"
            width="100%"
            controls
            style={{ objectFit: "contain" }}
          />
        )}
        <Textarea
          placeholder="Description"
          sx={{
            "::-webkit-scrollbar": { display: "none" },
            "::-webkit-resizer": { display: "none" },
          }}
          onChange={(e) => {
            responseData.current[swiperRef.current.swiper.activeIndex] = {
              ...data,
              description: e.target.value,
            };
            console.log(responseData.current);
          }}
        ></Textarea>
      </Stack>
    </Stack>
  );
};

export default PubMedia;
