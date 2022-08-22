import React, { useEffect, useState } from "react";
import Button from "./Button";
import Parameter from "./Parameter";
import instance from "../api/AxiosInstance.jsx";
import { Link, NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import "../styles/Ad.css";
import { useParams } from "react-router-dom";
import Report from "./Report.js";
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
import { FaEye } from "react-icons/fa";
import { FcSms } from "react-icons/fc";
function AdById(props) {
  const [togglePhone, setTogglePhone] = useState("הצג טלפון");
  const [showReport, setReportShow] = useState("notShowReport");
  const [adForTheReport, setAdForTheReport] = useState({});
  const [data, setData] = useState({});
  const location = useLocation();
  const { auth } = useAuth();
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const [goToEditPage, setGoToEditPage] = useState(false);
  const [renderCookie, setRenderCookie] = useState(true);
  let refreshTimes = 1;
  const handleClickChatWith = async () => {
    const chatWith = {
      adBlock: data.ad[0],
      username: `${data.user[0].first_name} ${data.user[0].last_name}`,
      uuid: data.user[0].uuid,
      adID: data.ad[0].adID,
      key: data.ad[0].adID + data.user[0].uuid,
    };
    const res = await instance.request({
      data: {
        data_type: "updateContacted",
        params: { adID: props.adID }, //window.location.href gets the urlline
      },
    });
    //console.log(res.data);
    props.startNewChat(chatWith);
  };
  const editAd = (e) => {
    e.preventDefault();
    setGoToEditPage(true);
  };
  const reportOnAd = (e) => {
    //report on ad
    e.preventDefault();
    setReportShow("showReport");
    setAdForTheReport(props.adBlock);
  };
  const getAd = async () => {
    const result = await instance.request({
      data: {
        data_type: "getAdByAdId",
        params: { adId: props.adID, user_id: props.user_id },
        guest: props.auth.accessToken != undefined ? "registered" : "guest",
      },
      headers: {
        Authorization: `Bearer ${props.auth.accessToken}`,
      },
    });
    if (result?.data) {
      setData(result.data);
    }
    //console.log(result.data);
    //console.log(data);
  };
  useEffect(() => {
    getAd();
    if (data.ad !== false) {
      const result = instance.request({
        data: {
          data_type: "updateWatch",
          params: { adID: props.adID }, //window.location.href gets the urlline
        },
      });
    }
  }, []);

  return data.ad !== false ? (
    <article>
      <Report
        className={showReport}
        setClassName={setReportShow}
        adBlock={adForTheReport}
        setAdForTheReport={setAdForTheReport}
        elementType="ad"
      />
      <section className={"ad"}>
        <header className="headerOnTheTop">
          {/* This div will contain data like how many days the add on the site */}
          <div>
            <h3 className="iconsAtTop">
              <Parameter
                paramName={<FaEye />}
                paramValue={data?.ad ? data.ad[0].watch : ""}
              />
              <Parameter
                paramName={<FcSms />}
                paramValue={data?.ad ? data.ad[0].contact_counter : ""}
              />
            </h3>
          </div>
        </header>
        <ul>
          <AdUserPart user={data.user} />
          <AdImages images={data.adImages} />
          <AdPart ad={data.ad} />
          <AdContentPart adContent={data.adContent} />
        </ul>
        <div className="jss185 jss181">
          {/** This will contain the Ad footer inner wrapper  */}
          <div
            style={{
              display: data?.user?.mail === auth?.user ? "none" : "flex",
            }}
          >
            <div className="jss142">
              <button
                className="MuiButtonBase-root MuiButton-root jss151 MuiButton-contained MuiButton-containedPrimary MuiButton-disableElevation MuiButton-fullWidth"
                onClick={handleClickChatWith}
              >
                <span className="buttonSpanLabel">התחל צ'ט</span>
              </button>
              <button
                style={{
                  display:data?.user?.phone?"block":"none",
                  backgroundColor: "green",
                  marginRight: "1rem",
                  padding: "1rem",
                }}
                onClick={(e) =>
                  window.open(
                    "https://web.whatsapp.com/send?phone=972" +
                      data?.user?.phone.substring(1) +
                      "&text=" +
                      "http://localhost:3000" +
                      "/AdsWithSearch/" +
                      data?.ad?.ad_link +
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
                className="btnClassAdBlock"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(e.target.tagName);
                  setTogglePhone(
                    togglePhone === "הצג טלפון" ? "הסתר טלפון" : "הצג טלפון"
                  );
                }}
              >
                {togglePhone === "הצג טלפון"
                  ? "" + togglePhone + " " + data?.user?.phone
                  : togglePhone}
              </button>
            </div>
            <div>
              <button className="btnClassAdBlock" onClick={reportOnAd}>
                דווח
              </button>
            </div>
          </div>
          <div>
            <button
              className="btnClassAdBlockEdit"
              style={{
                display: data?.user?.mail === auth?.user ? "block" : "none",
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
      </section>
    </article>
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
