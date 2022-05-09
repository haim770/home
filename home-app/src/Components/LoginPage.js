import React, { useState } from "react";
import Button from "./Button";
import "../styles/login.css";
import Api from "../api/Api";
import instance from "./pages/AxiosInstance";
function LoginPage(props) {
  const api = new Api();
  const [mail, setMail] = useState(""); //hook for parameter min value
  const [password, setPassword] = useState(""); //hook for parameter style

  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    setStateName(e.target.value);
  };
  const returnStateToDefault = () => {
    setMail("");
    setPassword("");
  };
  const makeObjOfAllFields = () => {
    //returns the ad from field states and save it amt return as object
    let obj = {
      data: "login",
      mail: mail,
      password: password,
    };
    return obj;
  };
  const checkForValidFields = () => {
    if (!(mail && password)) {
      console.log("no value at mail/password");
      return false;
    }
    return true;
  };
  // const loginAxios = async () => {
  //   const result = await instance.request({
  //     data: {
  //       data_type: "login",
  //       params: { mail: mail, password: password },
  //     },
  //   });
  //   console.log(result);
  // };
  // const login = async (e) => {
  //   //add ad to the db, returns true/false
  //   e.preventDefault();
  //   if (!checkForValidFields()) {
  //     return;
  //   }
  //   const obj = makeObjOfAllFields();
  //   loginAxios();
  //   returnStateToDefault();
  // };
  const login = (e) => {
    //add ad to the db, returns true/false
    e.preventDefault();
    if (!checkForValidFields()) {
      return;
    }
    const obj = makeObjOfAllFields();
    let response = api.sendDataFromJsToPhp(obj); //call func to send for db
    console.log(response);
    returnStateToDefault();
  };
  return (
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
          onChange={(e) => onChangeState(setMail, e)}
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
        <Button onClick={login} content="login" />
      </p>
    </form>
  );
}
LoginPage.defaultProps = {};
export default LoginPage;
