import React, { useState } from "react";
import "./Address.css";
function Address(props) {
  return (
    <ul>
      adress is <li>city is {props.city}</li>
      <li>street is {props.street}</li>
      <li>num is {props.number}</li>
    </ul>
  );
}
Address.defaultProps = {
  city: "b4",
  street: "kk",
  number: "1",
};
export default Address;
