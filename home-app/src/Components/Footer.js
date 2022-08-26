import { React, useState, useLayoutEffect, useEffect } from "react";
import Button from "./Button";
import useAuth from "../Auth/useAuth";
import instance from "../api/AxiosInstance";
import "../styles/Footer.css";
function Footer(props) {
  const [totalAdCount, setTotalAdCount] = useState("");
  const [activeAdCount, setActiveAdCount] = useState("");
  const [countBlogs, setCountBlogs] = useState("");
  const [avgWatchPerAd, setAvgWatchPerAd] = useState("");
  const [usersConnectedThisWeek, setUsersConnectedThisWeek] = useState("");
  const [usersConnectedThisMonth, setUsersConnectedThisMonth] = useState("");
  const [usersConnectedToday, setUsersConnectedToday] = useState("");
  const [usersCount, setUsersCount] = useState("");
  const { auth } = useAuth();
  const getStats = async () => {
    const result = await instance.request({
      data: {
        data_type: "getFooterStats",
        params: { guest: "guest" },
        guest: "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    // check if we got new data from server or any response
    if (result.data) {
      setTotalAdCount(result.data.getCountOfTotalAds[0].total || "");
      setActiveAdCount(result.data.countActiveAds[0].total || "");
      setCountBlogs(result.data.getCountOfBlogs[0].total || "");
      setAvgWatchPerAd(result.data.getAvgWatchPerAd[0].total || "");
      setUsersConnectedThisWeek(
        result.data.getUsersConnectedThisWeek[0].total || ""
      );
      setUsersConnectedThisMonth(
        result.data.getUsersConnectedhisMonth[0].total || ""
      );
      setUsersConnectedToday(result.data.getUsersConnectedToday[0].total || "");
      setUsersCount(result.data.getUsersCount[0].total || "");
    }
  };
  useEffect(() => {
    getStats();
  }, []);

  return (
    <footer className="footerFooter">
      <section>
        <ul>
          <li> משתמשים בכל הזמנים הוא {usersCount}</li>
          <li> משתמשים מחוברים היום{usersConnectedToday}</li>
          <li> משתמשים מחוברים השבוע{usersConnectedThisWeek}</li>
          <li> משתמשים מחוברים החודש{usersConnectedThisMonth}</li>
        </ul>
      </section>
      <section>
        <ul>
          <li>מס מודעות שפורסמו באתר {totalAdCount}</li>
          <li>מס מודעות פעילות באתר {activeAdCount}</li>
          <li>מס בלוגים באתר {countBlogs}</li>
          <li>ממוצע צפיות במודעה {avgWatchPerAd}</li>
        </ul>
      </section>
      <section>
        <ul>
          <li>haim monhait</li>
          <li>lidor ben shimol</li>
        </ul>
      </section>
    </footer>
  );
}
export default Footer;
