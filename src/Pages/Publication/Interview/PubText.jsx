import {
  Stack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import BackgroundOptions from "../../../Component/BackgroundOptions";
import ResizableTextarea from "../../../Component/ResizableTextarea";
import { interviewContext } from "./Interview";

const PubText = () => {
  const { swiperRef, responseData } = useContext(interviewContext);
  const [textareaBg, setTextareaBg] = useState("transparent");
  const [value, setValue] = useState("");

  useEffect(() => {
    responseData.current[swiperRef.current.swiper.activeIndex] = value.length>0 ? {
      content: value,
      contentType: value.length < 320 ? "short" : "text",
      bg:textareaBg
    } : 'empty';
  }, [value]);

  return (
    <Stack height="100%" justify="space-between" paddingX={3}>
      <ResizableTextarea
        value={value}
        setValue={setValue}
        textareaBg={textareaBg}
        placeholder="Votre réponse"
      />
      {value.length < 320 && (
        <BackgroundOptions
          textareaBg={textareaBg}
          setTextareaBg={setTextareaBg}
        />
      )}
    </Stack>
  );
};

export default PubText;
