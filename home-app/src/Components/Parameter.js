import React, { useState } from "react";
import "../styles/Parameter.css";
function Parameter(props) {
  // const getParamConfigFromFile = () => {
  //   //returns the json that are relevant to our parameter
  //   const element = parameters.filter(
  //     (element) => element.paramName === props.paramName
  //   );
  //   return element;
  // };
  // const buildShowForParam = () => {
  //   //build the list of parameters to show one by one we get a json obj and check his style
  //   //then we style it accordingly
  //   const paramConfig = getParamConfigFromFile();
  //   if (paramConfig[0]["paramStyle"] === "input") {
  //     return (
  //       <li>
  //         <span>{props.paramName}</span>
  //         <span>{props.paramValue}</span>
  //       </li>
  //     );
  //   } else {
  //     if (paramConfig[0]["paramStyle"] === "checkBox") {
  //       return (
  //         <li>
  //           <span>{props.paramName}</span>
  //           <span>
  //             <input
  //               type="checkbox"
  //               readOnly
  //               checked={props.paramValue === "1" ? true : false}
  //             />
  //           </span>
  //         </li>
  //       );
  //     } else {
  //       return (
  //         <li>
  //           <span>{props.paramName}</span>
  //           <span>{props.paramValue}</span>
  //         </li>
  //       );
  //     }
  //   }
  // };
  return (
    <li>
      <span>{props.paramName}</span>
      <span>{props.paramValue}</span>
    </li>
  );
}
Parameter.defaultProps = {
  paramName: "name",
  paramValue: "value",
};
export default Parameter;
