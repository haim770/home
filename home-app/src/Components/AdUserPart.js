import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Parameter from "./Parameter.js";
const AdUserPart = (props) => {
  const renderComp = () => {
    let code = 
    <div>
          <Parameter
            key={props.user.uuid}
            paramName="id of user is"
            paramValue={props.user[0].uuid}
          />
            <Parameter
              key={props.user[0].first_name}
              paramName="first name of user is"
              paramValue={props.user[0].first_name}
            />
          </div>;
            return code;
  }

  return (
    <div>
      <h1>user info</h1>
      {props.user ? renderComp() : <p>no user content</p>}
    </div>
  );
};

export default AdUserPart;
