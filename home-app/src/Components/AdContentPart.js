import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Parameter from "./Parameter.js";
const AdContentPart = (props) => {

  const renderComp = () => {
    let code = [];
    for (let index = 0; index < props.adContent.length; index++) {
      console.log(props.adContent[index].prevDisplay);
      //we get array of all the ad content as props
      if(props.adContent[index].display_type==="checkBox"){
        //we make display as checkbox
        code.push(
          <Parameter
            key={props.adContent[index].adID + props.adContent[index].name}
            paramName={props.adContent[index].name}
            paramValue={props.adContent[index].value}
            className={
              props.adContent[index].prevDisplay
                ? "paramNotVisible"
                : "paramVisible"
            }
            display_type="checkBox"
          />
        );
      }
      else{
        //we make the display as text
       code.push(
         <Parameter
           key={props.adContent[index].adID + props.adContent[index].name}
           paramName={props.adContent[index].name}
           paramValue={props.adContent[index].value}
           className={
             props.adContent[index].prevDisplay
               ? "paramNotVisible"
               : "paramVisible"
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
    </div>
  );
};

export default AdContentPart;
