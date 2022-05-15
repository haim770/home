import React, { useEffect, useState } from "react";
import Button from "./Button";
import Address from "./Address";
import Parameter from "./Parameter";
import AxiosInstance from "./pages/AxiosInstance.jsx";
import "../styles/Ad.css";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Api from "../api/Api";
function AdFull(props) {
  const [ad, setAd] = useState({}); //hook for the rent/buy
  const linkAd = useParams();
  const location = useLocation();
  const data = location.state;
  const api = new Api();
  const renderCompParmeters = () => {};
  return (
    <section className={props.className} id={props.id}>
      {console.log(ad)}
      <h2>
        {props.id} {props.sellerName}
      </h2>
      <ul>
        {console.log(props.adBlock)}
        <Parameter paramName="price" paramValue={data.adBlock.price} />
        <Parameter paramName="create time" paramValue={data.adBlock.price} />
        <Parameter paramName="ad link" paramValue={data.adBlock.adLink} />
        <Parameter paramName="rooms" paramValue={data.adBlock.rooms} />
        <Parameter paramName="apartment" paramValue={data.adBlock.apartment} />
        <Parameter paramName="street" paramValue={data.adBlock.street} />
        <Parameter paramName="city" paramValue={data.adBlock.city} />
        <Parameter paramName="number" paramValue={data.adBlock.number} />
        <Parameter paramName="entry" paramValue={data.adBlock.entry} />
        {/* <Parameter
          paramName="air conditioner"
          paramValue={props.adBlock.air_conditioner}
        /> */}
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
