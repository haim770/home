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
import { FaWhatsapp } from "react-icons/fa";
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
  //ad block display
  const [phone, setPhone] = useState(
    props.adBlock.user[0] ? props.adBlock.user[0].phone : 0
  );
  console.log(props.adBlock);
  const location = useLocation();
  const [goToEditPage, setGoToEditPage] = useState(false);
  const [togglePhone, setTogglePhone] = useState("הסתר טלפון");
  const [adBlock, setAdBlock] = useState(props.adBlock);
  const [isFavorite, setIsFavorite] = useState(props.adBlock.favorite);
  const [didWatch, setDidWatch] = useState(0);
  const [showReport, setReportShow] = useState("notShowReport");
  const { auth } = useAuth();
  const { startNewChat } = useView();
  const handleClickChatWith = async () => {
    //handle the chat and when it happen ads 1 to contacted
    const chatWith = {
      adBlock: props.adBlock.ad[0],
      username: `${props.adBlock.user[0].first_name} ${props.adBlock.user[0].last_name}`,
      uuid: props.adBlock.user[0].uuid,
      adID: props.adBlock.ad[0].adID,
    };
    const res = await instance.request({
      data: {
        data_type: "updateContacted",
        params: { adID: props.adBlock.ad[0].adID }, //window.location.href gets the urlline
      },
    });
    console.log(res.data);
    startNewChat(chatWith);
  };
  const addItemToHistory = async (e) => {
    //add item to history
    const res = await instance.request({
      data: {
        data_type: "addItmeToHistory",
        params: { adID: props.adBlock.ad[0].adID },
        guest: auth.accessToken != undefined ? "registered" : "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(res.data);
  };
  const updateWatch = async () => {
    //update watch count
    const res = await instance.request({
      data: {
        data_type: "updateWatch",
        params: { adID: props.adBlock.ad[0].adID }, //window.location.href gets the urlline
      },
    });
    console.log(res.data);
  };
  const changeExpDateByTheTimeInTheSettings = async (e) => {
    //change exp date
    e.preventDefault();
    console.log(props.adBlock.ad[0].expire_date);
    const res = await instance.request({
      data: {
        data_type: "addMoreTimeToAd",
        params: {
          adID: props.adBlock.ad[0].adID,
          userId: props.adBlock.ad[0].user_id,
          expireDate: props.adBlock.ad[0].expire_date,
        },
        guest: auth.accessToken != undefined ? "registered" : "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log("res");
    if (res.data == "expire changed") {
      alert("ביצעת שינוי תאריך פג תוקף");
    } else {
      if (res.data == "need remaining ads") {
        alert("נגמרו לך המודעות גש לרכוש חבילה");
      } else {
        alert("משהו השתבש");
      }
    }

    console.log(res.data);
    await props.getAds();
  };
  const deleteAd = async (e) => {
    const res = await instance.request({
      data: {
        data_type: "deleteAdById",
        params: { adID: props.adBlock.ad[0].adID, deleteByUser: true },
        guest: auth.accessToken != undefined ? "registered" : "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(res.data);
    await props.getAds();
  };
  const editAd = (e) => {
    e.preventDefault();
    setGoToEditPage(true);
  };
  const changeViewToFull = async (e) => {
    e.preventDefault();
    if (
      e.target.tagName === "svg" ||
      e.target.tagName === "BUTTON" ||
      e.target.tagName === "path" ||
      e.target.tagName === "button" ||
      e.target.tagName === "A" ||
      e.target.parentElement.className === "showReport" ||
      e.target.parentElement.parentElement.className === "showReport" ||
      e.target.parentElement.parentElement.parentElement.className ===
        "showReport"
    )
      //if the child is doing something in clicking we wont fire the view change
      return;
    await updateWatch();
    await addItemToHistory();
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
              <span title="צפיות">
                <Parameter
                  paramName={<FaEye />}
                  paramValue={props.adBlock.ad[0].watch}
                />
              </span>
              <span title="יצרו קשר">
                <Parameter
                  paramName={<FcSms />}
                  paramValue={props.adBlock.ad[0].contact_counter}
                />
              </span>
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
        <div
          style={{
            display:
              props.adBlock.user[0].mail === auth?.user ? "none" : "flex",
          }}
        >
          <div className="jss142">
            <button
              style={{
                display: !auth?.user ? "none" : "flex",
              }}
              className="MuiButtonBase-root MuiButton-root jss151 MuiButton-contained MuiButton-containedPrimary MuiButton-disableElevation MuiButton-fullWidth"
              onClick={handleClickChatWith}
            >
              <span className="buttonSpanLabel">התחל צ'ט</span>
            </button>
            <button
              className="button-4"
              style={{
                display: !auth?.user ? "none" : "flex",
                backgroundColor: "green",
                marginRight: "1rem",
                padding: "1rem",
              }}
              onClick={(e) =>
                window.open(
                  "https://web.whatsapp.com/send?phone=972" +
                    phone.substring(1) +
                    "&text=" +
                    "http://localhost:3000" +
                    "/AdsWithSearch/" +
                    props.adBlock.ad[0].ad_link +
                    "&app_absent=0",
                  "_blank"
                )
              }
            >
              {" "}
              <FaWhatsapp color="black" />
            </button>
          </div>
        </div>
        <div className="buttonPart">
          <div>
            <button
              className="button-4"
              style={{
                display: !auth?.user ? "none" : "flex",
              }}
              onClick={(e) => {
                e.preventDefault();
                console.log(e.target.tagName);
                setTogglePhone(
                  togglePhone === "הצג טלפון" ? "הסתר טלפון" : "הצג טלפון"
                );
              }}
            >
              {togglePhone === "הסתר טלפון"
                ? "" + togglePhone + " " + phone
                : togglePhone}
            </button>
          </div>
          <div>
            <button className="button-4" onClick={reportOnAd}>
              דווח
            </button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <button
            className="button-4"
            style={{
              display:
                auth?.roles === "5150" ||
                props.adBlock.user[0].mail === auth?.user
                  ? "block"
                  : "none",
              marginTop: "1rem",
            }}
            onClick={editAd}
          >
            ערוך מודעה
          </button>
          <button
            className="button-4"
            style={{
              display:
                auth?.roles === "5150" ||
                props.adBlock.user[0].mail === auth?.user ||
                auth?.rule === "5150"
                  ? "block"
                  : "none",
              marginTop: "1rem",
              justifySelf: "self-end",
            }}
            onClick={deleteAd}
          >
            מחק מודעה
          </button>
          <button
            className="button-4"
            style={{
              display:
                auth?.roles === "5150" ||
                props.adBlock.user[0].mail === auth?.user ||
                auth?.rule === "5150"
                  ? "block"
                  : "none",
              marginTop: "1rem",
            }}
            onClick={changeExpDateByTheTimeInTheSettings}
          >
            הוספת ימים למודעה
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
    </section>
  );
};
AdsBlock.defaultProps = {
  isFavorite: false,
  didWatch: 0,
};
export default AdsBlock;
