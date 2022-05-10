import React, { useState } from "react";
import Button from "./Button";
import Address from "./Address";
import Parameter from "./Parameter";
import "../styles/Ad.css";
import { Link, NavLink, Outlet } from "react-router-dom";
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
        <Parameter paramName="apartment" paramValue={props.apartment} />
        <Parameter paramName="street" paramValue={props.street} />
        <Parameter paramName="city" paramValue={props.city} />
        <Parameter paramName="number" paramValue={props.number} />
        <Parameter paramName="entry" paramValue={props.entry} />
        <Parameter
          paramName="air conditioner"
          paramValue={props.air_conditioner}
        />
      </ul>
      <Link
        to={`/ListAds/${props.price}`}
        key={props.price}
        state={{
          apartment:props.apartment,
          entry:props.entry,
          number:props.number,
          city:props.city,
          street:props.street,
          price: props.price,
          createTime: props.createTime,
          adLink: props.adLink,
          rooms: props.rooms,
        }}
      >
        click here to move to full ad
      </Link>
      <p>
        <Button content="contact seller" onclick={props.onclick} />
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
