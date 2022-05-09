import React, { useState } from "react";
import NavPart from "./NavPart";
import { Routes, Route, Link, Outlet, BrowserRouter } from "react-router-dom";
import NavRoots from "./NavRoots";
import Home from "./pages/Home";
//import TestAxios from "./pages/TestAxios";
import Ads from "./pages/Ads";
import AdsAddParams from "./pages/AdsAddParams";
import ListAds from "./ListAds";
import AddAdForm from "./AddAdForm";
import AddParameterToAds from "./AddParameterToAds";
import Api from "../api/Api";
const api = new Api();
let arr = [];
arr = api.postToGetData({ data: "ads" });
const Nav = () => {
  return (
    <div>
      <BrowserRouter>
        <NavRoots />
        <Routes>
        {/* Create Nested Route, all under row 23 will be subRoute of the main page */}
          <Route path="/" element={<Home />}/>
            <Route path="Ads" element={<Ads />} />
            <Route
              path="/ListAds"
              element={<ListAds api={api} allAds={arr} />} //we pass the initial ads that will be seen at the page
              //so it will render for the first time
            />
            <Route path="/AddAdForm" element={<AddAdForm api={api} />} />
            <Route
              path="/AddParameterToAds"
              element={<AddParameterToAds api={api} />}
            />
            <Route path="/AdsAddParams" element={<AdsAddParams />} />
          
        </Routes>
        <Outlet/>
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
