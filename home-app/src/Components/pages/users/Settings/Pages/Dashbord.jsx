import { React, useState, useEffect, useLayoutEffect } from "react";
import Chart from "../Graph/Chart/Chart";
import Featured from "../Graph/Featured/Featured";
import Table from "../Graph/Table/Table";
import "../styles.css";
import Widgets from "../widgets/widgets";
import instance from "../../../../../api/AxiosInstance";
const Dashbord = () => {
  return (
    <div>
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
    </div>
  );
};

export default Dashbord;
