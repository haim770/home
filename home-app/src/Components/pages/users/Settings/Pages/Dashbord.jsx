import Chart from "../Graph/Chart/Chart";
import Featured from "../Graph/Featured/Featured";
import Table from "../Graph/Table/Table";
import "../styles.css";
import Widgets from "../widgets/widgets";
const Dashbord = () => {
  return (
    <>
      <div className="widgets">
        <Widgets type="user" />
        <Widgets type="order" />
        <Widgets type="earning" />
        <Widgets type="balance" />
      </div>
      <div className="charts">
        <Featured />
        <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
      </div>
      <div className="listContainer">
        <div className="listTitle">Latest Transactions</div>
        <Table />
      </div>
    </>
  );
};

export default Dashbord;
