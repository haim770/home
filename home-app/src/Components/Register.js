import React, { useState } from "react";
import Button from "./Button";
import Address from "./Address";
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

  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    setStateName(e.target.value);
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
        },
      },
    });
    console.log(result);
  };
  return (
    <form className={"register_form"}>
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
        <span>enter mail</span>
        <input
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          name="mail"
          id="mail"
          required
          value={mail}
          onChange={(e) => onChangeState(setMail, e)}
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
        <span>enter password</span>
        <input
          type="pass"
          name="password"
          id="password"
          required
          value={password}
          onChange={(e) => onChangeState(setPassword, e)}
        />
      </label>

      <p>
        <Button onClick={register} content="register" />
      </p>
    </form>
  );
}
Register.defaultProps = {};
export default Register;
