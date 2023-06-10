import React, { createContext, memo, useEffect, useState } from "react";
import { apiCall, socket } from "../App";

export const socketContext = createContext();

const RealtimeSocketContext = memo(({ children }) => {
  const [newMainMessage, setNewMainMessage] = useState(0);
  const [newSecondMessage, setNewSecondMessage] = useState(0);
  const [newNotification, setNewNotification] = useState(0);

  useEffect(() => {
    Promise.all([
      apiCall.get("conversation/new"),
      apiCall.get("notification/new"),
    ])
      .then((res) => {
        setNewMainMessage(res[0].data.newMainMessage);
        setNewSecondMessage(res[0].data.newSecondMessage);
        setNewNotification(res[1].data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    socket.on("new message", ({ category }) => {
      if (category == "main") setNewMainMessage((current) => current + 1);
      else setNewSecondMessage((current) => current + 1);
    });
    socket.on("new notification", () => {
      setNewNotification((current) => current + 1);
    });
    return () => {
      console.log("unmounted navigation");
      socket.off("new message");
      socket.off("new notification");
    };
  });

  return (
    <socketContext.Provider
      value={{
        newMainMessage,
        setNewMainMessage,
        newSecondMessage,
        setNewSecondMessage,
        newNotification,
        setNewNotification,
      }}
    >
      {children}
    </socketContext.Provider>
  );
});

export default RealtimeSocketContext;
