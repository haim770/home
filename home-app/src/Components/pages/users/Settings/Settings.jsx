import { Link } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import "./styles.css";
import Widgets from "./widgets/widgets";

const Settings = () => {
  return (
    <div className="settings">
      <div className="settingsContainer">
        <div className="widgets">
          <Widgets type="user"/>
          <Widgets type="order"/>
          <Widgets type="earning"/>
          <Widgets type="balance"/>
        </div>
        Containter
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
