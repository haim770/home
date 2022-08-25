import React, { useEffect, useState } from "react";
import Button from "./Button";
import Address from "./Address";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Parameter from "./Parameter";
import "../styles/Register.css";
import Api from "../api/Api";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/AxiosInstance";
import Select from "react-select";
import useAuth from "../Auth/useAuth";
function UserShow(props) {
  const [showRemainingAdsInput, setShowRemainingAdsInput] =
    useState("notShowInput");
  const [valueRemainingInput, setValueRemainingInput] = useState("0");
  const { auth } = useAuth();
  const [valueRemainingInput1, setValueRemainingInput1] = useState(
    props.user.remaining_ads
  );
  const [activeStatus, setActiveStatus] = useState(props.user.active);
  const deleteOrRestoreUser = async () => {
    //add ad to the db, returns true/false
    const result = await instance.request({
      data: {
        data_type: "deleteOrRestoreUser",
        params: { mail: props.user.mail, active: activeStatus },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result) {
      if (result.data === "changed active status") {
        console.log("succeeds");
        setActiveStatus(activeStatus == "0" ? "1" : "0");
      }
    } else {
      console.log("failed");
    }
  };
  const changeUserRule = async () => {
    //add ad to the db, returns true/false
    if (props.act === "nothing") {
      return;
    }
    const result = await instance.request({
      data: {
        data_type: "changeUserRule",
        params: { mail: props.user.mail, rule: props.user.rule },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result) {
      if (result.data === "changed active status") console.log("succeeds");
    } else {
      console.log("failed");
    }
  };
  const changeRemainingAdsInDb = async () => {
    //add ad to the db, returns true/false
    if (props.act === "nothing") {
      return;
    }
    const result = await instance.request({
      data: {
        data_type: "changeRemainingAdsInDb",
        params: { mail: props.user.mail, remainingAds: valueRemainingInput },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result) {
      if (result.data === "changed remaining ads") console.log("succeeds");
    } else {
      console.log("failed");
    }
  };
  const deleteOrRestore = (e) => {
    console.log(activeStatus);
    e.preventDefault();
    console.log(props.user);
    if (props.user === []) {
      return;
    } else {
      deleteOrRestoreUser();
    }
  };
  const changeRemainingAds = (e) => {
    //change remainng ads to whatever user puts in
    e.preventDefault();
    if (showRemainingAdsInput === "notShowInput") {
      setShowRemainingAdsInput("showInput");

      return;
    } else {
      changeRemainingAdsInDb();
    }
  };
  const changeRule = (e) => {
    //change user rule
    e.preventDefault();
    changeUserRule();
  };
  const handleChangeRemainingAds = (e) => {
    e.preventDefault();
    if (isNaN(e.target.value) === true) {
      console.log(e.target.value);
      return;
    }
    setValueRemainingInput(e.target.value);
  };
  return (
    <section className="userShowFull">
      <h2>משתמש לביצוע פעולה</h2>
      <p>
        <Parameter paramName="מייל" paramValue={props.user.mail} />
        <Parameter paramName="שם פרטי" paramValue={props.user.first_name} />
        <Parameter paramName="שם משפחה" paramValue={props.user.last_name} />
        <Parameter
          paramName="תאריך רישום"
          paramValue={props.user.create_time}
        />
        <Parameter paramName="טלפון" paramValue={props.user.phone} />
        <Parameter
          paramName="תפקיד"
          paramValue={activeStatus === "1" ? "פעיל" : "מחוק"}
        />
        <Parameter
          paramName="תפקיד"
          paramValue={props.user.rule === "2001" ? "משתמש" : "מנהל"}
        />
        <Parameter
          paramName="מודעות שנשארו"
          paramValue={props.user.remaining_ads}
        />
        <Parameter paramName="נראה לאחרונה" paramValue={props.user.last_seen} />
        <Parameter paramName="מידע נוסף" paramValue={props.user.prompt} />
      </p>
      <p>
        <label
          style={{
            display:
              showRemainingAdsInput === "notShowInput" ? "none" : "block",
          }}
          key="remainingAdsInput"
        >
          <span>הכנס כמות מודעות מעודכנת למשתמש</span>
          <input
            type="text"
            name="remainingAds"
            id="remainingAds"
            value={valueRemainingInput}
            onChange={handleChangeRemainingAds}
          />
        </label>
      </p>
      <div className="buttonsList">
        <button onClick={changeRule}>
          {props.user.rule === "2001" ? "הפוך משתמש למנהל" : "הפוך מנהל למשתמש"}
        </button>
        <button onClick={deleteOrRestore}>
          {activeStatus === "1" ? "מחק משתמש" : " שחזר למשתמש"}
        </button>
        <button onClick={(e) => changeRemainingAds(e)}>שנה יתרת מודעות</button>
      </div>
    </section>
  );
}
UserShow.defaultProps = {
  act: "nothing",
  user: {
    create_time: "2022-06-30 00:44:17",
    first_name: "ck",
    last_name: "kdk",
    last_seen: "2022-06-30 00:44:17",
    mail: "haim1",

    phone: "kdk",
    prompt: "ckk",
    active: "1",
    remaining_ads: "5",
    rule: "5150",
  },
};
export default UserShow;
