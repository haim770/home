import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Checkout from "./Checkout";
import "../styles/Package1.css";
import Button from "./Button";
const Package1 = (props) => {
  return (
    <Link
      to={`/packages/${props.pack.packageId}`}
      key={props.pack.packageId}
      state={{
        pack: props.pack,
      }}
    >
      <div className="pack">
        <section>
          <h1>{props.pack.title}</h1>
          <h2>{props.pack.content}</h2>
          <p>{props.pack.price} is the price</p>
          <p>{props.pack.ad_value} value ads</p>
        </section>
        <Checkout
          title={props.pack.title}
          price={props.pack.price}
          packId={props.pack.packageId}
          adValue={props.pack.ad_value}
        />
      </div>
    </Link>
  );
};

export default Package1;
