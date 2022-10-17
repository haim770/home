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
import useAuth from "../Auth/useAuth";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
function PackageFull(props) {
  //display pack full screen
  const location = useLocation();
  const { auth } = useAuth();
  const [dataForUrl, setDataForUrl] = useState(false);
  const data = location.state;
  const getPackage = async () => {
    const arr = window.location.href.split("/");
    console.log("s");
    const result = await instance.request({
      data: {
        data_type: "getPackageById",
        params: { packId: arr[arr.length - 1] }, //window.location.href gets the urlline
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    setDataForUrl(result.data);
    console.log(result.data);
  };
  useEffect(() => {
    if (!data && auth) getPackage();
  }, [auth]);
  return data ? (
    <PayPalScriptProvider
      options={{
        "client-id":
          "ASXZvWdmYTGVe7D0eKiAddQjocGsHoxmtxsymlrHAvQr2_Z0uLMX9ZOOfHjMAhUrjGBrFe5o_dOCSu-Y",
      }}
    >
      <section className="adFull">
        <ul>
          <Parameter paramName="מחיר" paramValue={data.pack.price} />
          <Parameter paramName="תוכן" paramValue={data.pack.content} />
          <Parameter paramName="כותרת" paramValue={data.pack.title} />
          <Parameter paramName="כמות מודעות" paramValue={data.pack.ad_value} />
        </ul>
        {auth?.accessToken ? (
          <Checkout
            title={data.pack.title}
            price={data.pack.price}
            packId={data.pack.packageId}
            adValue={data.pack.ad_value}
          />
        ) : (
          ""
        )}
      </section>
    </PayPalScriptProvider>
  ) : dataForUrl ? (
    <PayPalScriptProvider
      options={{
        "client-id":
          "ASXZvWdmYTGVe7D0eKiAddQjocGsHoxmtxsymlrHAvQr2_Z0uLMX9ZOOfHjMAhUrjGBrFe5o_dOCSu-Y",
      }}
    >
      <section className="packFull">
        <ul>
          {console.log(dataForUrl)}
          <Parameter paramName="מחיר" paramValue={dataForUrl[0].price} />
          <Parameter paramName="תוכן" paramValue={dataForUrl[0].content} />
          <Parameter paramName="כותרת" paramValue={dataForUrl[0].title} />
          <Parameter
            paramName="כמות מודעות"
            paramValue={dataForUrl[0].ad_value}
          />
        </ul>
        {auth?.accessToken ? (
          <Checkout
            title={dataForUrl[0].title}
            price={dataForUrl[0].price}
            packId={dataForUrl[0].packageId}
            adValue={dataForUrl[0].ad_value}
          />
        ) : (
          ""
        )}
      </section>
    </PayPalScriptProvider>
  ) : (
    ""
  );
}
PackageFull.defaultProps = {};
export default PackageFull;
