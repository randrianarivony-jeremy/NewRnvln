import React, { createContext, useEffect, useState } from "react";
import { apiCall, socket } from "../App";

export const socketContext = createContext();
const RealtimeSocketContext = ({ children }) => {
  const [newMainMessage, setNewMainMessage] = useState(0);
  const [newSecondMessage, setNewSecondMessage] = useState(0);
  const [newNotification, setNewNotification] = useState(0);

  const checkNewMessageNumber = async () => {
    await apiCall.get("conversation/new").then(
      (res) => {
        setNewMainMessage(res.data.newMainMessage);
        setNewSecondMessage(res.data.newSecondMessage);
      },
      (err) => {
        console.log(err);
        // navigate(-1);
      }
    );
  };

  const checkNewNotificationNumber = async () => {
    await apiCall.get("notification/new").then(
      (res) => {
        setNewNotification(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    checkNewMessageNumber();
    checkNewNotificationNumber();
  }, []);

  useEffect(() => {
    socket.on("new message", ({ category }) => {
      if (category == "main") setNewMainMessage((current) => current + 1);
      else setNewSecondMessage((current) => current + 1);
    });
    socket.on("new notification", () =>{
      setNewNotification((current) => current + 1)
    });
  }, [socket]);

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
};

export default RealtimeSocketContext;
