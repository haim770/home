import React, { useState } from "react";
import Button from "./Button";
import Address from "./Address";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import Parameter from "./Parameter";
import "../styles/Register.module.css";
import Api from "../api/Api";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
function Report(props) {
  const location = useLocation();
  const [reportType, setReportType] = useState(""); //hook for report type e.g language abuse
  const [freeText, setFreeText] = useState(""); //hook for free text for user to explain the report
  const [title, setTitle] = useState(""); //hook for report title

  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    if (e.target.name === "phone") {
      if (isNaN(e.target.value) || e.target.value.length > 10) {
        toast.dismiss();
        toast.error(" טלפון מכיל עד 10 תווים מספריים");
        return;
      }
    }
    setStateName(e.target.value);
  };
  const mailChecker = (userMail) => {
    if (userMail.length < 6) {
      toast.dismiss();
      toast.error("מייל חייב להכיל מינימום 6 תווים");
      return false;
    }
    if (userMail.substring(userMail.length - 4, userMail.length) !== ".com") {
      toast.dismiss();
      toast.error("אין סיומת נכונה");
      return false;
    }
    if (userMail.substring(userMail.length - 5, userMail.length) === "@.com") {
      toast.dismiss();
      toast.error("מייל חייב  להכיל תוכן בין @ לסיומת");
      return false;
    }
    if (!userMail.includes("@")) {
      toast.dismiss();
      toast.error("אין @");

      return false;
    }
    return true;
  };
  const loseFocusOnMailChecker = (e) => {
    mailChecker(e.target.value);
  };
  const returnStateToDefault = () => {
   setFreeText("");
   setReportType("");
   setTitle("");
  };
  const checkPasswordValidity = (pass) => {
    console.log(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/.test("ldkd")
    );
    if (pass.length > 5) {
      return true;
    } else {
      toast.dismiss();
      toast.error(
        "סיסמא חייבת להיות עד 8 תווים ולהכיל לפחות אות אחת ומספר אחד"
      );
      return false;
    }
  };
  const checkForValidFields = () => {
    if (!(reportType)) {
      toast.dismiss();
      toast.error("שם משתמש או סיסמא לא הוכנסו כראוי");
      return false;
    }
    return true;
  };
  const submitReport = async (e) => {
    //add ad to the db, returns true/false
    e.preventDefault();
    if (
      reportType==""
    ) {
      return;
    } else {
      const result = await instance.request({
        data: {
          data_type: "reportOnElement",
          params: {
            guest: props.auth.accessToken != undefined ? "registered" : "guest",
            freeText: freeText,
            title: title,
            reportType: reportType,
            elementId: props.adBlock.ad[0].adID,
          },
        },
      });
      if (result) {
        if (result.data === "mail exist") {
          toast.dismiss();
          toast.error("בעיה בשליחת דוח   ");
          props.setClassName("notShowReport");
          return;
        }
        // setRegisterStatusDisplay("yes");
        // setRegisterStatus("ההרשמה נקלטה במערכת");
        toast.dismiss();
        props.setClassName("notShowReport");
      }
      console.log(result);
    }
  };
  return (
    <section className={props.className}>
      <h1>הרשמה לאתר</h1>
      <form className={props.className}>
        <label>
          <span>enter report type</span>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option></option>
            <option>שפה לא נאותה</option>
            <option>מודעה מזוייפת</option>
            <option>אחר</option>
          </select>
        </label>
        <label>
          <span>enter title</span>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => onChangeState(setTitle, e)}
          />
        </label>
        <label>
          <span>enter free text</span>
          <textarea
            type="text"
            name="freeText"
            id="freeText"
            value={freeText}
            onChange={(e) => onChangeState(setFreeText, e)}
          />
        </label>
        <p>
          <button onClick={submitReport}>שלח דיווח</button>
        </p>
      </form>
      <Toaster />
    </section>
  );
}
Report.defaultProps = {};
export default Report;
