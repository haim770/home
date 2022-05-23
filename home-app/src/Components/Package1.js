import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "../styles/Package1.css";
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
        <h1>{props.pack.title}</h1>
        <h2>{props.pack.content}</h2>
        <p>{props.pack.price} is the price</p>
        <p>{props.pack.ad_value} value ads</p>
      </div>
    </Link>
  );
};

export default Package1;
