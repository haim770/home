import React, { useEffect, useState } from "react";
import useLogout from "../../../Auth/useLogout";
import toast, { Toaster, useToaster } from "react-hot-toast"; // https://react-hot-toast.com/docs && https://react-hot-toast.com/
import useView from '../Chat/ChatUseContext';
import useAuth from '../../../Auth/useAuth';
import instance from '../../../api/AxiosInstance';
import "./styles.css";
import { BiLogOut } from "react-icons/bi";
import { Link,NavLink } from "react-router-dom";

const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;
  return (
    <div
      style={{
        position: "fixed",
        top: 8,
        left: 8,
      }}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((toast) => {
        const offset = calculateOffset(toast.id, {
          reverseOrder: false,
          margin: 8,
        });
        const ref = (el) => {
          if (el && !toast.height) {
            const height = el.getBoundingClientRect().height;
            updateHeight(toast.id, height);
          }
        };
        return (
          <div
            key={toast.id}
            ref={ref}
            style={{
              position: "absolute",
              width: "200px",
              transition: "all 0.5s ease-out",
              opacity: toast.visible ? 1 : 0,
              transform: `translateY(${offset}px)`,
            }}
          >
            {toast.message}
          </div>
        );
      })}
    </div>
  );
};

const UserProfile = () => {
  const { chatView, chatInfo, chatWindow, startNewChat } = useView();
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;
  const [openMenu, setOpenMenu]=useState(false);
  const logout = useLogout();
  const { auth } = useAuth();

  const handleOpenCloseMenu = () => {
    setOpenMenu((current) => !current);
  }

  /**
   * Get updates from server
   */
  const getNewUpdatesData = async () => {
    const result = await instance.request({
      data: {
        data_type: "getNewUpdates",
        params: {},
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });

    // check if we got new data from server or any response
    if (result?.data) {
      //console.log(result.data);
      // Handle messages
      if (result?.data?.chatMessages) {
        Object.values(uniq(result.data.chatMessages)).map(
          (anObjectMapped, index) => {
            toast(
              <div onClick={() => handleClickChat(anObjectMapped.first_name,anObjectMapped.last_name,anObjectMapped.uuid)}>
                <div>קיבלת הודעה חדשה מאת</div>
                <div>{`${anObjectMapped.first_name} ${anObjectMapped.last_name}`}</div>
                <span>{anObjectMapped.message}</span>
              </div>,
              {
                position: "bottom-right",
                duration: 4000,
                icon: "💬",
                style: {
                  borderRadius: "1rem",
                  background: "#333",
                  color: "#fff",
                },
              }
            );
          }
        );
      }
    }
  };

  function uniq(a) {
    var seen = {};
    return a.filter(function (item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }

    function handleClickChat(firstname, lastname, uuid) {
      const chatWith = {
        adBlock: [],
        username: `${firstname} ${lastname}`,
        uuid: uuid,
        adID: "",
      };
      startNewChat(chatWith);
    }

  const signOut = async () => {
    await logout();
  };

  /**
   * This use effect will render only once when the component loaded,
   * when we logout it will end the interval.
   * we will check for updates every 3 seconds
   */
  useEffect(() => {
      const Interval = setInterval(() => {
        getNewUpdatesData();
      }, 2000);
      return () => clearInterval(Interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="welcom-user" onClick={() => handleOpenCloseMenu()}>
        <div className="user-profile">
          {auth?.firstName?.charAt(0) + " " + auth?.lastName?.charAt(0)}
        </div>
        <div className="container-user-profile">
          {openMenu && (
            <div className="dropdown-user-profile">
              <div className="header-user-profile">
                <h3>{auth?.firstName + " " + auth?.lastName}</h3>
              </div>
              <div className="body-user-profile">
                <ul>
                  <li>
                    <NavLink
                      to="Settings/Notifications"
                      key="התראות"
                    >
                      <div key="התראות">התראות</div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="Settings/Messages"
                      key="הודעות"
                    >
                      <div key="הודעות">הודעות</div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="Settings" key="הגדרות">
                      <div key="הגדרות">הגדרות</div>
                    </NavLink>
                  </li>
                  <li onClick={signOut}>{<BiLogOut />} התנתק </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/*Toast maker */}
      {/*<Notifications /> */}
      <Toaster />
    </div>
  );
}

export default UserProfile