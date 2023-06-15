import { Flex } from "@chakra-ui/react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import UserLoader from "../../Component/Loaders/UserLoader";
import { EmptyState, ErrorRender } from "../../Component/Miscellanous";
import { useSearchQuery } from "../../Controler/Redux/Features/searchSlice";
import Thumbs from "../Profile/Thumbs";
import QuestionThumbs from "../Question/QuestionThumbs";

const QuestionSearchResult = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const { data, isLoading, isSuccess, isError } = useSearchQuery({
    type: "question",
    query: keyword,
  });
  if (isLoading) return <UserLoader />;
  if (isError) return <ErrorRender />;
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
