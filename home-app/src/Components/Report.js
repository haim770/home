import React, { useState, useEffect } from "react";
import Button from "./Button";
import Address from "./Address";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import Parameter from "./Parameter";
import "../styles/Register.module.css";
import "../styles/Report.css";

import useAuth from "../Auth/useAuth";
import Api from "../api/Api";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
function Report(props) {
  const location = useLocation();
  const [reportType, setReportType] = useState(""); //hook for report type e.g language abuse
  const [reportReasons, setReportReasons] = useState([]);
  const [reportOptionsElement, setReportOptionsElement] = useState([
    <option key={uuidv4()}></option>,
  ]);
  const [freeText, setFreeText] = useState(""); //hook for free text for user to explain the report
  const [title, setTitle] = useState(""); //hook for report title
  const { auth } = useAuth();
  useEffect(() => {
    getReasonsForReports();
  }, []);
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
    console.log(res.data);
    if (res.data) {
      setReportReasons(res.data);
      setReportOptionsElement((reasons) => {
        return new Set([
          ...reasons,
          res.data.map((reason) => (
            <option key={uuidv4()}>{reason.reason_name}</option>
          )),
        ]);
      });
    }
  };
  const cancelReport = (e) => {
    e.preventDefault();
    props.setClassName("notShowReport");
    if (props.elementType != "blog") {
      props.setAdForTheReport({});
    }
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
      toast.error("?????? ?????? ??????");
      return false;
    }
    return true;
  };
  const submitReport = async (e) => {
    //add ad to the db, returns true/false
    e.preventDefault();
    if (!checkForValidFields()) {
      return;
    } else {
      if (props.elementType == "blog") {
        const result = await instance.request({
          data: {
            data_type: "reportOnElement",
            params: {
              guest: auth.accessToken != undefined ? "registered" : "guest",
              freeText: freeText,
              title: title,
              reportType: reportType,
              elementId: props.blogId,
              element_type: props.elementType,
            },
          },
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        if (result) {
          if (result.data === "mail exist") {
            toast.dismiss();
            toast.error("???????? ???????????? ??????   ");
            props.setClassName("notShowReport");
            return;
          }
          toast.dismiss();
          toast.success("???????? ?????????? ????????????");
          toast.success("???????? ?????????? ????????????");
          props.setClassName("notShowReport");
        }
        console.log(result);
        returnStateToDefault();
      } else {
        if (props.elementType == "ad") {
          console.log(props.elementType);
          const result = await instance.request({
            data: {
              data_type: "reportOnElement",
              params: {
                guest: auth.accessToken != undefined ? "registered" : "guest",
                freeText: freeText,
                title: title,
                reportType: reportType,
                elementId: props.adBlock.ad[0].adID,
                element_type: props.elementType,
              },
            },
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          });
          if (result) {
            if (result.data === "mail exist") {
              toast.dismiss();
              toast.error("???????? ???????????? ??????   ");
              props.setClassName("notShowReport");
              return;
            }
            toast.success("???????? ?????????? ????????????");
            toast.dismiss();
            props.setClassName("notShowReport");
          }
          console.log(result);
          returnStateToDefault();
        } else {
          //the report on user part
          const result = await instance.request({
            data: {
              data_type: "requestChangeMail",
              params: {
                guest: auth.accessToken != undefined ? "registered" : "guest",
                freeText: freeText,
                title: title,
                reportType: reportType,
                mail: props.userMail,
                element_type: props.elementType,
              },
            },
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          });
          if (result) {
            if (result.data === "mail exist") {
              toast.dismiss();
              toast.error("???????? ???????????? ??????   ");
              props.setClassName("notShowReport");
              return;
            }
            toast.dismiss();
            toast.success("???????? ?????????? ????????????");
            props.setClassName("notShowReport");
          }
          console.log(result);
          returnStateToDefault();
        }
      }
    }
  };
  return (
    <section className={props.className}>
      <form className="formReport">
        <h1>
          {" "}
          ?????????? ????{" "}
          {props.elementType === "ad"
            ? "??????????"
            : props.elementType === "blog"
            ? "????????"
            : "??????????"}
        </h1>
        <label>
          <span className="reportLabel">?????? ??????????</span>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            {reportOptionsElement}
          </select>
        </label>
        <label
          className="reportLabel"
          style={{ display: "flex", width: "100%" }}
        >
          <span>{props.elementType == "user" ? "???????? ????????" : "??????????"}</span>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => onChangeState(setTitle, e)}
          />
        </label>
        <label
          className="reportLabel"
          style={{ display: "flex", width: "80%" }}
        >
          <span>???????? ???????? ??????????</span>
          <textarea
            style={{ width: "100%" }}
            rows="7"
            type="text"
            name="freeText"
            id="freeText"
            value={freeText}
            onChange={(e) => onChangeState(setFreeText, e)}
          />
        </label>
        <p>
          <button onClick={submitReport} className="button-4">
            ?????? ??????????
          </button>
          <button onClick={cancelReport} className="button-4">
            ??????
          </button>
        </p>
      </form>
      <Toaster />
    </section>
  );
}
Report.defaultProps = {};
export default Report;
