import React, { useEffect, useState } from "react";
import Button from "./Button";
import Parameter from "./Parameter";
import instance from "../api/AxiosInstance.jsx";
import "../styles/Ad.css";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AdPart from "./AdPart";
import AdContentPart from "./AdContentPart";
import AdUserPart from "./AdUserPart.js";
import AdImages from "./AdImages";
function AdFull(props) {
  const [dataForUrl, setDataForUrl] = useState({});
  const location = useLocation();
  const data = location.state;
  const getAd = async () => {
    const result = await instance.request({
      data: {
        data_type: "getAdByID",
        params: { adID: window.location.href.split("/")[3], user_id: 1 }, //window.location.href gets the urlline
      },
    });
    setDataForUrl(result.data);
    //console.log(dataForUrl);
  };
  useEffect(() => {
    if (!data) {
      getAd();
    }
  }, []);
  return data ? (
    <section className={"ad"}>
      <ul>
        <AdUserPart user={data.adBlock.user} />
        <AdImages images={data.adBlock.adImages} />
        <AdPart ad={data.adBlock.ad} className="adPartFull" />
        <AdContentPart
          adContent={data.adBlock.adContent}
          className="adContentPartFull"
        />
      </ul>
      <p>
        <Button content="contact seller" onclick={props.onclick} />
      </p>
    </section>
  ) : (
    <section className={"ad"}>
      <ul>
        <AdUserPart user={dataForUrl.user} />
        <AdPart ad={dataForUrl.ad} />
        <AdContentPart adContent={dataForUrl.adContent} />
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
