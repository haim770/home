import React, { useState } from "react";
import Button from "./Button";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import "../styles/NavPart.css";
function NavPart(props) {
  const returnWantedPart = () => {
    //return the wanted content for the component
    let code = "";
    if (props.part === "logo") {
      code = (
        <nav className={props.className}>
          <Link className=" logo" to={props.homeLink}>
            {props.homeLinkContent}
          </Link>
        </nav>
      );
    } else {
      if (props.part === "main") {
        code = (
          <nav className={props.className}>
            <Link className="link" to={props.listAdsLink}>
              {props.listAdsLinkContent}
            </Link>
            |{"  "}
            <Link className="link" to={props.parameterLink}>
              {props.parameterLinkContent}
            </Link>
            |{"  "} ;
          </nav>
        );
      } else {
        code = (
          <nav className={props.className}>
            <Link className="link" to={props.TestAxiousLink}>
              {props.TestAxiousLinkContent}
            </Link>
            |{"  "}
          </nav>
        );
      }
    }

    return code;
  };
  return returnWantedPart();
}
NavPart.defaultProps = {
  homeLink: "/",
  homeLinkContent: (
    <img className="logo" src={require("../pics/logoHome.png")} alt="logo" />
  ),
  listAdsLink: "/listAds",
  listAdsLinkContent: "list ads",
  parameterLink: "/parameter",
  parameterLinkContent: "parameter",
  TestAxiousLink: "/testAxios",
  TestAxiousLinkContent: "test axious",
  part: "", //name of the part [logo,userPart,mainPart]
  className: "",
};
export default NavPart;
