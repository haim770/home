import React, { useState, useEffect } from "react";
import Button from "./Button";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import useAuth from "../Auth/useAuth";
import { v4 as uuidv4 } from "uuid";
import "../styles/showReport.css";
import instance from "../api/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
function Report(props) {
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
    props.report.manager_feedback || ""
  );
  const [reportStatus, setReportStatus] = useState(props.report.active);
  // useEffect(() => {
  //   getReasonsForReports();
  // }, []);
  const getReasonsForReports = async () => {
    //get all the report reasons for the type of element
    const res = await instance.request({
      data: {
        data_type: "getAllReportReasons",
        params: { elementType: props.elementType, guest: "guest" }, //window.location.href gets the urlline
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    setReportReasons(res.data);
    setReportOptionsElement((reasons) => {
      return new Set([
        ...reasons,
        res.data.map((reason) => (
          <option key={uuidv4()}>{reason.reason_name}</option>
        )),
      ]);
    });
  };
  const cancelReport = (e) => {
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
    const result = await instance.request({
      data: {
        data_type: "changeReportStatus",
        params: {
          guest: auth.accessToken != undefined ? "registered" : "guest",
          active: reportStatus,
          id: props.report.id,
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    setShowInputStatus(false);
  };
  const confirmChangeManagerFeedback = async (e) => {
    //confirm changes on active field on report
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
  const cancelChangeManagerFeedback = async (e) => {
    //cancel changes on active manager feedback on report
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "changeReportManagerFeedback",
        params: {
          guest: auth.accessToken != undefined ? "registered" : "guest",
          manager_feedback: props.report.manager_feedback,
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
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
  };
  const sendFeedbackToOWnerOfTheAd = async (e) => {
    e.preventDefault();
    console.log(props.adBlock);
    const result = await instance.request({
      data: {
        data_type: "sendReportToUser",
        params: {
          guest: auth.accessToken != undefined ? "registered" : "guest",
          elementId: props.adBlock.ad[0].adID,
          reportId: props.report.id,
          userId: props.adBlock.user[0].uuid,
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    alert("report sent to user");
    console.log(result.data);
  };
  return (
    <section className={props.className}>
      <div className="parameterShowReport">
        <h2>סוג דוח</h2>
        <p>{props.report.report_reason}</p>
      </div>
      <div className="parameterShowReport">
        <h2>תאריך</h2>
        <p>{props.report.create_time}</p>
      </div>
      <div className="parameterShowReport">
        <h2>כותרת דוח</h2>
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
        <h2>תגובת מנהל</h2>
        <p style={{ display: showManagerResponse ? "none" : "block" }}>
          {managerResponse}
        </p>
        <button
          style={{ display: showManagerResponse ? "none" : "block" }}
          onClick={changeReportManagerResponse}
        >
          ערוך תגובת מנהל
        </button>
        <div style={{ display: showManagerResponse ? "block" : "none" }}>
          <label>
            <span>תגובת מנהל </span>
            <input
              value={managerResponse}
              onChange={(e) => {
                console.log(e.target.value);
                setManagerResponse(e.target.value);
              }}
            />
          </label>
          <ul>
            <li>
              <button onClick={confirmChangeManagerFeedback}>אישור</button>
            </li>
            <li>
              <button onClick={sendFeedbackToOWnerOfTheAd}>
                שלח משוב על המודעה לבעל המודעה
              </button>
            </li>
            <li>
              <button onClick={cancelChangeManagerFeedback}>בטל פעולה</button>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2>סטטוס דוח </h2>
        <p>{reportStatus == "1" ? "לא טופל" : "טופל"}</p>
        <button
          style={{ display: showInputStatus ? "none" : "block" }}
          onClick={changeReportStatus}
        >
          ערוך סטטוס
        </button>
        <div style={{ display: showInputStatus ? "block" : "none" }}>
          <label>
            <span>סטטוס </span>
            <select
              value={reportStatus}
              onChange={(e) => {
                setReportStatus(e.target.value === "טופל" ? "0" : "1");
              }}
            >
              <option></option>
              <option>טופל</option>
              <option>לא טופל</option>
            </select>
          </label>
          <ul>
            <li>
              <button onClick={confirmChangeStatus}>אישור</button>
            </li>
            <li>
              <button onClick={cancelChangeStatus}>בטל פעולה</button>
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
