import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import notification from "../Assets/notification1.mp3";
import { socket } from "../Controler/App";
import {
  setNewFriendAccepted,
  setNewFriendRequest,
  setNewMainMessage,
  setNewNotification,
  setNewSecondMessage,
} from "../Controler/Redux/Features/credentialSlice";
import { notificationSlice } from "../Controler/Redux/Features/notificationSlice";

const RealtimeNotification = () => {
  const ringtoneRef = useRef();
  const {
    newMainMessage,
    newSecondMessage,
    newNotification,
    newFriendRequest,
    newFriendAccepted,
  } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("new message", ({ category }) => {
      ringtoneRef.current.play();
      if (category == "main") dispatch(setNewMainMessage(newMainMessage + 1));
      else dispatch(setNewSecondMessage(newSecondMessage + 1));
    });
    socket.on("new notification", () => {
      ringtoneRef.current.play();
      dispatch(setNewNotification(newNotification + 1));
      dispatch(notificationSlice.util.invalidateTags(["Notification"]));
    });
    socket.on("relation update", ({ category }) => {
      ringtoneRef.current.play();
      if (category === "request accepted")
        dispatch(setNewFriendAccepted(newFriendAccepted + 1));
      if (category === "friend invitation")
        dispatch(setNewFriendRequest(newFriendRequest + 1));
      if (category === "cancel invitation")
        dispatch(setNewFriendRequest(newFriendAccepted - 1));
    });
  });

  return (
    <audio
      src={notification}
      ref={ringtoneRef}
      style={{ display: "none" }}
    ></audio>
  );
};

export default RealtimeNotification;
