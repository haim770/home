import React, { useEffect, useState } from "react";
import Button from "./Button";
import Parameter from "./Parameter";
import instance from "../api/AxiosInstance.jsx";
import "../styles/Ad.css";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AdPart from "./AdPart";
import AdContentPart from "./AdContentPart";
function AdFull(props) {
  const location = useLocation();
  const data = location.state;
  return (
    <section className={"ad"}>
      <ul>
        <AdPart ad={data.adBlock.ad} />
        <AdContentPart adContent={data.adBlock.adContent} />
      </ul>
      <p>
        <Button content="contact seller" onclick={props.onclick} />
      </p>
    </section>
  );
}
AdFull.defaultProps = {
  sellerName: "seller",
  price: "0",
  createTime: "00/00/00",
  adLink: "null",
  city: "haif",
  street: "ha",
  number: "45",
  rooms: "3",
};
export default AdFull;
