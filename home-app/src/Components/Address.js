import React, { useState } from "react";
import "../styles/Address.css";
import Parameter from "./Parameter.js";

function Address(props) {
  return (
    <ul>
      <Parameter paramName="city" paramValue={props.city} />
      <Parameter paramName="street" paramValue={props.street} />
      <Parameter paramName="num" paramValue={props.number} />
    </ul>
  );
}
Address.defaultProps = {
  city: "b4",
  street: "kk",
  number: "1",
};
export default Address;
