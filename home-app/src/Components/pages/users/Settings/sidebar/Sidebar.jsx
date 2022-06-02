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

const Sidebar = () => {
  return (
    <div className="settingsSidebar">
      <div className="settingsTop">
        <span className="logo">Home</span>
      </div>
      <hr />
      <div className="settingsCenter">
        <ul>
          <li>
            <RiDashboardLine className="icon" />
            <span>דשבורד</span>
          </li>
          <li>
            <FiSettings className="icon" />
            <span>הגדרות</span>
          </li>
          <li>
            <IoNotificationsOutline className="icon" />
            <span>התראות</span>
          </li>
          <li>
            <IoLogoWechat className="icon" />
            <span>הודעות</span>
          </li>
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