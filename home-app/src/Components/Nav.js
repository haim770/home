import React, { useState } from "react";
import Button from "./Button";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import "./Nav.css";
import "../styles/navStyle.css";
import "../styles/siteStyle.css";
function Nav(props) {
  const [navClass, setNavClass] = useState("navFlexStyle navBox");
  return (
    <div className="mainFramStyle mainNavRoot navFlexStyle navBox hideAt960px">
      <div className="innerNavPadding navFlexStyle MuiToolbar-regular toolBarRoot MuiToolbar-gutters">
        
          <div className="logoNav logoSizeReducer">
          <nav>
            <Link to="/">
              <img src={require("../pics/logoHome.jpg")} alt="logo" />
            </Link>
            </nav>
          </div>

          <div className="navigationStyle">
          <nav>
            <Link to="/listAds">list ads</Link>|{"  "}
            <Link to="/testAxios">Test Axios</Link> |{"  "}
            <Link to="/parameter">parameter</Link> |
            </nav>
            <Outlet />
          </div>    
              
      </div>
    </div>
  );
}
Nav.defaultProps = {};
export default Nav;
