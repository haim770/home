import React, { useState } from "react";

import { Routes, Route, Link, Outlet } from "react-router-dom";
import "../styles/Main.css";
function Main(props) {
  return <main className="main">
    {props.content}
    <Outlet/>
  </main>;
}
Main.defaultProps = {
 content:"dd"
};
export default Main;
