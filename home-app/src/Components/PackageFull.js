import React, { useEffect, useState } from "react";
import Button from "./Button";
import Address from "./Address";
import Parameter from "./Parameter";
import instance from "../api/AxiosInstance.jsx";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles/packageFull.css";
import PaypalCheckoutButton from "./PaypalCheckoutButton";
import Checkout from "./Checkout";
function PackageFull(props) {
  const location = useLocation();
  const [dataForUrl, setDataForUrl] = useState({});
  const data = location.state;
  const getPackage = async () => {
    const result = await instance.request({
      data: {
        data_type: "getPackage",
        params: { adID: window.location.href.split("/")[3], user_id: 1 }, //window.location.href gets the urlline
      },
    });
    setDataForUrl(result.data);
    //console.log(dataForUrl);
  };
  return (
    <section className="adFull">
      <ul>
        <Parameter paramName="price" paramValue={data.pack.price} />
        <Parameter paramName="content" paramValue={data.pack.content} />
        <Parameter paramName="title" paramValue={data.pack.title} />
        <Parameter paramName="ad_value" paramValue={data.pack.ad_value} />
      </ul>
      
      <Checkout
        title={data.pack.title}
        price={data.pack.price}
        packId={data.pack.packageId}
        adValue={data.pack.ad_value}
      />
    </section>
  );
}
PackageFull.defaultProps = {};
export default PackageFull;
