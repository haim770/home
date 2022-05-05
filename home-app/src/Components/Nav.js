import React, { useState } from "react";
import NavPart from "./NavPart";
import { Routes, Route, Link, Outlet, BrowserRouter } from "react-router-dom";
import NavRoots from "./NavRoots";
import Home from "./pages/Home";
//import TestAxios from "./pages/TestAxios";
import Ads from "./pages/Ads";
import ListAds from "./ListAds";
import AddAdForm from "./AddAdForm";
import Api from "../api/Api";
const api = new Api();
let arr=[];
arr = api.postToGetData({ data: "ads" });
const Nav = () => {
  return (
    <div>
      <BrowserRouter>
        <NavRoots />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Ads" element={<Ads />} />
          <Route
            path="/ListAds"
            element={<ListAds api={api} allAds={arr} />}//we pass the initial ads that will be seen at the page 
            //so it will render for the first time
          />
          <Route
            path="/AddAdForm"
            element={<AddAdForm api={api} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default Nav;
