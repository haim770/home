import React, { useState } from "react";
import "../styles/Parameter.css";
function Parameter(props) {
  //parameter of key++value display
  // const [classParam, setClassParam] = useState(props.className);

  const buildShowForParam = () => {
    //build the list of parameters to show one by one we get a json obj and check his style
    //then we style it accordingly
    if (props.display_type === "text") {
      return (
        <li className={props.className}>
          <span className="key">{props.paramName}</span>
          <span className="val">{props.paramValue}</span>
        </li>
      );
    } else {
      if (props.display_type === "checkBox") {
        return (
          <li className={props.className}>
            <span className="key">{props.paramName}</span>
            <span className="val">
              <input
                type="checkbox"
                readOnly
                checked={props.paramValue === "1" ? true : false}
              />
            </span>
          </li>
        );
      } else {
        return (
          <li className={props.classParam}>
            <span className="key">{props.paramName}</span>
            <span className="val">{props.paramValue}</span>
          </li>
        );
      }
    }
  };
  return props.paramName ? buildShowForParam() : <p>no parameter</p>;
}
Parameter.defaultProps = {
  paramName: "name",
  paramValue: "value",
  display_type: "text",
  className: "paramVisible",
};
export default Parameter;
