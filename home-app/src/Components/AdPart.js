import React from "react";
import Parameter from "./Parameter.js";
import "../styles/adPart.css";
const AdPart = (props) => {
  const renderComp = () => {
    let code = [];
    for (const [key, value] of Object.entries(props.ad[0])) {
      if (
        key === "adID" ||
        key === "active" ||
        key === "close_reason" ||
        key === "map_X" ||
        key === "expire_date" ||
        key === "approval_status" ||
        key === "map_Y" ||
        key === "user_id"
      ) {
        continue;
      }
      //we get an object of ad in the props and get out the 0 place which is the ads params
      code.push(
        <Parameter
          key={props.ad[0].adID + key}
          paramName={key}
          paramValue={value}
        />
      );
    }
    return code;
  };

  return (
    <ul className={props.className}>
      <h1>adPart</h1>
      {props.ad ? renderComp() : <li>no ad</li>}
    </ul>
  );
};

export default AdPart;
