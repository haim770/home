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
      
    </div>
    )
  
  };

export default Nav;
