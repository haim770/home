import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { FcSms } from "react-icons/fc";
import {
  Link,
  NavLink,
  Outlet,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import AdPart from "../AdPart.js";
import AdContentPart from "../AdContentPart.js";
import "../../styles/AdBlock.css";
import "../../styles/Report.css";
import AdUserPart from "../AdUserPart.js";
// view component for the chat
import useView from "./Chat/ChatUseContext";
import AdImages from "../AdImages.js";
import { v4 as uuidv4 } from "uuid";
import RecipeReviewCard from "../RecipeReviewCard.js";
import instance from "../../api/AxiosInstance.jsx";
import Parameter from "../Parameter.js";
import useAuth from "../../Auth/useAuth";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";

const AdsBlock = (props) => {
  /**
   * Add function of start new chat with user ad publisher
   */
  const [phone, setPhone] = useState(
    props.adBlock.user[0] ? props.adBlock.user[0].phone : 0
  );
  const location = useLocation();
  const [goToEditPage,setGoToEditPage]=useState(false);
  const [togglePhone, setTogglePhone] = useState("הצג טלפון");
  const [adBlock, setAdBlock] = useState(props.adBlock);
  const [isFavorite, setIsFavorite] = useState(props.adBlock.favorite);
  const [didWatch, setDidWatch] = useState(0);
  const [showReport, setReportShow] = useState("notShowReport");
  const { auth } = useAuth();
  const { startNewChat } = useView();
  const handleClickChatWith = () => {
    const chatWith = {
      adBlock: props.adBlock.ad[0],
      username: `${props.adBlock.user[0].first_name} ${props.adBlock.user[0].last_name}`,
      uuid: props.adBlock.user[0].uuid,
      adID: props.adBlock.ad[0].adID,
    };
    startNewChat(chatWith);
  };
  const updateWatch = async () => {
    const res = await instance.request({
      data: {
        data_type: "updateWatch",
        params: { adID: props.adBlock.ad[0].adID }, //window.location.href gets the urlline
      },
    });
    console.log(res.data);
  };
  const editAd=(e)=>{
    e.preventDefault();
    setGoToEditPage(true);
     
  }
  const changeViewToFull = async (e) => {
    e.preventDefault();
    if (
      e.target.tagName === "svg" ||
      e.target.tagName === "BUTTON" ||
      e.target.tagName === "path" ||
      e.target.tagName === "button" ||
      e.target.parentElement.className === "showReport" ||
      e.target.parentElement.parentElement.className === "showReport" ||
      e.target.parentElement.parentElement.parentElement.className ===
        "showReport"
    )
      //if the child is doing something in clicking we wont fire the view change
      return;
    await updateWatch();
    setDidWatch((didWatch) => didWatch + 1);
    props.setListShow("notShowList");
    props.setFullShow("showFull");
    props.setAdFull(props.adBlock);
  };
  const reportOnAd = (e) => {
    //report on ad
    e.preventDefault();
    props.setReportShow("showReport");
    props.setAdForTheReport(props.adBlock);
  };
  return (
    <section className="cardBlock" onClick={changeViewToFull}>
      <div>
        <header className="headerOnTheTop">
          {/* This div will contain data like how many days the add on the site */}
          <div>
            <h3 className="iconsAtTop">
              <Parameter
                paramName={<FaEye />}
                paramValue={props.adBlock.ad[0].watch}
              />
              <Parameter
                paramName={<FcSms />}
                paramValue={props.adBlock.ad[0].contact_counter}
              />
            </h3>
          </div>
        </header>

        {/* This will hold the main assets image */}
        <RecipeReviewCard
          adBlock={props.adBlock}
          maxWidth="350"
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          didWatchd={didWatch}
          auth={auth}
        />
      </div>
      {/** This will contain the Ad footer wrapper  */}
      <div className="jss185 jss181">
        {/** This will contain the Ad footer inner wrapper  */}
        <div className="jss1060">
          {/** This will contain the Ad footer Right button  */}
          <div
            className="jss1062"
            style={{
              display:
                props.adBlock.user[0].mail === auth?.user ? "none" : "block",
            }}
          >
            {console.log(props.adBlock.user[0].mail)}
            <div className="jss142">
              <button
                className="MuiButtonBase-root MuiButton-root jss151 MuiButton-contained MuiButton-containedPrimary MuiButton-disableElevation MuiButton-fullWidth"
                onClick={handleClickChatWith}
              >
                <span className="buttonSpanLabel">התחל צ'ט</span>
              </button>
            </div>
          </div>
          {/** This will contain the Ad footer Left button  */}
          <div className="jss1061">
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(e.target.tagName);
                setTogglePhone(
                  togglePhone === "הצג טלפון" ? "הסתר טלפון" : "הצג טלפון"
                );
              }}
            >
              {togglePhone === "הצג טלפון"
                ? "" + togglePhone + " " + phone
                : togglePhone}
            </button>
            <button onClick={reportOnAd}>דווח על מודעה</button>
            <button
              style={{
                display:
                  props.adBlock.user[0].mail === auth?.user ? "none" : "block",
              }}
              onClick={editAd}
            >
              ערוך מודעה
            </button>
          </div>
          {goToEditPage ? (
            <Navigate
              to="/Settings/EditAd"
              state={{
                from: location,
                act: "registerSucceeds",
                adBlock: props.adBlock,
              }}
              replace
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};
AdsBlock.defaultProps = {
  isFavorite: false,
  didWatch: 0,
};
export default AdsBlock;
