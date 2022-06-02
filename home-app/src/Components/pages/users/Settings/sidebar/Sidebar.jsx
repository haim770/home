import React from 'react'
import "./styles.css";

const Sidebar = () => {
  return (
    <div className="settingsSidebar">
      <div className="settingsTop">
        <span className="logo">Home</span>
      </div>
      <div className="settingsCenter">
        <ul>
          <li>
            <span>Dashbord</span>
          </li>
          <li>
            <span>Dashbord</span>
          </li>
          <li>
            <span>Dashbord</span>
          </li>
        </ul>
      </div>
      <div className="settingsBottom">Colors</div>
    </div>
  );
}

export default Sidebar