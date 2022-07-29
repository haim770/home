import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { FcSms } from "react-icons/fc";
import { Link, NavLink, Outlet } from "react-router-dom";
import styles from"../../styles/AdsBlockForReports.module.css";
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
    props.adBlock.user ? props.adBlock.user.phone : 0
  );
  const [togglePhone, setTogglePhone] = useState("הצג טלפון");
  const [adBlock, setAdBlock] = useState(props.adBlock);
  const [isFavorite, setIsFavorite] = useState(props.adBlock.favorite);
  const [didWatch, setDidWatch] = useState(0);
  const [showReport, setReportShow] = useState("notShowReport");
  const { auth } = useAuth();
  // const { startNewChat } = useView();
  // // const handleClickChatWith = () => {
  // //   const chatWith = {
  // //     adBlock: props.adBlock.ad[0],
  // //     username: `${props.adBlock.user[0].first_name} ${props.adBlock.user[0].last_name}`,
  // //     uuid: props.adBlock.user[0].uuid,
  // //     adID: props.adBlock.ad[0].adID,
  // //   };
  //   startNewChat(chatWith);
  // // };
  // const updateWatch = async () => {
  //   const res = await instance.request({
  //     data: {
  //       data_type: "updateWatch",
  //       params: { adID: props.adBlock.ad[0].adID }, //window.location.href gets the urlline
  //     },
  //   });
  //   console.log(res.data);
  // };
  // const changeViewToFull = async (e) => {
  //   e.preventDefault();
  //   if (
  //     e.target.tagName === "svg" ||
  //     e.target.tagName === "BUTTON" ||
  //     e.target.tagName === "path" ||
  //     e.target.tagName === "button" ||
  //     e.target.parentElement.className === "showReport" ||
  //     e.target.parentElement.parentElement.className === "showReport" ||
  //     e.target.parentElement.parentElement.parentElement.className ===
  //       "showReport"
  //   )
  //     //if the child is doing something in clicking we wont fire the view change
  //     return;
  //   await updateWatch();
  //   setDidWatch((didWatch) => didWatch + 1);
  //   props.setListShow("notShowList");
  //   props.setFullShow("showFull");
  //   props.setAdFull(props.adBlock);
  // };
  // const reportOnAd = (e) => {
  //   //report on ad
  //   e.preventDefault();
  //   props.setReportShow("showReport");
  //   props.setAdForTheReport(props.adBlock);
  // };
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
                paramValue={props.adBlock.ad.watch}
              />
              <Parameter
                paramName={<FcSms />}
                paramValue={props.adBlock.ad.contact_counter}
              />
            </h3>
          </div>
          {/* This div will contain add to favorite */}
          <div className="jss191">
            <div className="MuiButtonBase-root MuiFab-root jss2248">
              <span className="MuiFab-label">
                <svg
                  version="1.1"
                  className="jss2250 jss2251"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 482.207 482.207"
                >
                  <path
                    d="M482.207,186.973l-159.699-33.705L241.104,11.803l-81.404,141.465L0,186.973l109.388,121.134L92.094,470.404l149.01-66.6
	                  l149.01,66.6l-17.294-162.296L482.207,186.973z M241.104,370.943l-113.654,50.798l13.191-123.788l-83.433-92.393l121.807-25.707
	                  l62.09-107.9l62.09,107.9L425,205.561l-83.433,92.393l13.191,123.788L241.104,370.943z"
                  ></path>
                </svg>
              </span>
            </div>
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
