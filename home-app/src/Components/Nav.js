import React, { useState } from "react";
import NavPart from "./NavPart";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import "./Nav.css";
import "../styles/navStyle.css";
import "../styles/siteStyle.css";
function Nav(props) {
  const [navClass, setNavClass] = useState("navFlexStyle navBox");
  return (
    <nav className="mainFramStyle mainNavRoot navFlexStyle navBox hideAt960px">
      <div className="innerNavPadding navFlexStyle MuiToolbar-regular toolBarRoot MuiToolbar-gutters">
        <NavPart
          className="logoNav logoSizeReducer"
          part="logo" //name of the part of the navbar
          image={<img src={require("../pics/logoHome.png")} alt="logo" />}
        />
        <NavPart
          className="navigationStyle"
          part="main"
          listAdsLink="/listAds"
          listAdsLinkContent="list ads"
          parameterLink="/parameter"
          parameterLinkContent="parameter"
          TestAxiousLink="/testAxios"
          TestAxiousLinkContent="test axious"
        />
          <Outlet />
        </div>
      </nav>
  );
}
Nav.defaultProps = {};
export default Nav;



