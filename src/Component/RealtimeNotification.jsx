import React, { useEffect, useRef } from "react";
import notification from "../Assets/notification1.mp3";
import { socket } from "../Controler/App";

const RealtimeNotification = () => {
  const ringtoneRef = useRef();
  useEffect(() => {
    socket.on("new message", () => ringtoneRef.current.play());
    socket.on("new notification", () => ringtoneRef.current.play());
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
