import { Flex, HStack, Skeleton } from "@chakra-ui/react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { EmptyState, ErrorRender } from "../../Component/Miscellanous";
import { useSearchQuery } from "../../Controler/Redux/Features/searchSlice";
import Thumbs from "../Profile/Thumbs";

const PublicationSearchResult = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const { data, isLoading, isSuccess, isError, error } = useSearchQuery({
    type: "publication",
    query: keyword,
  });
  if (isLoading)
    return (
      <HStack justify="center" padding={"8px 12px"}>
        <Skeleton boxSize={100} />
        <Skeleton boxSize={100} />
        <Skeleton boxSize={100} />
      </HStack>
    );
  if (isError) return <ErrorRender isError={isError} error={error} />;
  if (isSuccess && data.length === 0) return <EmptyState />;
  if (isSuccess && data.length > 0)
    return (
      <Flex wrap="wrap" justify="center">
        {data.map((interview) => (
          <Thumbs data={interview} key={interview._id} />
        ))}
      </Flex>
    );
};

export default PublicationSearchResult;
