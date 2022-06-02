import { Link } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import "./styles.css";

const Settings = () => {
  return (
    <div className="settings">
      <Sidebar />
      <div className="settingsContainer">Containter</div>
    </div>
  );
};

export default Settings;
