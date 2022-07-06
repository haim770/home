import React, { useState } from "react";
import Button from "./Button";
import Address from "./Address";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Parameter from "./Parameter";
import "../styles/Register.css";
import Api from "../api/Api";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/AxiosInstance";
function Register(props) {
  const [first_name, setfirst_name] = useState(""); //hook for parameter name
  const [last_name, setLast_name] = useState(""); //hook for parameter max value
  const [mail, setMail] = useState(""); //hook for parameter min value
  const [password, setPassword] = useState(""); //hook for parameter style
  const [phone, setPhone] = useState(""); //hook for parameter style
  const [prompt, setPrompt] = useState("");
  const [registerStatus, setRegisterStatus] = useState("not"); //user registration status

  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    if (e.target.name === "phone") {
      if (isNaN(e.target.value) || e.target.value.length > 10) {
        return;
      }
    }
    setStateName(e.target.value);
  };
  const loseFocusOnMailChecker = (e) => {
    if (e.target.value.length < 6) {
      alert("minimum mail contains 6 chars");
      return;
    }
    if (
      e.target.value.substring(
        e.target.value.length - 4,
        e.target.value.length
      ) !== ".com"
    ) {
      alert("no .com");
      return;
    }
    console.log(e.target.value.charAt(e.target.value.length - 4));
    if (
      e.target.value.substring(
        e.target.value.length - 5,
        e.target.value.length
      ) === "@.com"
    ) {
      alert("@ in last place b4 .com");
      return;
    }
    if (!e.target.value.includes("@")) {
      alert("no @");
      return;
    }
  };
  const returnStateToDefault = () => {
    setLast_name("");
    setMail("");
    setPassword("");
    setPhone("");
    setfirst_name("");
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
    if (!checkForValidFields()) {
      return;
    }
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
      setRegisterStatus("yes");
    }
    console.log(result);
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
        {console.log(registerStatus)}
        <p className={registerStatus}>
          רישום הצליח
          <Link to="/Login">לחץ להתחברות</Link>
        </p>
      </form>
    </section>
  );
}
Register.defaultProps = {};
export default Register;
