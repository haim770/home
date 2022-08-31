import { React, useState, useEffect, useLayoutEffect } from "react";
import "./styles.css";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import instance from "../../../../../../api/AxiosInstance";
import useAuth from "../../../../../../Auth/useAuth";

const Featured = (props) => {
  //show fetured by the stats we will recieve
  const [todaySales, setTodaySales] = useState("");
  const { auth } = useAuth();

  const [monthSales, setMonthSales] = useState("");
  const [weekSales, setWeekSales] = useState("");
  const [targetProfit, setTargetProfit] = useState("");
  const getSalesStats = async () => {
    //get all saes stats
    const result = await instance.request({
      data: {
        data_type: "getSalesStats",
        params: {},
        guest: "registered",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result?.data) {
      setMonthSales(result.data.monthSales[0].sum);
      setTodaySales(result.data.todaySales[0].sum);
      setWeekSales(result.data.weekSales[0].sum);
      setTargetProfit(result.data.target[0].expectedProfit);
    }
  };
  const getUserPurchasesStats = async () => {
    //get user purchases from db
    const result = await instance.request({
      data: {
        data_type: "getUserPurchasesStats",
        guest: "registered",
        params: { guest: "registered" },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    console.log(result.data);
    if (result?.data) {
      setMonthSales(result.data.UserMonthPurchase[0].sum);
      setTodaySales(result.data.UserTodayPurchase[0].sum);
      setWeekSales(result.data.UserWeekPurchase[0].sum);
      setTargetProfit(result.data.target);
    }
  };
  useEffect(() => {
    if (auth?.roles == "5150") getSalesStats();
    else {
      getUserPurchasesStats();
    }
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
            text={parseInt((monthSales / targetProfit) * 100)+"%"}
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
