import {
  Box,
  Button,
  Flex,
  HStack,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { createContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../../Controler/Routes";
import { apiCall } from "../../../Controler/App";
import InterviewSwiper from "./InterviewSwiper";

export const interviewContext = createContext();

const Interview = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showOptions, setShowOptions] = useState([]);
  const responseData = useRef([]);
  const questions = useRef();
  const swiperRef = useRef();
  const publicConfidentiality = useRef(false);
  const toast = useToast();

  useEffect(() => {
    const fetchQuestion = async () => {
      await apiCall.get("question/" + questionId).then(
        (res) => {
          let mirror = [];
          res.data.data.map(() => mirror.push(true));
          setShowOptions(mirror);
          questions.current = res.data;
          setLoading(false);
        },
        (err) => {
          toast({
            status: "error",
            duration: 5000,
            description: err.message + "Veuillez réessayer s'il vous plait",
            title: "Operation failed",
          });
          navigate(-1);
        }
      );
    };
    fetchQuestion();
  }, []);

  return (
    <interviewContext.Provider
      value={{
        questions: questions.current,
        responseData,
        swiperRef,
        showOptions,setShowOptions
      }}
    >
      <Box>
        <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
          <Button
            variant="float"
            className="bi-arrow-left"
            onClick={() => navigate(-1)}
          ></Button>
          <Button>Interview</Button>
        </Flex>
        {loading ? (
          <Loader />
        ) : (
          <Stack spacing={5} paddingBottom={2}>
            <InterviewSwiper />
            <Stack paddingX={3}>
              <HStack>
                <Text whiteSpace="nowrap">Confidentialité :</Text>
                <Select
                  onChange={(e) =>
                    (publicConfidentiality.current = e.target.value)
                  }
                >
                  <option value={false}>Entre amis</option>
                  <option value={true}>Public</option>
                </Select>
              </HStack>
              <HStack>
                <Button
                  width="100%"
                  onClick={() =>
                    setShowOptions((current) => {
                      let mirror = [...current];
                      mirror[swiperRef.current.swiper.activeIndex]=true;
                      return mirror;
                    })
                  }
                >
                  Changer
                </Button>
                <Button
                  isLoading={submitting}
                  loadingText="Envoi"
                  variant="primary"
                  width="100%"
                  // onClick={storeMedia}
                >
                  Publier
                </Button>
              </HStack>
            </Stack>
          </Stack>
        )}
      </Box>
    </interviewContext.Provider>
  );
};

export default Interview;
