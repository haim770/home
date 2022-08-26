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

const UserForTheReport = (props) => {
  /**
   * Add function of start new chat with user ad publisher
   */
  const { auth } = useAuth();
  return (
    <section className={styles.cardBlock}>
      <p>
        {console.log(props)}
        <Parameter paramName="מייל" paramValue={props.user[0].mail} />
        <Parameter paramName="שם פרטי" paramValue={props.user[0].first_name} />
        <Parameter paramName="שם משפחה" paramValue={props.user[0].last_name} />
        <Parameter
          paramName="תאריך רישום"
          paramValue={props.user[0].create_time}
        />
        <Parameter paramName="טלפון" paramValue={props.user[0].phone} />
        <Parameter
          paramName="תפקיד"
          paramValue={props.user[0].active === "1" ? "פעיל" : "מחוק"}
        />
        <Parameter
          paramName="תפקיד"
          paramValue={props.user[0].rule === "2001" ? "משתמש" : "מנהל"}
        />
        <Parameter
          paramName="מודעות שנשארו"
          paramValue={props.user[0].remaining_ads}
        />
        <Parameter paramName="נראה לאחרונה" paramValue={props.user[0].last_seen} />
        <Parameter paramName="מידע נוסף" paramValue={props.user[0].prompt} />
      </p>
      <button onClick={props.changeMail}>שנה מייל</button>
    </section>
  );
};
UserForTheReport.defaultProps = {
  isFavorite: false,
  didWatch: 0,
};
export default UserForTheReport;
