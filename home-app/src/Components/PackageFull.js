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
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
function PackageFull(props) {
  const location = useLocation();
  const [dataForUrl, setDataForUrl] = useState({});
  const data = location.state;
  const getPackage = async () => {
    const arr = window.location.href.split("/");
    const result = await instance.request({
      data: {
        data_type: "getPackage",
        params: { packId: arr[arr.length - 1] }, //window.location.href gets the urlline
      },
    });
    setDataForUrl(result.data);
  };
  return data ? (
    <PayPalScriptProvider
      options={{
        "client-id":
          "ASXZvWdmYTGVe7D0eKiAddQjocGsHoxmtxsymlrHAvQr2_Z0uLMX9ZOOfHjMAhUrjGBrFe5o_dOCSu-Y",
      }}
    >
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
    </PayPalScriptProvider>
  ) : (
    <PayPalScriptProvider
      options={{
        "client-id":
          "ASXZvWdmYTGVe7D0eKiAddQjocGsHoxmtxsymlrHAvQr2_Z0uLMX9ZOOfHjMAhUrjGBrFe5o_dOCSu-Y",
      }}
    >
      <section className="packFull">
        <ul>
          <Parameter paramName="price" paramValue={dataForUrl.pack.price} />
          <Parameter paramName="content" paramValue={dataForUrl.pack.content} />
          <Parameter paramName="title" paramValue={dataForUrl.pack.title} />
          <Parameter
            paramName="ad_value"
            paramValue={dataForUrl.pack.ad_value}
          />
        </ul>
        <Checkout
          title={dataForUrl.pack.title}
          price={dataForUrl.pack.price}
          packId={dataForUrl.pack.packageId}
          adValue={dataForUrl.pack.ad_value}
        />
      </section>
    </PayPalScriptProvider>
  );
}
PackageFull.defaultProps = {};
export default PackageFull;
