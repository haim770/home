import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/navigation/navStyle.css";
import "../styles/navigation/responsiveNavigation.css";
import useAuth from "../Auth/useAuth";
import UserProfile from "./pages/users/UserProfile";
import useDH from "../Auth/DH/DHUseContext";
const NavRoot = () => {
  //the roots at the top of page
  const { auth } = useAuth();
  const { generateAlicePKA } = useDH();
   useEffect(() => {
     generateAlicePKA();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const menuData = [
    {
      path: "/",
      name: "בית",
    },
    { path: "/AdsWithSearch", name: "מודעות" },
    { path: "/Blog", name: "בלוג" },
    {
      path: "/packages",
      name: "הצגת חבילות",
    },
    {
      path: "/usefullLinks",
      name: "לינקים",
    },
    {
      path: "/addAd",
      name: "הוספת מודעה",
    },
    { path: "/Settings", name: "הגדרות" },
  ];
  return (
    <nav className="MuiPaper-root MuiAppBar-root jss4 MuiAppBar-positionSticky MuiAppBar-colorPrimary jss2 MuiPaper-elevation4">
      {/* Inner Nav bar */}
      <div className="MuiToolbar-root jss4 jss5 MuiToolbar-regular MuiToolbar-gutters">
        {/* Site Logo */}
        <label className="homeLogo jss6">
          <NavLink to="/" key="Home">
            <img
              src={require("../pics/logoHome.png")}
              alt="logo"
              className="jss10"
            />
          </NavLink>
        </label>
        {/* Site Navigation */}
        <div className="menu jss14 jss8">
          <div className="jss13">
            {
              // This section build our navigation NavLinks, if we want to add new link we just need to add it to menuData element.
              menuData.map((item) => (
                <div className="jss12" key={item.name}>
                  <NavLink
                    to={item.path}
                    key={item.name}
                    className="MuiButtonBase-root MuiButton-root jss22 MuiButton-text"
                  >
                    <div
                      className="list_item MuiButton-label jss23"
                      key={item.name}
                    >
                      {item.name}
                    </div>
                  </NavLink>
                </div>
              ))
            }
          </div>
        </div>

        {/* Site User area */}
        <div className="userArea">
          {auth?.accessToken ? (
            <UserProfile />
          ) : (
            <>
              <Link to="/Login" style={{ textDecoration: "none" }}>
                <span>התחבר</span>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <span>הירשם</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavRoot;
