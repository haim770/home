import React from "react";
import "./styles.css";
import { RiDashboardLine } from "react-icons/ri";
import { FiSettings, FiUsers, FiClock } from "react-icons/fi";
import { IoNotificationsOutline, IoLogoWechat } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { GoHome } from "react-icons/go";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FcSalesPerformance } from "react-icons/fc";
import { BsClockHistory } from "react-icons/bs";
import { Link } from "react-router-dom";
import useAuth from "../../../../../Auth/useAuth";
import { useState, useEffect } from "react";
import instance from "../../../../../api/AxiosInstance";
const Sidebar = () => {
  //the sidebar with manager and user widgets
  const { auth } = useAuth();
  const [newNotification, setNewNotification] = useState(0);
  const [newMsgForUser, setNewMsgForUser] = useState(0);
  const [newRequestForAdsAproval, setNewRequestForAdsAproval] = useState(0);
  const [newReportCountForManager, setNewReportCountForManager] = useState(0);
  const [newReportForTheUser, setNewReportForTheUser] = useState(0);
  const getAllNumbersOfNewItems = async () => {
    const result = await instance.request({
      data: {
        data_type: "getNewItemsCountForDashboard",
        params: {
          guest: "registered",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    if (result.data === "not authorized") {
      alert("not authorized");
      return;
    } else {
      console.log(result.data);
      setNewMsgForUser(result.data.NewMessagesCount[0].total);
      setNewNotification(result.data.newNotificationCount[0].total);
      setNewRequestForAdsAproval(
        result.data.newAdsWaitForAproval[0].total
          ? result.data.newAdsWaitForAproval[0].total
          : 0
      );
      setNewReportCountForManager(
        result.data.newReportForManager[0].total
          ? result.data.newReportForManager[0].total
          : 0
      );
      setNewReportForTheUser(
        result.data.newReportForTheUser[0].total
          ? result.data.newReportForTheUser[0].total
          : 0
      );
    }
  };
  useEffect(() => {
    getAllNumbersOfNewItems();
  }, []);
  return (
    <div className="settingsSidebar">
      <div className="settingsCenter">
        <ul>
          <p className="titleSet">ראשי</p>
          <li>
            <Link to="/Settings/Dashbord" style={{ textDecoration: "none" }}>
              <RiDashboardLine className="icon" />
              <span>פאנל ניהול</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Settings/UserSettings"
              style={{ textDecoration: "none" }}
            >
              <FiSettings className="icon" />
              <span>הגדרות</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Settings/Notifications"
              style={{ textDecoration: "none" }}
            >
              <IoNotificationsOutline className="icon" />
              <span>התראות</span>
              <span style={{ color: "red" }}>
                {newNotification == "0" ? "" : newNotification}
              </span>
            </Link>
          </li>
          <li>
            <Link to="/Settings/Messages" style={{ textDecoration: "none" }}>
              <IoLogoWechat className="icon" />
              <span>הודעות</span>
              <span style={{ color: "red" }}>
                {newMsgForUser == "0" ? "" : newMsgForUser}
              </span>
            </Link>
          </li>
          <li>
            <Link to="/Settings/Purchase" style={{ textDecoration: "none" }}>
              <BiPurchaseTagAlt className="icon" />
              <span>רכישות</span>
            </Link>
          </li>
          <p className="titleSet">מודעות</p>
          <li>
            <Link to="/Settings/Ads" style={{ textDecoration: "none" }}>
              <GoHome className="icon" />
              <span>מודעות</span>
            </Link>
          </li>
          <li>
            <Link to="/Settings/Favorites" style={{ textDecoration: "none" }}>
              <MdOutlineFavoriteBorder className="icon" />
              <span>מועדפים</span>
            </Link>
          </li>
          <li>
            <Link to="/Settings/History" style={{ textDecoration: "none" }}>
              <FiClock className="icon" />
              <span>היסטוריה</span>
            </Link>
          </li>
          {auth?.roles === "5150" || auth?.roles === "2001" ? (
            <li>
              <Link
                to="/Settings/UserReportsToAds"
                style={{ textDecoration: "none" }}
              >
                <BiPurchaseTagAlt className="icon" />
                <span>דוחות על מודעות של משתמש</span>
                <span style={{ color: "red" }}>
                  {newReportForTheUser == "0" ? "" : newReportForTheUser}
                </span>
              </Link>
            </li>
          ) : (
            <></>
          )}
          {auth?.roles === "5150" ? <p className="titleSet">ניהול</p> : <></>}
          {auth?.roles === "5150" ? (
            <li>
              <Link to="/Settings/Users" style={{ textDecoration: "none" }}>
                <FiUsers className="icon" />
                <span>משתמשים</span>
              </Link>
            </li>
          ) : (
            <></>
          )}
          {auth?.roles === "5150" ? (
            <li>
              <Link
                to="/Settings/HandlePackages"
                style={{ textDecoration: "none" }}
              >
                <BiPurchaseTagAlt className="icon" />
                <span>נהל חבילות</span>
              </Link>
            </li>
          ) : (
            <></>
          )}
          {auth?.roles === "5150" ? (
            <li>
              <Link
                to="/Settings/confirmAdManagesr"
                style={{ textDecoration: "none" }}
              >
                <span> אישור מודעות</span>
                <span style={{ color: "red" }}>
                  {newRequestForAdsAproval == 0 ? "" : newRequestForAdsAproval}
                </span>
              </Link>
            </li>
          ) : (
            <></>
          )}
          {auth?.roles === "5150" ? (
            <li>
              <Link
                to="/Settings/handleReportReasons"
                style={{ textDecoration: "none" }}
              >
                <span> ניהול סיבות דוחות</span>
              </Link>
            </li>
          ) : (
            <></>
          )}
          {auth?.roles === "5150" ? (
            <li>
              <Link
                to="/Settings/handleAdParams"
                style={{ textDecoration: "none" }}
              >
                <span> ניהול פרמטרים למודעות</span>
              </Link>
            </li>
          ) : (
            <></>
          )}
          {auth?.roles === "5150" ? (
            <li>
              <Link
                to="/Settings/ChangeUserRule"
                style={{ textDecoration: "none" }}
              >
                <span> נהל משתמשים </span>
              </Link>
            </li>
          ) : (
            <></>
          )}
          {auth?.roles === "5150" ? (
            <li>
              <Link
                to="/Settings/ManageSiteSettings"
                style={{ textDecoration: "none" }}
              >
                <span> נהל הגדרות אתר </span>
              </Link>
            </li>
          ) : (
            <></>
          )}
          {auth?.roles === "5150" ? (
            <li>
              <Link to="/Settings/Sales" style={{ textDecoration: "none" }}>
                <FcSalesPerformance className="icon" />
                <span>מכירות</span>
              </Link>
            </li>
          ) : (
            <></>
          )}
          {auth?.roles === "5150" ? (
            <li>
              <Link
                to="/Settings/ManageReports"
                style={{ textDecoration: "none" }}
              >
                <HiOutlineDocumentReport className="icon" />
                <span>דוחות</span>
                <span style={{ color: "red" }}>
                  {newReportCountForManager == "0"
                    ? ""
                    : newReportCountForManager}
                </span>
              </Link>
            </li>
          ) : (
            <></>
          )}
          {auth?.roles === "5150" ? (
            <li>
              <Link
                to="/Settings/SitePurchase"
                style={{ textDecoration: "none" }}
              >
                <BsClockHistory className="icon" />
                <span>היסטורית רכישות</span>
              </Link>
            </li>
          ) : (
            <></>
          )}
          {auth?.roles === "5150" ? (
            <li>
              <Link
                to="/Settings/AdsInformation"
                style={{ textDecoration: "none" }}
              >
                <BsClockHistory className="icon" />
                <span>מידע על מודעות</span>
              </Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
