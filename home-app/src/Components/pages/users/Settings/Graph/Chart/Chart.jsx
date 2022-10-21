import { React, useEffect } from "react";
import instance from "../../../../../../api/AxiosInstance";
import useAuth from "../../../../../../Auth/useAuth";
import "./styles.css";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const Chart = ({ aspect, title }) => {
  //chart show comp
  const { auth } = useAuth();

  const [data, setData] = useState([
    { name: "1", Total: 4 },
    { name: "2", Total: 2 },
    { name: "3", Total: 5 },
    { name: "4", Total: 1 },
    { name: "5", Total: 7 },
    { name: "7", Total: 1 },
    { name: "8", Total: 12 },
    { name: "9", Total: 2 },
    { name: "10", Total: 1 },
    { name: "11", total: 11 },
    { name: "12", Total: 1 },
  ]);
  const getAllAdsByMonths = async () => {
    //get ads by month last 6
    const result = await instance.request({
      data: {
        data_type: "getAllAdsByMonthsChart",
        params: {},
        guest: "registered",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    if (result?.data) setData(result.data);
  };
  const getAllAdsByMonthsForUser = async () => {
    //get all ads count for user for several months
    const result = await instance.request({
      data: {
        data_type: "getAllAdsByMonthsForUserChart",
        params: {},
        guest: "registered",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    if (result?.data) setData(result.data);
  };
  useEffect(() => {
    if (auth?.roles == "5150") {
      getAllAdsByMonths();
    } else getAllAdsByMonthsForUser();
  }, []);
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
