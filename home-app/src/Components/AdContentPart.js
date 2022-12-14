import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Button from "./Button.js";
import Parameter from "./Parameter.js";
const AdContentPart = (props) => {
  //component to display ad content part of ad
  const [classForParamsNotDefaultPrev, setClassForParamsNotDefaultPrev] =
    useState("paramVisible");
  const toggleDisplayParams = () => {
    classForParamsNotDefaultPrev === "paramNotVisible"
      ? setClassForParamsNotDefaultPrev("paramVisible")
      : setClassForParamsNotDefaultPrev("paramNotVisible");
  };
  const renderComp = () => {
    let code = [];
    for (let index = 0; index < props.adContent.length; index++) {
      if (props.adContent[index].value === "") {
        continue;
      }
      if (props.adContent[index].display_type === "checkBox") {
        //we get array of all the ad content as props
        //we make display as checkbox
        code.push(
          <Parameter
            key={props.adContent[index].adID + props.adContent[index].name}
            paramName={props.adContent[index].name}
            paramValue={props.adContent[index].value}
            className={
              props.adContent[index].prevDisplay === "1"
                ? "paramVisible"
                : classForParamsNotDefaultPrev
            }
            display_type="checkBox"
          />
        );
      } else {
        //we make the display as text
        code.push(
          <Parameter
            key={props.adContent[index].adID + props.adContent[index].name}
            paramName={props.adContent[index].name}
            paramValue={props.adContent[index].value}
            className={
              props.adContent[index].prevDisplay === "1"
                ? "paramVisible"
                : classForParamsNotDefaultPrev
            }
          />
        );
      }
    }
    return code;
  };

  return (
    <div className="adCardTitle">
      {props.adContent ? renderComp() : ""}
      {/* <Button onClick={toggleDisplayParams} content="הראה פרמטרים נוספים" /> */}
    </div>
  );
};

export default AdContentPart;
