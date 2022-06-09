import { Link } from "react-router-dom";
import Chart from "./Graph/Chart/Chart";
import Featured from "./Graph/Featured/Featured";
import Sidebar from "./sidebar/Sidebar";
import "./styles.css";
import Widgets from "./widgets/widgets";
const Settings = () => {
  return (
    <div className="settings">
      <Sidebar />
      <div className="settingsContainer">
        <div className="widgets">
          <Widgets type="user" />
          <Widgets type="order" />
          <Widgets type="earning" />
          <Widgets type="balance" />
        </div>
        Containter
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
