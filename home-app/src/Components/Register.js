import React, { useState } from "react";
import Button from "./Button";
import Address from "./Address";
import {
  Link,useNavigate,useLocation,Navigate} from "react-router-dom";
import Parameter from "./Parameter";
import "../styles/Register.css";
import Api from "../api/Api";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/AxiosInstance";
function Register(props) {
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
        return;
      }
    }
    setStateName(e.target.value);
  };
  const mailChecker = (userMail) => {
    if (userMail.length < 6) {
      alert("minimum mail contains 6 chars");
      return false;
    }
    if (userMail.substring(userMail.length - 4, userMail.length) !== ".com") {
      alert("no .com");
      return false;
    }
    if (userMail.substring(userMail.length - 5, userMail.length) === "@.com") {
      alert("@ in last place b4 .com");
      return false;
    }
    if (!userMail.includes("@")) {
      alert("no @");
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
    console.log(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/.test("ldkd")
    );
    if (pass.length > 5) {
      return true;
    } else {
      alert("password not valid at least 1 num and 1 letter and 8 chars min");
      return false;
    }
  };
  const checkForValidFields = () => {
    if (!(mail && password)) {
      console.log("no value at mail/password");
      alert("שם משתמש או סיסמא לא הוכנסו כראוי");
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
          setRegisterStatus("מייל קיים במערכת");
          setRegisterStatusDisplay("yes");
          return;
        }
        setRegisterStatusDisplay("yes");
        setRegisterStatus("ההרשמה נקלטה במערכת");
      }
      console.log(result);
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
          <button onClick={register}>הרשמה</button>
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
            <Navigate to="/login" state={{ from: location,act:"registerSucceeds" }} replace />
          ) : (
            ""
          )}
        </p>
      </form>
    </section>
  );
}
Register.defaultProps = {};
export default Register;
