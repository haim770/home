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
import instance from "../api/AxiosInstance.jsx";
import "../styles/Ad.css";
import RecipeReviewCard from "./RecipeReviewCard";
import useView from "./pages/Chat/ChatUseContext";
import useAuth from "../Auth/useAuth";
function AdFullForPropsWithReport(props) {
  const [isFavorite, setIsFavorite] = useState(props.adBlock.favorite);
  const [goToEditPage, setGoToEditPage] = useState(false);
  const location = useLocation();
  const [togglePhone, setTogglePhone] = useState("הצג טלפון");
  const [phone, setPhone] = useState(
    props.adBlock.user[0] ? props.adBlock.user[0].phone : 0
  );
  const { auth } = useAuth();
  const editAd = (e) => {
    e.preventDefault();
    setGoToEditPage(true);
  };
  const changeSeenStatus = async () => {
    console.log(props.msg.seen);
    const result = await instance.request({
      data: {
        data_type: "changeMessageToSeen",
        params: {
          msgId: props.msg.id,
          seen: props.msg.seen === "לא" ? "1" : "0",
          guest: "registered",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result);
  };
  useEffect(() => {
    changeSeenStatus();
  }, []);
  const changeToListView = (e) => {
  e.preventDefault();
  props.setTableClassName("showTable");
  props.setClassName("notShowSelected");
  props.setSelectedReport({});
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
      <section>
        <h1>סיבת הדיווח: {props.report[0].report_reason}</h1>
        <h2>הודעת מנהל: {props.report[0].manage_feedback}</h2>
        <div>
          <button
            className="button-4"
            style={{
              display:
                props.adBlock.user[0].mail === auth?.user ? "block" : "none",
            }}
            onClick={editAd}
          >
            ערוך מודעה
          </button>
        </div>
      </section>
      <RecipeReviewCard
        adBlock={props.adBlock}
        maxSize="800"
        isFavorite={isFavorite}
        setFavorite={setIsFavorite}
      />
      <section>
        <div className="jss185 jss181">
          <div className="buttonPart">
            <div>
              <button
                className="button-4"
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
              <button
                className="button-4"
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
        <Button content="contact seller" onclick={props.onclick} />
      </section>
    </article>
  );
}
AdFullForPropsWithReport.defaultProps = {
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
export default AdFullForPropsWithReport;
