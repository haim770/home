import React, { useEffect, useState } from "react";
import Button from "./Button";
import Address from "./Address";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Parameter from "./Parameter";
import "../styles/Register.css";
import Api from "../api/Api";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/AxiosInstance";
function ChangeUserRule(props) {
  const [first_name, setfirst_name] = useState(""); //hook for parameter name
  const [last_name, setLast_name] = useState(""); //hook for parameter max value
  const [mail, setMail] = useState(""); //hook for parameter min value
  const [password, setPassword] = useState(""); //hook for parameter style
  const [phone, setPhone] = useState(""); //hook for parameter style
  const [mailSelected, setMailSelected] = useState("");
  const [users, setUsers] = useState([]); //user registration status
  

  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    setStateName(e.target.value);
  };
  const getAllUsers = async () => {
    //add ad to the db, returns true/false
    const result = await instance.request({
      data: {
        data_type: "getAllUsers",
        params: {},
      },
    });
    if (result) {
      setUsers(result.data.map((user) => <option>{user.mail}</option>));
    }
    console.log(result);
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const handleMailSelect=(e)=>{
    e.preventDefault();
  }
  return (
    <section className="section_form ">
      <h1>שנה הרשאות למשתמש</h1>
      <label key="mails">
        <span>users mails</span>
        <select
          className=""
          name="mails"
          value={mailSelected}
          onChange={handleMailSelect}
          aria-label="users">
            {users}
        </select>
      </label>
      {users != [] ? <p>{console.log(users)}</p> : <p>"no users"</p>}
    </section>
  );
}
ChangeUserRule.defaultProps = {};
export default ChangeUserRule;
