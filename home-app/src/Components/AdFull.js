import React, { useEffect, useState } from "react";
import Button from "./Button";
import Parameter from "./Parameter";
import instance from "../api/AxiosInstance.jsx";
import "../styles/Ad.css";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AdPart from "./AdPart";
import AdsWithSearch from "./AdsWithSearch";
import AdContentPart from "./AdContentPart";
import AdUserPart from "./AdUserPart.js";
import AdImages from "./AdImages";
import AddCookie from "./pages/Ads/addCookie";
import RecipeReviewCard from "./RecipeReviewCard";
import RecipeReviewCardUrl from "./RecipeReviewCardUrl";
function AdFull(props) {
  const [dataForUrl, setDataForUrl] = useState({});
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const [renderCookie, setRenderCookie] = useState(true);
  let refreshTimes = 1;
  const getAd = async () => {
    const arr = window.location.href.split("/");
    const result = await instance.request({
      data: {
        data_type: "getAdByID",
        params: { adID: arr[arr.length - 1], user_id: 1 }, //window.location.href gets the urlline
      },
    });
    setDataForUrl(result.data);
    console.log(result.data);
    console.log(dataForUrl);
  };
  useEffect(() => {
    const arr = window.location.href.split("/");
    getAd();
    if (dataForUrl.ad !== false) {
      const result = instance.request({
        data: {
          data_type: "updateWatch",
          params: { adID: arr[arr.length - 1] }, //window.location.href gets the urlline
        },
      });
    }
  }, []);

  return dataForUrl.ad !== false ? (
    <section className={"ad"}>
      {/* <AddCookie adID={dataForUrl.ad.adID} /> */}
      {/* <RecipeReviewCardUrl
        adBlock={dataForUrl}
        maxSize="800"
        isFavorite={isFavorite}
        setFavorite={setIsFavorite}
      /> */}
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
  ) : (
    <section>
      {alert("המודעה המבוקשת לא נמצאה")}
      <AdsWithSearch/>
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
