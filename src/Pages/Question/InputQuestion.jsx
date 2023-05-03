import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { questionContext } from "./AskQuestion";

const InputQuestion = ({ slide }) => {
  const responseRef = useRef();
  const [value, setValue] = useState("");
  const { setSwiperSlideArray, swiperRef, questionList } =
    useContext(questionContext);
    const [data,setData]=useState([1,2,3,4])

  const handleTextChange = ({ currentTarget }) => {
    setValue(currentTarget.value);
    questionList.current[swiperRef.current.swiper.activeIndex] =
      currentTarget.value;
  };

  // useEffect(() => {
  //   if (responseRef.current) {
  //     responseRef.current.style.height = "38px";
  //     const scrollHeight = responseRef.current.scrollHeight;
  //     if (scrollHeight < 300)
  //       responseRef.current.style.height = scrollHeight + "px";
  //     else responseRef.current.style.height = 300 + "px";
  //   }
  // }, [responseRef, value]);
  return (
    <Stack height="100%">
      <Flex justify="flex-end">
        <Button
          // onClick={()=>setSwiperSlideArray([{index:0,slide:<InputQuestion/>}])
          onClick={() =>
            setSwiperSlideArray((current) =>
              current.filter(
                (slide) => slide.index !== swiperRef.current.swiper.activeIndex
              )
            )
          }
        >
          Supprimer {slide}
        </Button>
      </Flex>
      <Flex height="100%" align="center">
        {/* <Textarea
          rows={1} className={`textarea${slide}`}
          textAlign="center"
          borderColor="transparent"
          ref={responseRef}
          _placeholder={{ fontSize: "2xl" }}
          placeholder="Appuyez pour écrire"
        sx={{
            "::-webkit-scrollbar": { display: "none" },
            "::-webkit-resizer": { display: "none" },
        }}
        value={`slide${slide}`}
          onChange={handleTextChange}
          border="none"
        ></Textarea> */}
        {data.map((i,j)=><><Input key={j} placeholder={i}/><Button className="bi-trash" onClick={()=>setData(data.filter(k=>k!==i))}></Button></>)}
        {/* <Text>{slide}</Text> */}
      </Flex>
    </Stack>
  );
};

export default InputQuestion;
