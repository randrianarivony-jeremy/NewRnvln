import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  EmptyState,
  ErrorRender,
  Loader,
  Scroll,
} from "../../Component/Miscellanous";
import { useFetchConversationsQuery } from "../../Controler/Redux/Features/chatSlice";
import { setNewMainMessage } from "../../Controler/Redux/Features/credentialSlice";
import ConversationCard from "./ConversationCard";

const MainConversation = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError } =
    useFetchConversationsQuery("main");

  useEffect(() => {
    dispatch(setNewMainMessage(0));
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorRender />;
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

export default MainConversation;
