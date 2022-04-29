import React, { useState } from "react";
import Button from "./Button";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import "./Nav.css";
function Nav(props) {
  const [navClass, setNavClass] = useState("upperNav");
  return (
    <div>
      <nav className={navClass}>
        <Link to="/">
          <img src={require("../pics/logoHome.jpg")} alt="logo" />
        </Link>
        |{"  "}
        <Link to="/listAds">list ads</Link>|{"  "}
        <Link to="/testAxios">Test Axios</Link> |{"  "}
        <Link to="/parameter">parameter</Link> |
      </nav>

      <Outlet />
    </div>
  );
}
Nav.defaultProps = {};
export default Nav;
