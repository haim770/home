import React, { useEffect, useState } from "react";
import Button from "./Button";
import Address from "./Address";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserShow from "./UserShow.js";
import styles from "../styles/changeUserRules.module.css";
import "../styles/Register.css";
import Api from "../api/Api";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/AxiosInstance";
import useAuth from "../Auth/useAuth";
import Select from "react-select";
function ChangeUserRule(props) {
  //comp for handling users by manager
  const [first_name, setfirst_name] = useState(""); //hook for parameter name
  const [last_name, setLast_name] = useState(""); //hook for parameter max value
  const [mail, setMail] = useState(""); //hook for parameter min value
  const [password, setPassword] = useState(""); //hook for parameter style
  const [phone, setPhone] = useState(""); //hook for parameter style
  const [UserSelected, setUserSelected] = useState(false); //mail selected
  const [mailOptions, setMailOptions] = useState([{}]);
  const [mailSelected, setMailSelected] = useState({});
  const [users, setUsers] = useState(""); //user info
  const [filter, setFilter] = useState("");
  const { auth } = useAuth();
  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    setStateName(e.target.value);
  };
  const getAllUsers = async () => {
    //get users from the db and put it in the selects
    const result = await instance.request({
      data: {
        data_type: "getAllUsers",
        params: {},
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    if (result) {
      setUsers(result.data);
      result.data
        .filter((element) =>
          element.rule.includes(
            filter === "כולם" ? "" : filter === "משתמש" ? "2001" : "5150"
          )
        )
        .forEach((element) => {
          setMailOptions((mailOptions) => [
            ...mailOptions,
            {
              label:
                element.mail +
                "  " +
                element.first_name +
                " " +
                element.last_name,
              value: element,
            },
          ]);
        });
    }
    console.log(result.data);
  };
  const filterRes = (filterVal) => {
    setMailOptions([{}]);
    console.log(filterVal);
    users
      .filter((element) =>
        element.rule.includes(
          filterVal === "כולם" ? "" : filterVal === "משתמש" ? "2001" : "5150"
        )
      )
      .forEach((element) => {
        setMailOptions((mailOptions) => [
          ...mailOptions,
          {
            label:
              element.mail +
              "  " +
              element.first_name +
              " " +
              element.last_name,
            value: element,
          },
        ]);
      });
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
      <label>
        <span>בחר תפקיד משתמש</span>
        <select
          id="rule"
          name="rule"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            filterRes(e.target.value);
            setUserSelected(false);
            setMailSelected({});
          }}
        >
          <option>כולם</option>
          <option>מנהל</option>
          <option>משתמש</option>
        </select>
      </label>
      <label key="mails" className={styles.lableForSelect}>
        <span>פרטי המשתמש</span>
        <Select
          className=""
          name="mails"
          value={mailSelected || ""}
          options={mailOptions}
          onChange={handleChangeMail}
          aria-label="users"
        />
      </label>
      {UserSelected ? (
        <UserShow
          user={UserSelected}
          act="userIsIn"
          getAllUsers={getAllUsers}
          setUserSelected={setUserSelected}
          setMailOptions={setMailOptions}
          setMailSelected={setMailSelected}
        />
      ) : (
        ""
      )}
    </section>
  );
}
ChangeUserRule.defaultProps = {};
export default ChangeUserRule;
