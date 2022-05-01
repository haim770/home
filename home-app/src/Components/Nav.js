import React, { useState } from "react";
import NavPart from "./NavPart";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import "../styles/Nav.css";
import "../styles/navStyle.css";
import "../styles/siteStyle.css";
function Nav(props) {
  const [navClass, setNavClass] = useState("navFlexStyle navBox");
  return (
    <nav className="mainFramStyle mainNavRoot navFlexStyle navBox hideAt960px">
      <div className="innerNavPadding navFlexStyle MuiToolbar-regular toolBarRoot MuiToolbar-gutters">
<<<<<<< HEAD
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
    </div>
=======
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
>>>>>>> a29423afb9bca5cb1bbc42e7ad5a5f6936e106a1
  );
}
Nav.defaultProps = {};
export default Nav;



