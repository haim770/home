import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Parameter from "./Parameter.js";
const AdContentPart = (props) => {
  const renderComp = () => {
    let code = [];
    for (let index = 0; index < props.adContent.length; index++) {
      //we get array of all the ad content as props
      if(props.adContent[index].display_type==="checkBox"){
        //we make display as checkbox
        code.push(
          <Parameter
            key={props.adContent[index].adID + props.adContent[index].name}
            paramName={props.adContent[index].name}
            paramValue={props.adContent[index].value}
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
         />
       );
      }
      
    // for (const [key, value] of Object.entries(props.adContent[index])) {
    //   //we get an object of ad in the props and get out the 0 place which is the ads params
    //   code.push(
    //     <div key={props.adContent[index].adId+key}>
    //       <Parameter paramName={key} paramValue={value} />
    //     </div>
    //   );
    //   // console.log(`${key}: ${value}`);
     }
    return code;
  };

  return (
    <div className="adCardTitle">
      <h1>ad content part</h1>
      {console.log(props.ad)}
      {props.adContent ? renderComp() : <p>no ad content</p>}
    </div>
  );
};

export default AdContentPart;
