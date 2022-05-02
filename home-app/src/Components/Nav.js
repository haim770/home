import React, { useState } from "react";
import NavPart from "./NavPart";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import "../styles/navStyle.css";
import "../styles/siteStyle.css";

function Nav(props) {
  return (

    <nav className="mainFramStyle mainNavRoot navFlexStyle navBox hideAt960px">
      <div className="innerNavPadding navFlexStyle MuiToolbar-regular toolBarRoot MuiToolbar-gutters">

        <div className="logoNav logoSizeReducer">
          <nav>
            <Link to="/">
              <img
                src={require("../pics/logoHome.png")}
                alt="logo"
                className="logoSize"
              />
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
        
      </nav>

    <nav className="navigationStyle">
      <NavPart
        className="logo"
        part="logo" //name of the part of the navbar
        image={<img src={require("../pics/logoHome.png")} alt="logo" />}
      />
      <NavPart
        className="mainPart"
        part="main"
        listAdsLink="/listAds"
        listAdsLinkContent="list ads"
        parameterLink="/parameter"
        parameterLinkContent="parameter"
        TestAxiousLink="/testAxios"
        TestAxiousLinkContent="test axious"
      />
      <NavPart
        className="userPart"
        part="userPart"
        listAdsLink="/listAds"
        listAdsLinkContent="list ads"
        parameterLink="/parameter"
        parameterLinkContent="parameter"
        TestAxiousLink="/testAxios"
        TestAxiousLinkContent="test axious"
      />
    </nav>
  );
}
Nav.defaultProps = {};
export default Nav;
