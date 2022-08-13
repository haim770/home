import React from "react";
import NotificationItem from "./NotificationItem";
import "./styles.css";

const NotificationList = ({ notifications }) => {
  return (
    <div className="notificationList-wrap">
      {notifications.map((notification, index) => (
        <NotificationItem notification={notification} key={index} />
      ))}
    </div>
  );
};

export default NotificationList;
