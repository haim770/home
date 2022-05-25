import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import AdPart from "../AdPart.js";
import AdContentPart from "../AdContentPart.js";
const AdsBlock = (props) => {
  return (
    <Link
      to={`/${props.adBlock.ad[0].adID}`}
      key={props.adBlock.ad[0].adID}
      state={{
        adBlock: props.adBlock,
      }}
    >
      <div className="MuiPaper-root jss184 jss186 jss181 MuiPaper-elevation3 MuiPaper-rounded">
        <div className="jss179">
          {/* This div will contain data like how many days the add on the site */}
          <div className="jss190">
            <div className="jss209">
              <span>Some data</span>
            </div>
          </div>
          {/* This div will contain add to favorite */}
          <div className="jss191">
            <div className="MuiButtonBase-root MuiFab-root jss2248">
              <span className="MuiFab-label">
                <svg
                  version="1.1"
                  className="jss2250 jss2251"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 482.207 482.207"
                >
                  <path
                    d="M482.207,186.973l-159.699-33.705L241.104,11.803l-81.404,141.465L0,186.973l109.388,121.134L92.094,470.404l149.01-66.6
	l149.01,66.6l-17.294-162.296L482.207,186.973z M241.104,370.943l-113.654,50.798l13.191-123.788l-83.433-92.393l121.807-25.707
	l62.09-107.9l62.09,107.9L425,205.561l-83.433,92.393l13.191,123.788L241.104,370.943z"
                  ></path>
                </svg>
              </span>
            </div>
          </div>

          {/* This will hold the main assets image */}
          <img
            src={require("../../pics/blank_home.png")}
            alt="main_home_frame"
            className="jss2255"
          />
        </div>

        <div className="adCardTitle">
          <h4>
            {console.log(props.adBlock.ad)}
            <AdPart ad={props.adBlock.ad} />
            <AdContentPart adContent={props.adBlock.adContent} />
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default AdsBlock;
