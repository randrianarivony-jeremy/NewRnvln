import { Flex, HStack, Skeleton } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ErrorRender } from "../../../Component/Miscellanous";
import { currentUserContext } from "../../../Controler/App";
import { useFetchUserQuery } from "../../../Controler/Redux/Features/userSlice";
import RelationList from "./RelationList";

const RelationBoard = ({ userId }) => {
  const { currentUser } = useContext(currentUserContext);
  const { data, isLoading, isSuccess, isError, error } =
    useFetchUserQuery(userId);
  if (isLoading)
    return (
      <Flex justify={"space-evenly"}>
        <Skeleton boxSize={10} />
        <Skeleton boxSize={10} />
        <Skeleton boxSize={10} />
        <Skeleton boxSize={10} />
      </Flex>
    );
  if (isError) return <ErrorRender isError={isError} error={error} />;
  if (isSuccess)
    return (
      <HStack justify="space-evenly">
        <RelationList
          category="Partenaires"
          userId={userId}
          length={data.friends.length}
        />
        {userId === currentUser._id && (
          <RelationList
            category="Demandes"
            userId={userId}
            length={data.friendRequest.length}
          />
        )}
        <RelationList
          category="Abonnés"
          userId={userId}
          length={data.subscribers.length}
        />
        <RelationList
          category="Abonnements"
          userId={userId}
          length={data.subscriptions.length}
        />
      </HStack>
    );
};

export default RelationBoard;
