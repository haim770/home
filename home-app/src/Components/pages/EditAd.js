import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { FcSms } from "react-icons/fc";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import AdPartEdit from "../AdPartEdit.js";
import AdContentPartEdit from "../AdContentPartEdit.js";
import "../../styles/AdBlock.css";
import "../../styles/Report.css";
import FormEdit from "../pages/Ads/CreateNewAd/FormEdit.jsx";
// view component for the chat
import useView from "./Chat/ChatUseContext";
import AdImagesEdit from "../AdImagesEdit.js";
import { v4 as uuidv4 } from "uuid";
import RecipeReviewCard from "../RecipeReviewCard.js";
import instance from "../../api/AxiosInstance.jsx";
import Parameter from "../Parameter.js";
import useAuth from "../../Auth/useAuth";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";

const EditAd = (props) => {
  /**
   * Add function of start new chat with user ad publisher
   */
  const location = useLocation();

  const [adBlock, setAdBlock] = useState(location?.state?.adBlock);
  const [isFavorite, setIsFavorite] = useState(adBlock.favorite);
  const [phone, setPhone] = useState(
    adBlock.user[0] ? adBlock.user[0].phone : 0
  );
  const [togglePhone, setTogglePhone] = useState("הצג טלפון");
  const [didWatch, setDidWatch] = useState(0);
  const [showReport, setReportShow] = useState("notShowReport");
  const { auth } = useAuth();
  return (
   
        <FormEdit adBlock={adBlock}/>
  );
};
EditAd.defaultProps = {
  isFavorite: false,
  didWatch: 0,
};
export default EditAd;
