import React, { useEffect, useState } from "react";
import Button from "./Button";
import {
  Link,
  NavLink,
  Outlet,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import instance from "../api/AxiosInstance.jsx";
import "../styles/Ad.css";
import RecipeReviewCard from "./RecipeReviewCard";
import useView from "./pages/Chat/ChatUseContext";
import useAuth from "../Auth/useAuth";
function AdFullForProps(props) {
  const [isFavorite, setIsFavorite] = useState(props.adBlock.favorite);
  const [goToEditPage, setGoToEditPage] = useState(false);
  const location = useLocation();
  const [togglePhone, setTogglePhone] = useState("הסתר טלפון");
  const [phone, setPhone] = useState(
    props.adBlock.user[0] ? props.adBlock.user[0].phone : 0
  );
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
    changeToListView(e);
  };
  const editAd = (e) => {
    e.preventDefault();
    setGoToEditPage(true);
  };
  useEffect(() => {
    const result = instance.request({
      data: {
        data_type: "updateWatch",
        params: { adID: props.adBlock.ad.adID }, //window.location.href gets the urlline
      },
    });
  }, []);
  const changeToListView = (e) => {
    e.preventDefault();
    props.setListShow("showList");
    props.setFullShow("notShowFull");
    props.setAdFull({});
  };
  const reportOnAd = (e) => {
    //report on ad
    e.preventDefault();
    props.setReportShow("showReport");
    props.setAdForTheReport(props.adBlock);
  };
  return (
    <article className={"ad"}>
      <button className="closeWindow" onClick={changeToListView}>
        x
      </button>
      <RecipeReviewCard
        adBlock={props.adBlock}
        maxSize="800"
        isFavorite={isFavorite}
        setFavorite={setIsFavorite}
      />
      <section>
        <div className="jss185 jss181">
          {/** This will contain the Ad footer inner wrapper  */}
          <div
            style={{
              display:
                props.adBlock.user[0].mail === auth?.user ? "none" : "block",
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
                className="btnClassAdBlock"
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
                {togglePhone === "הצג טלפון"
                  ? "" + togglePhone + " " + phone
                  : togglePhone}
              </button>
            </div>
            <div>
              <button className="btnClassAdBlock" onClick={reportOnAd}>
                דווח על מודעה
              </button>
            </div>
            <div>
              <button
                className="btnClassAdBlockEdit"
                style={{
                  display:
                    props.adBlock.user[0].mail === auth?.user ||
                    auth?.rule === "5150"
                      ? "block"
                      : "none",
                }}
                onClick={deleteAd}
              >
                מחק מודעה
              </button>
              <button
                className="btnClassAdBlock"
                style={{
                  display:
                    props.adBlock.user[0].mail === auth?.user
                      ? "block"
                      : "none",
                }}
                onClick={editAd}
              >
                ערוך מודעה
              </button>
            </div>
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
  );
}
AdFullForProps.defaultProps = {
  didWatch: 0,
  sellerName: "seller",
  price: "0",
  createTime: "00/00/00",
  adLink: "null",
  city: "haif",
  street: "ha",
  number: "45",
  rooms: "3",
};
export default AdFullForProps;
