import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  EmptyState,
  ErrorRender,
  Loader,
  Scroll,
} from "../../Component/Miscellanous";
import { useFetchConversationsQuery } from "../../Controler/Redux/Features/chatSlice";
import { setNewSecondMessage } from "../../Controler/Redux/Features/credentialSlice";
import ConversationCard from "./ConversationCard";

const SecondaryConversation = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useFetchConversationsQuery("second");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNewSecondMessage(0));
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorRender isError={isError} error={error} />;
  if (isSuccess) {
    if (data.length === 0) return <EmptyState />;
    return (
      <Scroll height="100%">
        {data.map((convers, key) => (
          <ConversationCard conversation={convers} key={key} />
        ))}
      </Scroll>
    );
  }
};

export default SecondaryConversation;
