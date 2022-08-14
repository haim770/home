import React, { useLayoutEffect, useState } from "react";
import "./styles.css";
import { IoIosArrowUp } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineMonetizationOn } from "react-icons/md";
import { MdAccountBalanceWallet } from "react-icons/md";
import ReactTooltip from "react-tooltip"; // https://www.npmjs.com/package/react-tooltip
import instance from "../../../../../api/AxiosInstance";
import useAuth from "../../../../../Auth/useAuth";
const Widgets = ({ type }) => {
  const { auth } = useAuth();
  const [widgetData, setWidgetData] = useState({
    title: "",
    isMoney: false,
    link: "",
    icon: "",
    amount: 100,
    diff: 20,
  });

  let data;

  /**
   * here we will use switch to change each block data
   */

  /**
   * Get Data from server
   */
  const getWidgetStats = async () => {
    const result = await instance.request({
      data: {
        data_type: "getWidgetStats",
        params: { requestWidget: type },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result);
    switch (type) {
      case "user":
        setWidgetData({
          title: "משתמשים",
          isMoney: false,
          link: "See all users",
          icon: (
            <IoPersonOutline
              className="icon"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
          amount: result.data.allUsers[0].total,
          diff: parseInt(
            (result.data.usersRegisteredLastMonth[0].count /
              result.data.allUsers[0].total) *
              100
          ),
        });
        break;
      case "order":
        setWidgetData({
          title: "מודעות",
          isMoney: false,
          link: "View all orders",
          icon: (
            <FiShoppingCart
              className="icon"
              style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
              }}
            />
          ),
          amount: result.data.adCount[0].total,
          diff: parseInt(
            (result.data.adThisMonth[0].count / result.data.adCount[0].total) *
              100
          ),
        });
        break;
      case "earning":
        setWidgetData({
          title: "בלוגים",
          isMoney: false,
          link: "View net earnings",
          icon: (
            <MdOutlineMonetizationOn
              className="icon"
              style={{
                backgroundColor: "rgba(0, 128, 0, 0.2)",
                color: "green",
              }}
            />
          ),
          amount: result.data.getCountOfBlogs[0].total,
          diff: parseInt(
            (result.data.getCountOfBlogsThisMonth[0].total /
              result.data.getCountOfBlogs[0].total) *
              100
          ),
        });
        break;
      case "balance":
        setWidgetData({
          title: "רכישות",
          isMoney: false,
          link: "See details",
          icon: (
            <MdAccountBalanceWallet
              className="icon"
              style={{
                backgroundColor: "rgba(128, 0, 128, 0.2)",
                color: "purple",
              }}
            />
          ),
          amount: result.data.getAllPurchasescount[0].count,
          diff: parseInt(
            (result.data.getPurchasesThisMonthCount[0].count /
              result.data.getAllPurchasescount[0].count) *
              100
          ),
        });
        break;
      default:
        break;
    }
  };

  /**
   * This will make that first we get data from server then we will display
   * the data
   */
  useLayoutEffect(() => {
    getWidgetStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="widget">
      <div className="widgetLeft">
        <div
          data-tip={widgetData.title}
          data-for={type}
          className="percentage positive"
        >
          <IoIosArrowUp />
          {widgetData.diff} %
        </div>
        {widgetData.icon}
      </div>
      <ReactTooltip place="bottom" type="info" id={type} />

      <div className="widgetRight">
        <span className="title">{widgetData.title}</span>
        <span className="counter">
          {widgetData.isMoney && "$"} {widgetData.amount}
        </span>
        <span className="link">{widgetData.link}</span>
      </div>
    </div>
  );
};

export default Widgets;
