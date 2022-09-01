import React, { useState, useEffect } from "react";
import Button from "./Button";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import useAuth from "../Auth/useAuth";
import { v4 as uuidv4 } from "uuid";
import "../styles/showReport.css";
import instance from "../api/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
function Report(props) {
  //comp for report display
  const location = useLocation();
  const [reportType, setReportType] = useState(""); //hook for report type e.g language abuse
  const [reportReasons, setReportReasons] = useState([]);
  const [showInputStatus, setShowInputStatus] = useState(false);
  const [reportOptionsElement, setReportOptionsElement] = useState([
    <option key={uuidv4()}></option>,
  ]);
  const [freeText, setFreeText] = useState(""); //hook for free text for user to explain the report
  const [title, setTitle] = useState(""); //hook for report title
  const { auth } = useAuth();
  const [showManagerResponse, setShowInputManagerResponse] = useState(false);
  const [managerResponse, setManagerResponse] = useState(
    props.report.manage_feedback || ""
  );
  const [reportStatus, setReportStatus] = useState(props.report.active);
  // useEffect(() => {
  //   getReasonsForReports();
  // }, []);
  const cancelReport = (e) => {
    //cancel operation on report
    e.preventDefault();
    props.setClassName("notShowReport");
    props.setAdForTheReport({});
  };
  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    setStateName(e.target.value);
  };
  const returnStateToDefault = () => {
    setFreeText("");
    setReportType("");
    setTitle("");
  };
  const checkForValidFields = () => {
    //check if report type is valid
    if (!reportType) {
      toast.dismiss();
      toast.error("אין סוג דוח");
      return false;
    }
    return true;
  };
  const changeReportStatus = () => { 
    setShowInputStatus(true);
  };
  const changeReportManagerResponse = () => {
    setShowInputManagerResponse(true);
  };
  const confirmChangeStatus = async (e) => {
    //confirm changes on active field on report
    e.preventDefault();
    console.log(props);
    const result = await instance.request({
      data: {
        data_type: "changeReportStatus",
        params: {
          guest: auth.accessToken != undefined ? "registered" : "guest",
          active: reportStatus == "טופל" ? "0" : "1",
          id: props.report.id,
          manager_feedback: managerResponse,
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    await sendFeedbackToOWnerOfTheAd(e);
    props.getAllReports();
    props.setTableClassName("showTable");
    props.setClassName("notShowSelected");
    console.log(result.data);
    setShowInputStatus(false);
  };
  const confirmChangeManagerFeedback = async (e) => {
    //send feedback by manager
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "changeReportManagerFeedback",
        params: {
          guest: auth.accessToken != undefined ? "registered" : "guest",
          manager_feedback: managerResponse,
          id: props.report.id,
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    setShowInputManagerResponse(false);
  };
  const cancelChangeStatus = async (e) => {
    //cancel all actions done at this open of the report on the status
    e.preventDefault();
    setReportStatus(props.report.active);
    setShowInputStatus(false);
    const result = await instance.request({
      data: {
        data_type: "changeReportStatus",
        params: {
          guest: auth.accessToken != undefined ? "registered" : "guest",
          active: props.report.active,
          id: props.report.id,
          manager_feedback: props.report.manager_feedback,
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
  };
  const sendFeedbackToOWnerOfTheAd = async (e) => {
    //send feedback to user by the type of the report
    e.preventDefault();
    if (props.report.userId == "guest") return;
    console.log(props.adBlock);
    let elementId = "";
    let userId = "";
    if (props.elementType == "ad") {
      elementId = props.adBlock.ad[0].adID;
      userId = props.adBlock.user[0].uuid;
    } else {
      if (props.elementType == "blog") {
        elementId = props.report.elementId;
        userId = props.report.userId;
      } else {
        elementId = props.report.elementId;
        userId = props.report.userId;
      }
    }
    const result = await instance.request({
      data: {
        data_type: "sendReportToUser",
        params: {
          guest: auth.accessToken != undefined ? "registered" : "guest",
          elementId: elementId,
          reportId: props.report.id,
          userId: userId,
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });

    alert("report sent to user");
    props.getAllReports();
    console.log(result.data);
  };
  return (
    <section className={props.className}>
      {console.log(props)}
      <div className="parameterShowReport">
        <h2>סוג דוח</h2>
        <p>{props.report.report_reason}</p>
      </div>
      <div className="parameterShowReport">
        <h2>תאריך</h2>
        <p>{props.report.create_time}</p>
      </div>
      <div className="parameterShowReport">
        <h2>{props.element_type == "user" ? "מייל חדש" : "כותרת דוח"}</h2>
        <p>{props.report.title}</p>
      </div>
      <div className="parameterShowReport">
        <h2>תוכן דוח</h2>
        <p>{props.report.content}</p>
      </div>
      <div className="parameterShowReport">
        <h2>משתמש שהעלה</h2>
        <p>{props.report.userId}</p>
      </div>
      <div className="parameterShowReport">
        <label>
          <h2>תגובת מנהל </h2>
          <input
            value={managerResponse}
            onChange={(e) => {
              console.log(e.target.value);
              setManagerResponse(e.target.value);
            }}
          />
        </label>
      </div>
      <div>
        <h2>סטטוס דוח </h2>
        <p>{reportStatus == "1" ? "לא טופל" : "טופל"}</p>
        <button
          style={{ display: showInputStatus ? "none" : "block" }}
          onClick={changeReportStatus}
          className="button-4"
        >
          ערוך סטטוס
        </button>
        <div style={{ display: showInputStatus ? "block" : "none" }}>
          <label>
            <span>סטטוס </span>
            <select
              value={reportStatus}
              onChange={(e) => {
                setReportStatus(e.target.value);
              }}
            >
              <option></option>
              <option>טופל</option>
              <option>לא טופל</option>
            </select>
          </label>
          <ul>
            <li>
              <button onClick={confirmChangeStatus} className="button-4">
                אישור
              </button>
            </li>
            <li>
              <button onClick={cancelChangeStatus} className="button-4">
                בטל פעולה
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Toaster />
    </section>
  );
}
Report.defaultProps = {
  report_type: "",
};
export default Report;
