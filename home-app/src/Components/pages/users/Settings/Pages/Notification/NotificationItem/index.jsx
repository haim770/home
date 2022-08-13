import React from "react";
import "./styles.css";
import { VscError } from "react-icons/vsc";
import { IoWarningOutline } from "react-icons/io5";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";

const NotificationItem = ({
  notification: {
    message_content,
    create_time,
    seen,
    msgType,
    NotificationType,
  },
}) => {
  let iconView = "";
  let wrapperView = "alert-box";
  let wrapperViewRead = "";
  let spanText = "";
  switch (NotificationType) {
    case "Error":
      iconView = <VscError className="notification-icon" />;
      wrapperView = "alert-box notification-error";
      spanText = "שגיאה";
      break;
    case "Success":
      iconView = <AiOutlineCheckCircle className="notification-icon" />;
      wrapperView = "alert-box notification-success";
      spanText = "הצלחה";
      break;
    case "Warning":
      iconView = <IoWarningOutline className="notification-icon" />;
      wrapperView = "alert-box notification-warning";
      spanText = "אזהרה";
      break;
    case "Notice":
      iconView = <AiOutlineInfoCircle className="notification-icon" />;
      wrapperView = "alert-box notification-notice";
      spanText = "הודעה";
      break;
    default:
      iconView = "";
  }

  if (seen === 1  | seen === '1') {
    console.log("true")
    wrapperViewRead="notification-read";
  }

  return (
    <div className={wrapperView + " " + wrapperViewRead}>
      <div className="inner-alert-box-content">
        {iconView}
        <span>{spanText}:</span>
        <p>{message_content}</p>
      </div>
      <div className="inner-alert-box-date">
        <p>{create_time}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
