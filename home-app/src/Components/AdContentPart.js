import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Button from "./Button.js";
import Parameter from "./Parameter.js";
const AdContentPart = (props) => {
  const [classForParamsNotDefaultPrev,setClassForParamsNotDefaultPrev]=useState("paramNotVisible");
  const toggleDisplayParams=()=>{
   classForParamsNotDefaultPrev === "paramNotVisible"
     ? setClassForParamsNotDefaultPrev("paramVisible")
     : setClassForParamsNotDefaultPrev("paramNotVisible");
  }
  const renderComp = () => {
    let code = [];
  console.log(props);
    for (let index = 0; index < props.adContent.length; index++) {
      //we get array of all the ad content as props
      if (props.adContent[index].display_type === "checkBox") {
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
      <h1>ad content part</h1>
      {props.adContent ? renderComp() : <p>no ad content</p>}
      <Button onClick={toggleDisplayParams} content="הראה פרמטרים נוספים"/>
    </div>
  );
};

export default AdContentPart;
