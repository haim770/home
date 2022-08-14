import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { FcSms } from "react-icons/fc";
import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "../../styles/AdsBlockForReports.module.css";
import "../../styles/Report.css";

// view component for the chat

import { v4 as uuidv4 } from "uuid";
import RecipeReviewCard from "../RecipeReviewCard.js";
import instance from "../../api/AxiosInstance.jsx";
import Parameter from "../Parameter.js";
import useAuth from "../../Auth/useAuth";

const AdsBlockForReports = (props) => {
  /**
   * Add function of start new chat with user ad publisher
   */
  const [phone, setPhone] = useState(
    props.adBlock.user ? props.adBlock.user[0].phone : 0
  );
  const [togglePhone, setTogglePhone] = useState("הצג טלפון");
  const [adBlock, setAdBlock] = useState(props.adBlock);
  const [isFavorite, setIsFavorite] = useState(props.adBlock.favorite);
  const [didWatch, setDidWatch] = useState(0);
  const [showReport, setReportShow] = useState("notShowReport");
  const { auth } = useAuth();
  const deleteAd = async (e) => {
    //get all reports
    const result = await instance.request({
      data: {
        data_type: "deleteAdById",
        params: { adID: props.adBlock.ad[0].adID },
        guest: "registered",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result.data != "didnt succeed" && result.data != "not authorized") {
      alert("ad deleted");
      await props.getAllReports();
    }
  };
  return (
    <section className={styles.cardBlock}>
      <div>
        <header className="headerOnTheTop">
          {/* This div will contain data like how many days the add on the site */}
          <div>
            <h3 className="iconsAtTop">
              <Parameter
                paramName={<FaEye />}
                paramValue={props.adBlock?.ad[0].watch || ""}
              />
              <Parameter
                paramName={<FcSms />}
                paramValue={props.adBlock?.ad[0].contact_counter || ""}
              />
            </h3>
          </div>
        </header>

        {/* This will hold the main assets image */}
        <RecipeReviewCard
          adBlock={props.adBlock}
          maxWidth="350"
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          didWatchd={didWatch}
          auth={auth}
        />
      </div>
      {/** This will contain the Ad footer wrapper  */}
      <div className="jss185 jss181">
        {/** This will contain the Ad footer inner wrapper  */}
        <div className="jss1060">
          {/** This will contain the Ad footer Left button  */}
          <div className="jss1061">
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(e.target.tagName);
                setTogglePhone(
                  togglePhone === "הצג טלפון" ? "הסתר טלפון" : "הצג טלפון"
                );
              }}
            >
              {togglePhone === "הצג טלפון"
                ? "" + togglePhone + " " + phone
                : togglePhone}
            </button>
            <button onClick={deleteAd}>מחק מודעה</button>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};
AdsBlockForReports.defaultProps = {
  isFavorite: false,
  didWatch: 0,
};
export default AdsBlockForReports;
