import React, { useEffect, useState } from "react";
import Button from "./Button";
import Address from "./Address";
import Parameter from "./Parameter";
import instance from "../api/AxiosInstance.jsx";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles/packageFull.css";
function PackageFull(props) {
  const location = useLocation();
  const data = location.state;
    const buy = (e) => {
      e.preventDefault();
      console.log("buy pack go to php");
    };
  return (
    <section className="adFull">
      <ul>
        <Parameter paramName="price" paramValue={data.pack.price} />
        <Parameter paramName="content" paramValue={data.pack.content} />
        <Parameter paramName="title" paramValue={data.pack.title} />
        <Parameter paramName="ad_value" paramValue={data.pack.ad_value} />
      </ul>
      <Button content="buy pack" onClick={buy} />
    </section>
  );
}
PackageFull.defaultProps = {};
export default PackageFull;
