import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Styles/Notifications.css";
import { VscError } from "react-icons/vsc";
import { IoWarningOutline } from "react-icons/io5";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import instance from "../../../../../api/AxiosInstance";
import useAuth from "../../../../../Auth/useAuth";
import NotificationList from "./Notification";
import EmptyList from "../../../Blog/components/common/EmptyList";

const Notifications = () => {
  //notification display
  const { auth } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const getAllNotifications = async () => {
    //get all notifications
    const result = await instance.request({
      data: {
        data_type: "getAllNotifications",
        params: {},
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    // check if we got new data from server or any response
    console.log(result?.data);

    if (result?.data) {
      for (let index = 0; index < result.data.notifications.length; index++) {
        console.log(result.data.notifications[index]);
        if (result.data.notifications[index].msgType == "report") {
          result.data.notifications[index].message_content = (
            <li>
              יש לך דיווח חדש על מודעה
              <Link to={{ pathname: "/settings/UserReportsToAds" }}>
                לחץ כאן לעמוד הדיווחים
              </Link>
            </li>
          );
        }
      }
      setNotifications(result.data.notifications);
    }
  };

  useEffect(() => {
    getAllNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="notification-wrapper">
      {/* notifications List & Empty View */}
      {!notifications.length ? (
        <>
          <EmptyList />
          <p style={{ textAlignLast: "center" }}>נראה שאין התראות</p>
        </>
      ) : (
        <NotificationList notifications={notifications} />
      )}
    </div>
  );
};

export default Notifications;
