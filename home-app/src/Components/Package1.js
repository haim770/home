import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "../styles/Package1.css";
import Button from "./Button";
const Package1 = (props) => {
  const buy=(e)=>{
    e.preventDefault();
    console.log("buy pack go to php");
  }
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
        <Button content="buy pack" onClick={buy}/>
      </div>
    </Link>
  );
};

export default Package1;
