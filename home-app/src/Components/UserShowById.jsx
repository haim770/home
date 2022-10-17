import React, { useEffect, useLayoutEffect, useState } from "react";
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
function UserShowById(props) {
  //user show comp for manager
  const { auth } = useAuth();
  const [user, setUser] = useState("");
  console.log(auth);
  const getUser = async () => {
    const urlSplit = window.location.href.split("/");
    const result = await instance.request({
      data: {
        data_type: "getUserById",
        params: { userId: urlSplit[urlSplit.length - 1] },
        guest: auth.accessToken != undefined ? "registered" : "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result?.data) {
      setUser(result.data);
    }
  };
  useLayoutEffect(() => {
    if (auth) getUser();
  }, [auth]);

  return user ? (
    <section className="userShowFull">
      <h2>תצוגת משתמש </h2>
      <p>
        <Parameter paramName="שם פרטי" paramValue={user[0].first_name} />
        <Parameter paramName="שם משפחה" paramValue={user[0].last_name} />
        <Parameter paramName="תאריך רישום" paramValue={user[0].create_time} />
        <Parameter paramName="טלפון" paramValue={user[0].phone || ""} />
        <Parameter
          paramName="פעיל"
          paramValue={user[0].active === "1" ? "פעיל" : "מחוק"}
        />
        <Parameter
          paramName="תפקיד"
          paramValue={user[0].rule === "2001" ? "משתמש" : "מנהל"}
        />

        <Parameter paramName="נראה לאחרונה" paramValue={user[0].last_seen} />
        <Parameter paramName="מידע נוסף" paramValue={user[0].prompt} />
      </p>
      <p
        style={{
          display: auth.roles == "5150" ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        <Parameter paramName="מייל" paramValue={user[0].mail} />
        <Parameter
          paramName="מודעות שנשארו"
          paramValue={user[0].remaining_ads || ""}
        />
      </p>
      <Toaster />
    </section>
  ) : (
    ""
  );
}
UserShowById.defaultProps = {};
export default UserShowById;
