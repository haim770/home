import { React, useState, useEffect, useLayoutEffect } from "react";
import "./styles.css";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import instance from "../../../../../../api/AxiosInstance";

const Featured = (props) => {
  const [todaySales, setTodaySales] = useState("");
  const [monthSales, setMonthSales] = useState("");
  const [weekSales, setWeekSales] = useState("");
  const [targetProfit, setTargetProfit] = useState("");
  const getSalesStats = async () => {
    const result = await instance.request({
      data: {
        data_type: "getSalesStats",
        params: {},
      },
    });
    if (result?.data) {
      setMonthSales(result.data.monthSales[0].sum);
      setTodaySales(result.data.todaySales[0].sum);
      setWeekSales(result.data.weekSales[0].sum);
      setTargetProfit(result.data.target[0].expectedProfit);
    }
  };
  useEffect(() => {
    getSalesStats();
  }, []);
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">תגמולים</h1>
        <FiMoreVertical fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={(monthSales / targetProfit) * 100}
            text={parseInt((monthSales / targetProfit) * 100)}
            strokeWidth={5}
          />
        </div>
        <p className="title">מכירות היום</p>
        <p className="amount">{todaySales}$</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">יעד</div>
            <div className="itemResult negative">
              <IoIosArrowDown fontSize="small" />
              <div className="resultAmount">{targetProfit || 0}$</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">שבוע אחרון</div>
            <div className="itemResult positive">
              <IoIosArrowUp fontSize="small" />
              <div className="resultAmount">{weekSales}$</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">חודש אחרון</div>
            <div className="itemResult positive">
              <IoIosArrowUp fontSize="small" />
              <div className="resultAmount">{monthSales}$</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Featured;
