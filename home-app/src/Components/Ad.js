import React, { useState } from "react";
import Button from "./Button";
import Address from "./Address";
import Parameter from "./Parameter";
import "../styles/Ad.css";
function Ad(props) {
  return (
    <section className={props.className} id={props.id}>
      <h2>
        {props.id} {props.sellerName}
      </h2>
      <ul>
        <Parameter paramName="price" paramValue={props.price} />
        <Parameter paramName="create time" paramValue={props.createTime} />
        <Parameter paramName="ad link" paramValue={props.adLink} />
        <Parameter paramName="rooms" paramValue={props.rooms} />
        <Parameter />
        <Address
          street={props.street}
          city={props.city}
          number={props.number}
        />
      </ul>
      <p>
        <Button
          content="contact seller"
          onclick={props.onclick}
        />
      </p>
    </section>
  );
}
Ad.defaultProps = {
  sellerName: "seller",
  price: "0",
  createTime: "00/00/00",
  adLink: "null",
  city: "haif",
  street: "ha",
  number: "45",
  rooms: "3",
};
export default Ad;
