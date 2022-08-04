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
import useAuth from "../Auth/useAuth";
import AddCookie from "./pages/Ads/addCookie";
import RecipeReviewCard from "./RecipeReviewCard";
import RecipeReviewCardUrl from "./RecipeReviewCardUrl";
function AdById(props) {
  const [data, setData] = useState({});
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const [renderCookie, setRenderCookie] = useState(true);
  let refreshTimes = 1;
  const { auth } = useAuth();
  const getAd = async () => {
    console.log(auth);
    const result = await instance.request({
      data: {
        data_type: "getAdByAdId",
        params: { adId: props.adID, user_id: props.user_id },
        guest: auth.accessToken != undefined ? "registered" : "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    setData(result.data);
    console.log(result.data);
    console.log(data);
  };
  useEffect(() => {
    getAd();
    if (data.ad !== false) {
      const result = instance.request({
        data: {
          data_type: "updateWatch",
          params: { adID: props.id }, //window.location.href gets the urlline
        },
      });
    }
  }, []);

  return data.ad !== false ? (
    <section className={"ad"}>
      <ul>
        <AdUserPart user={data.user} />
        <AdImages images={data.adImages} />
        <AdPart ad={data.ad} />
        <AdContentPart adContent={data.adContent} />
      </ul>
      <p>
        <Button content="contact seller" onclick={props.onclick} />
      </p>
    </section>
  ) : (
    <section>
      {alert("המודעה המבוקשת לא נמצאה")}
      <AdsWithSearch />
    </section>
  );
}
AdById.defaultProps = {
  sellerName: "seller",
  id: "0",
  price: "0",
  createTime: "00/00/00",
  adLink: "null",
  city: "haif",
  street: "ha",
  number: "45",
  rooms: "3",
};
export default AdById;
