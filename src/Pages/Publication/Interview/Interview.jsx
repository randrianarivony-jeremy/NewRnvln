import {
  Box,
  Button,
  Flex,
  HStack,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { createContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorRender, Loader } from "../../../Component/Miscellanous";
import { useFetchQuestionQuery } from "../../../Controler/Redux/Features/questionSlice";
import InterviewSwiper from "./InterviewSwiper";
import SubmitHandler from "./SubmitHandler";

export const interviewContext = createContext();

const Interview = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState([]);
  const responseData = useRef([]);
  const questions = useRef();
  const swiperRef = useRef();
  const publicConfidentiality = useRef(false);
  const { data, isSuccess, isError, error } = useFetchQuestionQuery(questionId);

  useEffect(() => {
    if (isSuccess) {
      let mirror = [];
      data.data.map(() => {
        mirror.push(true);
        responseData.current.push("empty");
      });
      setShowOptions(mirror);
      questions.current = data;
      setLoading(false);
    }
    if (isError) setLoading(false);
  }, [isSuccess, isError]);

  return (
    <interviewContext.Provider
      value={{
        questions: questions.current,
        responseData,
        swiperRef,
        responseData,
        showOptions,
        setShowOptions,
        publicConfidentiality,
      }}
    >
      <Box>
        <Flex
          borderBottom="1px solid"
          borderBottomColor="whiteAlpha.500"
          justify={"space-between"}
        >
          <Flex>
            <Button
              variant="float"
              className="bi-arrow-left"
              onClick={() => navigate(-1)}
            ></Button>
            <Button>Interview</Button>
          </Flex>
          {!loading && isSuccess && questions.current.data.length > 1 && (
            <SubmitHandler />
          )}
        </Flex>
        {loading ? (
          <Loader />
        ) : isError ? (
          <ErrorRender isError={isError} error={error} />
        ) : (
          <Stack spacing={10} paddingBottom={2}>
            <InterviewSwiper />
            <Stack paddingX={3}>
              <HStack>
                <Text whiteSpace="nowrap">Confidentialité :</Text>
                <Select
                  onChange={(e) =>
                    (publicConfidentiality.current = e.target.value)
                  }
                >
                  <option value={false}>Amis et abonnés</option>
                  <option value={true}>Public</option>
                </Select>
              </HStack>
              {questions.current.data.length > 1 ? (
                <HStack>
                  <Button
                    width="100%"
                    variant={"outline"}
                    onClick={() => swiperRef.current.swiper.slidePrev()}
                  >
                    Précédent
                  </Button>
                  <Button
                    width="100%"
                    variant={"primary"}
                    onClick={() => swiperRef.current.swiper.slideNext()}
                  >
                    Suivant
                  </Button>
                </HStack>
              ) : (
                <SubmitHandler />
              )}
            </Stack>
          </Stack>
        )}
      </Box>
    </interviewContext.Provider>
  );
};

export default Interview;
