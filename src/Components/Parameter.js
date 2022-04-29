import React, { useState } from "react";
import "./Parameter.css";
function Parameter(props) {
  return (
    <li><span>{props.paramName} :</span> {props.paramValue}</li>
  );
}
Parameter.defaultProps = {
  paramName:"name",
  paramValue:"value"
};
export default Parameter;
