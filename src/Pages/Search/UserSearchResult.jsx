import { Stack } from "@chakra-ui/react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import UserLoader from "../../Component/Loaders/UserLoader";
import { EmptyState, ErrorRender } from "../../Component/Miscellanous";
import UserItem from "../../Component/UserItem";
import { useSearchQuery } from "../../Controler/Redux/Features/searchSlice";

const UserSearchResult = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const { data, isLoading, isSuccess, isError } = useSearchQuery({
    type: "user",
    query: keyword,
  });
  if (isLoading) return <UserLoader length={3} />;
  if (isError) return <ErrorRender />;
  if (isSuccess) {
    if (data.length > 0)
      return (
        <Stack>
          {data.map((user) => (
            <UserItem user={user} key={user._id} />
          ))}
        </Stack>
      );
    else return <EmptyState />;
  }
};

export default UserSearchResult;
