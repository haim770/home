import { Link } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import "./styles.css";

const Settings = () => {
  return (
    <div className="settings">
      <div className="settingsContainer">Containter</div>
      <Sidebar />
    </div>
  );
};

export default Settings;
