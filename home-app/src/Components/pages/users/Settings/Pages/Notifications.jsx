import React, { useEffect , useState} from "react";
import "./Styles/Notifications.css"
import { VscError } from "react-icons/vsc";
import { IoWarningOutline } from "react-icons/io5";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import instance from "../../../../../api/AxiosInstance";
import useAuth from "../../../../../Auth/useAuth";
import NotificationList from "./Notification";
import EmptyList from "../../../Blog/components/common/EmptyList";



const Notifications = () => {
  const { auth } = useAuth();
  const [notifications, setNotifications] = useState([]);
    const getAllNotifications = async () => {
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
        setNotifications(result?.data.notifications);
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
          <p style={{textAlignLast: "center"}}>נראה שאין התראות</p>
        </>
      ) : (
        <NotificationList notifications={notifications} />
      )}
    </div>
  );
}

export default Notifications