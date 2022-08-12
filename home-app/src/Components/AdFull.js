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
import AdById from "./AdById";
import useView from "./pages/Chat/ChatUseContext";
import useAuth from "../Auth/useAuth";
function AdFull(props) {
  const { auth } = useAuth();
  const { startNewChat } = useView();
  

  return (
    <AdById
      adID={window.location.href.split("/")[window.location.href.split("/").length - 1]}
        auth={auth}
        startNewChat={startNewChat}
    />
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
