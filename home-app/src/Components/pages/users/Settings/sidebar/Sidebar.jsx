import React from "react";
import "./styles.css";
import { RiDashboardLine } from "react-icons/ri";
import { FiSettings, FiUsers } from "react-icons/fi";
import { IoNotificationsOutline, IoLogoWechat } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { GoHome } from "react-icons/go";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FcSalesPerformance } from "react-icons/fc";
import { BsClockHistory } from "react-icons/bs";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="settingsSidebar">
      <div className="settingsCenter">
        <ul>
          <p className="title">ראשי</p>
          <li>
            <Link to="/Settings/Dashbord" style={{ textDecoration: "none" }}>
              <RiDashboardLine className="icon" />
              <span>דשבורד</span>
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
            </Link>
          </li>
          <li>
            <Link to="/Settings/Messages" style={{ textDecoration: "none" }}>
              <IoLogoWechat className="icon" />
              <span>הודעות</span>
            </Link>
          </li>
          <li>
            <Link to="/Settings/Reports" style={{ textDecoration: "none" }}>
              <HiOutlineDocumentReport className="icon" />
              <span>דוחות</span>
            </Link>
          </li>
          <p className="title">מודעות</p>
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
            <Link to="/Settings/Purchase" style={{ textDecoration: "none" }}>
              <BiPurchaseTagAlt className="icon" />
              <span>רכישות</span>
            </Link>
          </li>
          <p className="title">ניהול</p>
          <li>
            <Link to="/Settings/Users" style={{ textDecoration: "none" }}>
              <FiUsers className="icon" />
              <span>משתמשים</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Settings/addParameterToAds"
              style={{ textDecoration: "none" }}
            >
              <span> הוספת פרמטרים למודעות</span>
            </Link>
          </li>

          <li>
            <Link
              to="/Settings/ChangeUserRule"
              style={{ textDecoration: "none" }}
            >
              <span> נהל משתמשים </span>
            </Link>
          </li>
          <li>
            <Link to="/Settings/Sales" style={{ textDecoration: "none" }}>
              <FcSalesPerformance className="icon" />
              <span>מכירות</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Settings/SitePurchase"
              style={{ textDecoration: "none" }}
            >
              <BsClockHistory className="icon" />
              <span>היסטורית רכישות</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="settingsBottom">Colors</div>
    </div>
  );
};

export default Sidebar;
