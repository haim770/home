import React, { useState } from "react";
import NavPart from "./NavPart";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import "./Nav.css";
function Nav(props) {
  const [navClass, setNavClass] = useState("upperNav");
  return (
    <div>
      <nav className={navClass}>
        <NavPart
          part="logo" //name of the part of the navbar
          image={<img src={require("../pics/logoHome.jpg")} alt="logo" />}
        />
        <NavPart
          part="main"
          listAdsLink="/listAds"
          listAdsLinkContent="list ads"
          parameterLink="/parameter"
          parameterLinkContent="parameter"
          TestAxiousLink="/testAxios"
          TestAxiousLinkContent="test axious"
        />
      </nav>

      <Outlet />
    </div>
  );
}
Nav.defaultProps = {};
export default Nav;
