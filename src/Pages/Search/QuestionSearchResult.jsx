import { Flex, HStack, Skeleton } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { EmptyState, ErrorRender } from "../../Component/Miscellanous";
import { useSearchQuery } from "../../Controler/Redux/Features/searchSlice";
import QuestionThumbs from "../Question/QuestionThumbs";

const QuestionSearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const { data, isLoading, isSuccess, isError, error } = useSearchQuery({
    type: "question",
    query: keyword,
  });

  useEffect(() => {
    setSearchParams((searchParams) => {
      searchParams.set("default_index", "3");
      return searchParams;
    });
  }, []);

  if (isLoading)
    return (
      <HStack justify="center" padding={"8px 12px"}>
        <Skeleton boxSize={100} />
        <Skeleton boxSize={100} />
        <Skeleton boxSize={100} />
      </HStack>
    );
  if (isError) return <ErrorRender isError={isError} error={error} />;
  if (isSuccess && data.length > 0)
    return (
      <Flex wrap="wrap" justify="center">
        {data.map((question) => (
          <QuestionThumbs question={question} key={question._id} />
        ))}
      </Flex>
    );
  if (isSuccess && data.length === 0) return <EmptyState />;
};

export default QuestionSearchResult;
