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
import AddCookie from "./pages/Ads/addCookie";
function AdFull(props) {
  const [dataForUrl, setDataForUrl] = useState({});
  const [renderCookie, setRenderCookie] = useState(true);
  let refreshTimes = 1;
  const location = useLocation();
  const data = location.state;
  const getAd = async () => {
    const arr = window.location.href.split("/");
    const result = await instance.request({
      data: {
        data_type: "getAdByID",
        params: { adID: arr[arr.length-1], user_id: 1 }, //window.location.href gets the urlline
      },
    });
    setDataForUrl(result.data);
    console.log(result.data);
      console.log(dataForUrl);
    
  };
  useEffect(() => {
    const arr = window.location.href.split("/");
    if (!data || data === {} || data == false) {
      getAd();
      const result = instance.request({
        data: {
          data_type: "updateWatch",
          params: { adID: arr[arr.length-1] }, //window.location.href gets the urlline
        },
      });
    } else {
      const result = instance.request({
        data: {
          data_type: "updateWatch",
          params: { adID: data.adBlock.ad[0].adID }, //window.location.href gets the urlline
        },
      });
    }
  }, []);

  return data ? (
     
    <section className={"ad"}>
      <ul>
        <AddCookie adID={data.adBlock.ad} />
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
        <AdImages images={dataForUrl.adImages} />
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
