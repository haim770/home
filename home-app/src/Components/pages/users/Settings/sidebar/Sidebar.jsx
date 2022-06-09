import React from 'react'
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
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="settingsSidebar">
      <div className="settingsTop">
        <span className="logo">Home</span>
      </div>
      <hr />
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
            <Link to="/Settings/Dashbord" style={{ textDecoration: "none" }}>
              <FiSettings className="icon" />
              <span>הגדרות</span>
            </Link>
          </li>
          <li>
            <IoNotificationsOutline className="icon" />
            <span>התראות</span>
          </li>
          <li>
            <IoLogoWechat className="icon" />
            <span>הודעות</span>
          </li>
          <p className="title">מודעות</p>
          <li>
            <GoHome className="icon" />
            <span>מודעות</span>
          </li>
          <li>
            <MdOutlineFavoriteBorder className="icon" />
            <span>מועדפים</span>
          </li>
          <li>
            <BiPurchaseTagAlt className="icon" />
            <span>רכישות</span>
          </li>
          <p className="title">ניהול</p>
          <li>
            <HiOutlineDocumentReport className="icon" />
            <span>דוחות</span>
          </li>
          <li>
            <FiUsers className="icon" />
            <span>משתמשים</span>
          </li>
          <li>
            <FcSalesPerformance className="icon" />
            <span>מכירות</span>
          </li>
          <li>
            <BsClockHistory className="icon" />
            <span>היסטורית רכישות</span>
          </li>
        </ul>
      </div>
      <div className="settingsBottom">Colors</div>
    </div>
  );
}

export default Sidebar