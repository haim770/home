import { Link, Outlet } from "react-router-dom";
import Chart from "./Graph/Chart/Chart";
import Featured from "./Graph/Featured/Featured";
import Sidebar from "./sidebar/Sidebar";
import Table from "./Graph/Table/Table";
import "./styles.css";
import Widgets from "./widgets/widgets";
const Settings = () => {
  return (
    <div className="settings">
      <Sidebar />
      <div className="settingsContainer">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
