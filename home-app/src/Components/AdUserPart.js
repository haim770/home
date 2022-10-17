import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Parameter from "./Parameter.js";
const AdUserPart = (props) => {
  //display the user part
  const renderComp = () => {
    let code = (
      <div>
        <Parameter
          key={props.user[0].first_name}
          paramName="שם מעלה המודעה הוא :"
          paramValue={
            <Link to={{ pathname: "/userShowById/" + props.user[0].uuid }}>
              {props.user[0].first_name}
            </Link>
          }
        />
      </div>
    );
    return code;
  };

  return <div>{props.user ? renderComp() : <p>no user content</p>}</div>;
};

export default AdUserPart;
