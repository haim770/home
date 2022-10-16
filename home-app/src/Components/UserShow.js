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
import toast, { Toaster } from "react-hot-toast";
function UserShow(props) {
  //user show comp for manager
  const [showRemainingAdsInput, setShowRemainingAdsInput] =
    useState("notShowInput");
  const [valueRemainingInput, setValueRemainingInput] = useState("0");
  const { auth } = useAuth();
  const [valueRemainingInput1, setValueRemainingInput1] = useState(
    props.user.remaining_ads
  );
  const [valueMailInput, setValueMailInput] = useState("");
  const [showChangeMail, setShowChangeMail] = useState("notShowInput");
  const [activeStatus, setActiveStatus] = useState(props.user.active);
  const deleteOrRestoreUser = async () => {
    //delete or restore user
    if (auth?.user == props.user.mail) {
      alert("cant change self rule");
      return;
    }
    const result = await instance.request({
      data: {
        data_type: "deleteOrRestoreUser",
        params: {
          mail: props.user.mail,
          active: activeStatus,
          userId: props.user.uuid,
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result) {
      if (result.data === "changed active status") {
        toast.dismiss();
        toast.success("פעולה הצליחה");
        props.setMailOptions([{}]);
        props.setMailSelected({});
        props.setUserSelected(false);
        setActiveStatus(activeStatus == "0" ? "1" : "0");
      }
    } else {
      toast.dismiss();
      toast.error("פעולה נכשלה");
    }
  };
  const changeUserRule = async () => {
    //change the user rule
    if (auth?.user == props.user.mail) {
      alert("cant change self rule");
      return;
    }
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
      if (result.data === "changed active status") {
        props.getAllUsers();
        props.setMailOptions([{}]);
        props.setMailSelected({});
        props.setUserSelected(false);
        toast.dismiss();
        toast.success("פעולה הצליחה");
      }
    } else {
      toast.dismiss();
      toast.error("פעולה נכשלה");
    }
  };
  const changeRemainingAdsInDb = async () => {
    //change remaining ads
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
      if (result.data === "changed remaining ads") {
        toast.dismiss();
        toast.success("פעולה הצליחה");
        props.getAllUsers();
        props.setMailOptions([{}]);
        props.setMailSelected({});
      }
    } else {
      toast.dismiss();
      toast.success("פעולה נכשלה");
    }
    setShowRemainingAdsInput("notShowInput");
    props.setUserSelected(false);
    props.getAllUsers();
  };
  const changeMailInDb = async () => {
    //change the user mail
    if (props.act === "nothing") {
      return;
    }
    const result = await instance.request({
      data: {
        data_type: "changeMailInDb",
        params: { mail: props.user.mail, newMail: valueMailInput },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result) {
      if (result.data === "success") {
        toast.dismiss();
        toast.success("פעולה הצליחה");
        props.getAllUsers();
        props.setUserSelected(false);
        props.setMailOptions([{}]);
        props.setMailSelected({});
      }
    } else {
      toast.dismiss();
      toast.success("פעולה נכשלה");
    }
    props.setUserSelected(false);
    setShowChangeMail("notShowInput");
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
  const mailChecker = (userMail) => {
    //check if mail valid
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
  const changeMail = (e) => {
    e.preventDefault();
    if (showChangeMail === "notShowInput") {
      setShowChangeMail("showInput");
      return;
    } else {
      if (mailChecker(valueMailInput)) {
        changeMailInDb();
        setShowChangeMail("notShowInput");
      } else {
        setShowChangeMail("notShowInput");
        return;
      }
    }
    setShowChangeMail("notShowInput");
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
        <Parameter paramName="טלפון" paramValue={props.user.phone || ""} />
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
          paramValue={props.user.remaining_ads || ""}
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
            value={valueRemainingInput || ""}
            onChange={handleChangeRemainingAds}
          />
        </label>
        <label
          style={{
            display: showChangeMail === "notShowInput" ? "none" : "block",
          }}
          key="changeMailInput"
        >
          <span>הכנס מייל</span>
          <input
            type="text"
            name="mailInput"
            id="mailInput"
            value={valueMailInput || ""}
            onChange={(e) => setValueMailInput(e.target.value)}
          />
        </label>
      </p>
      <div className="buttonsList">
        <button
          style={{ display: auth?.user == props.user.mail ? "none" : "flex" }}
          onClick={changeRule}
          className="button-4"
        >
          {props.user.rule === "2001" ? "הפוך משתמש למנהל" : "הפוך מנהל למשתמש"}
        </button>
        <button
          style={{ display: auth?.user == props.user.mail ? "none" : "flex" }}
          onClick={deleteOrRestore}
          className="button-4"
        >
          {activeStatus === "1" ? "מחק משתמש" : " שחזר למשתמש"}
        </button>
        <button onClick={(e) => changeRemainingAds(e)} className="button-4">
          שנה יתרת מודעות
        </button>
        <button onClick={(e) => changeMail(e)} className="button-4">
          שנה מייל{" "}
        </button>
      </div>
      <Toaster />
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
