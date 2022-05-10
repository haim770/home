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
  const Adlink = useParams();
  const location = useLocation();
  const data = location.state;
  const api = new Api();
  useEffect(() => {
    const arr = api.postToGetData({ data: "getAdByLink", adLink: Adlink });
    setAd(arr);
    console.log(arr);
  }, []);
  // const getSpecificAd = async () => {
  //   const result = await AxiosInstance({
  //     data: {
  //       data: "getAdByLink",
  //       params: { adLink: Adlink },
  //     },
  //   });
  //   setAd(result);
  //   console.log(result);
  // };

  return (
    <section className={props.className} id={props.id}>
      {console.log(ad)}
      <h2>
        {props.id} {props.sellerName}
      </h2>
      <ul>
        <Parameter paramName="price" paramValue={data.price} />
        <Parameter paramName="create time" paramValue={data.price} />
        <Parameter paramName="ad link" paramValue={data.adLink} />
        <Parameter paramName="rooms" paramValue={data.rooms} />
        <Parameter paramName="apartment" paramValue={data.apartment} />
        <Parameter paramName="street" paramValue={data.street} />
        <Parameter paramName="city" paramValue={data.city} />
        <Parameter paramName="number" paramValue={data.number} />
        <Parameter paramName="entry" paramValue={data.entry} />
        <Parameter
          paramName="air conditioner"
          paramValue={props.air_conditioner}
        />
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
