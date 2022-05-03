import React, { useState } from "react";
import NavPart from "./NavPart";
import { Routes, Route, Link, Outlet, BrowserRouter } from "react-router-dom";
import NavRoots from "./NavRoots";
import Home from "./pages/Home";
import TestAxios from "./pages/TestAxios";
import Ads from "./pages/Ads";
const Nav = () => {
  return (
    <div>
      <BrowserRouter>
        <NavRoots />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/TestAxios" element={<TestAxios />} />
          <Route path="/Ads" element={<Ads />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
/* Old Haim code
function Nav(props) {
  return (
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
Nav.defaultProps = {};*/
export default Nav;
