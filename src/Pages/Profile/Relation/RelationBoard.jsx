import { Flex, HStack, Skeleton } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ErrorRender } from "../../../Component/Miscellanous";
import { currentUserContext } from "../../../Controler/App";
import {
  useFetchSubscribersQuery,
  useFetchSubscriptionsQuery,
} from "../../../Controler/Redux/Features/subscriSlice";
import { useFetchUserQuery } from "../../../Controler/Redux/Features/userSlice";
import RelationList from "./RelationList";

const RelationBoard = ({ userId }) => {
  const { currentUser } = useContext(currentUserContext);
  const { data, isLoading, isSuccess, isError, error } =
    useFetchUserQuery(userId);

  const {
    isLoading: subscribersLoading,
    isError: subscribersIsError,
    error: subscribersError,
    isSuccess: subscribersSuccess,
    data: subscribers,
  } = useFetchSubscribersQuery({ userId, details: false });
  const {
    isLoading: subscriptionsLoading,
    isError: subscriptionsIsError,
    error: subscriptionsError,
    isSuccess: subscriptionsSuccess,
    data: subscriptions,
  } = useFetchSubscriptionsQuery({ userId, details: false });

  if (isError) return <ErrorRender isError={isError} error={error} />;
  if (subscriptionsIsError)
    return (
      <ErrorRender isError={subscriptionsIsError} error={subscriptionsError} />
    );
  if (subscribersIsError)
    return (
      <ErrorRender isError={subscribersIsError} error={subscribersError} />
    );

  return (
    <HStack justify="space-evenly">
      {isLoading ? (
        <Skeleton boxSize={10} />
      ) : (
        isSuccess && (
          <RelationList
            category="Partenaires"
            userId={userId}
            length={data.friends.length}
          />
        )
      )}
      {userId === currentUser._id &&
        (isLoading ? (
          <Skeleton boxSize={10} />
        ) : (
          isSuccess && (
            <RelationList
              category="Demandes"
              userId={userId}
              length={data.friendRequest.length}
            />
          )
        ))}
      {subscribersLoading ? (
        <Skeleton boxSize={10} />
      ) : (
        subscribersSuccess && (
          <RelationList
            category="Abonnés"
            userId={userId}
            length={subscribers.length}
          />
        )
      )}
      {subscriptionsLoading ? (
        <Skeleton boxSize={10} />
      ) : (
        subscriptionsSuccess && (
          <RelationList
            category="Abonnements"
            userId={userId}
            length={subscriptions.length}
          />
        )
      )}
    </HStack>
  );
};

export default RelationBoard;
