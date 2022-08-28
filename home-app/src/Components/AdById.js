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
    props.startNewChat(chatWith);
  };
  const editAd = (e) => {
    e.preventDefault();
    setGoToEditPage(true);
  };
  const changeExpDateByTheTimeInTheSettings = async (e) => {
    //change exp date
    e.preventDefault();
    //console.log(props.adBlock.ad[0].expire_date);
    const res = await instance.request({
      data: {
        data_type: "addMoreTimeToAd",
        params: {
          adID: data.ad[0].adID,
          userId: data.ad[0].user_id,
          expireDate: data.ad[0].expire_date,
        },
        guest: auth.accessToken != undefined ? "registered" : "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    //console.log("res");
    if (res.data == "expire changed") {
      alert("ביצעת שינוי תאריך פג תוקף");
    }
    if (res.data == "need remaining ads") {
      alert("נגמרו לך המודעות גש לרכוש חבילה");
    } else {
      alert("משהו השתבש");
    }

    //console.log(res.data);
    await props.getAds();
  };
  const deleteAd = async (e) => {
    const res = await instance.request({
      data: {
        data_type: "deleteAdById",
        params: { adID: data.ad[0].adID, deleteByUser: true },
        guest: auth.accessToken != undefined ? "registered" : "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });

    alert("deleted");
    window.open("http://localhost:3000" + "/AdsWithSearch/", "_self");
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
        guest: auth.accessToken != undefined ? "registered" : "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    if (result?.data) {
      setData(result.data);
    }
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
              display:
                Array.isArray(data?.user) &&
                data?.user[0].mail === auth?.user &&
                auth?.accessToken != ""
                  ? "none"
                  : "flex",
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
                className="button-4"
                style={{
                  display:
                    Array.isArray(data?.user) &&
                    data?.user[0].phone != "" &&
                    auth?.accessToken != ""
                      ? "block"
                      : "none",
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
                className="button-4"
                style={{
                  display:
                    Array.isArray(data?.user) &&
                    data?.user?.phone &&
                    auth?.accessToken != ""
                      ? "block"
                      : "none",
                }}
                onClick={(e) => {
                  e.preventDefault();

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
              <button className="button-4" onClick={reportOnAd}>
                דווח
              </button>
            </div>
          </div>
          <div>
            <button
              className="button-4"
              style={{
                display:
                  auth?.roles === "5150" ||
                  (Array.isArray(data?.user) &&
                    data?.user[0].mail === auth?.user) ||
                  auth?.rule === "5150"
                    ? "block"
                    : "none",
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
                  (Array.isArray(data?.user) &&
                    data?.user[0].mail === auth?.user) ||
                  auth?.rule === "5150"
                    ? "block"
                    : "none",
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
                  (Array.isArray(data?.user) &&
                    data?.user[0].mail === auth?.user) ||
                  auth?.rule === "5150"
                    ? "block"
                    : "none",
                margin: "1rem",
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
