import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Parameter from "./Parameter.js";
const AdUserPart = (props) => {
  const renderComp = () => {
    let code = (
      <div>
        <Parameter
          key={props.user[0].first_name}
          paramName="שם מעלה המודעה הוא :"
          paramValue={props.user[0].first_name}
        />
      </div>
    );
    return code;
  };

  return (
    <div>
      {props.user ? renderComp() : <p>no user content</p>}
    </div>
  );
};

export default AdUserPart;
