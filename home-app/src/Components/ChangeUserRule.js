import React, { useEffect, useState } from "react";
import Button from "./Button";
import Address from "./Address";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserShow from "./UserShow.js";
import "../styles/Register.css";
import Api from "../api/Api";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/AxiosInstance";
import Select from "react-select";
function ChangeUserRule(props) {
  const [first_name, setfirst_name] = useState(""); //hook for parameter name
  const [last_name, setLast_name] = useState(""); //hook for parameter max value
  const [mail, setMail] = useState(""); //hook for parameter min value
  const [password, setPassword] = useState(""); //hook for parameter style
  const [phone, setPhone] = useState(""); //hook for parameter style
  const [UserSelected, setUserSelected] = useState({}); //mail selected
  const [mailOptions, setMailOptions] = useState([{}]);
  const [mailSelected, setMailSelected] = useState({});
  const [users, setUsers] = useState(""); //user info

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
      setUsers(result.data);
      result.data.forEach((element) => {
        setMailOptions((mailOptions) => [
          ...mailOptions,
          { label: element.mail, value: element },
        ]);
      });
    }
    console.log(result.data);
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const handleMailSelect = (e) => {
    e.preventDefault();
  };
  const handleChangeMail = (event) => {
    const value = event.value;
    setUserSelected(value);
    setMailSelected(event);
  };
  return (
    <section className="section_form ">
      <h1>שנה הרשאות למשתמש</h1>
      <label key="mails">
        <span>מייל</span>
        <Select
          className=""
          name="mails"
          value={mailSelected}
          options={mailOptions}
          onChange={handleChangeMail}
          aria-label="users"
        />
      </label>
      {UserSelected != [] && UserSelected !== <option>no user</option> ? (
        <p>there is a mail</p>
      ) : (
        <p>"no mail selected"</p>
      )}
      {users != [] ? <p></p> : <p>"no users"</p>}
      <UserShow user={UserSelected?UserSelected:[]} act="userIsIn" />
    </section>
  );
}
ChangeUserRule.defaultProps = {};
export default ChangeUserRule;
