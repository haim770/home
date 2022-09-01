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
function Register(props) {
  //comp for register
  const location = useLocation();
  const [first_name, setfirst_name] = useState(""); //hook for parameter name
  const [last_name, setLast_name] = useState(""); //hook for parameter max value
  const [mail, setMail] = useState(""); //hook for parameter min value
  const [password, setPassword] = useState(""); //hook for parameter style
  const [phone, setPhone] = useState(""); //hook for parameter style
  const [prompt, setPrompt] = useState("");
  const [registerStatusDisplay, setRegisterStatusDisplay] = useState("not"); //user registration status for display or not
  const [registerStatus, setRegisterStatus] = useState("");

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
    setLast_name("");
    setMail("");
    setPassword("");
    setPhone("");
    setfirst_name("");
  };
  const checkPasswordValidity = (pass) => {

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
    if (!(mail && password)) {
      toast.dismiss();
      toast.error("שם משתמש או סיסמא לא הוכנסו כראוי");
      return false;
    }
    return true;
  };
  const register = async (e) => {
    //add ad to the db, returns true/false
    e.preventDefault();
    if (
      !checkForValidFields() ||
      !mailChecker(mail) ||
      !checkPasswordValidity(password)
    ) {
      return;
    } else {
      const result = await instance.request({
        data: {
          data_type: "register",
          params: {
            phone: phone,
            mail: mail,
            password: password,
            first_name: first_name,
            last_name: last_name,
            prompt: prompt,
            rule: "2001",
          },
        },
      });
      if (result) {
        if (result.data === "mail exist") {
          toast.dismiss();
          toast.error("מייל קיים כבר במערכת");
          setRegisterStatus("מייל קיים במערכת");
          setRegisterStatusDisplay("yes");
          return;
        }
        setRegisterStatusDisplay("yes");
        setRegisterStatus("ההרשמה נקלטה במערכת");
        toast.dismiss();
      }
    }
  };
  return (
    <section className="section_form ">
      <h1>הרשמה לאתר</h1>
      <form className={"register_form"}>
        <label>
          <span>enter mail</span>
          <input
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            name="mail"
            id="mail"
            required
            value={mail}
            onBlur={loseFocusOnMailChecker}
            onChange={(e) => onChangeState(setMail, e)}
          />
        </label>
        <label>
          <span>enter password</span>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => onChangeState(setPassword, e)}
          />
        </label>
        <label>
          <span>enter first_name</span>
          <input
            type="text"
            name="first_name"
            id="first_name"
            required
            value={first_name}
            onChange={(e) => onChangeState(setfirst_name, e)}
          />
        </label>
        <label>
          <span>enter last_name</span>
          <input
            type="text"
            name="last_name"
            id="last_name"
            required
            value={last_name}
            onChange={(e) => onChangeState(setLast_name, e)}
          />
        </label>
        <label>
          <span>enter phone</span>
          <input
            type="text"
            name="phone"
            id="phone"
            required
            value={phone}
            onChange={(e) => onChangeState(setPhone, e)}
          />
        </label>
        <label>
          <span>enter prompt</span>
          <input
            type="text"
            name="prompt"
            id="prompt"
            required
            value={prompt}
            onChange={(e) => onChangeState(setPrompt, e)}
          />
        </label>
        <p>
          <button onClick={register} className="button-4">
            הרשמה
          </button>
        </p>
        <p
          className={registerStatusDisplay}
          style={{
            color: registerStatus === "ההרשמה נקלטה במערכת" ? "green" : "red",
          }}
        >
          {registerStatus}
          <br></br>
          {registerStatus === "ההרשמה נקלטה במערכת" ? (
            <Navigate
              to="/login"
              state={{ from: location, act: "registerSucceeds" }}
              replace
            />
          ) : (
            ""
          )}
        </p>
      </form>
      <Toaster />
    </section>
  );
}
Register.defaultProps = {};
export default Register;
