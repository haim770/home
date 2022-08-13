import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import AdPart from "./AdPart.js";
import AdContentPart from "./AdContentPart.js";
import "../styles/confirmAdBlock.css";
import "../styles/AdBlock.css";
import AdUserPart from "./AdUserPart.js";
// view component for the chat
import useView from "./pages/Chat/ChatUseContext";
import AdImages from "./AdImages.js";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/AxiosInstance";
import useAuth from "../Auth/useAuth";
import { useState } from "react";

const ConfirmAdBlock = (props) => {
  /**
   * Add function of start new chat with user ad publisher
   */
  const { auth } = useAuth();
  const [className, setClassName] = useState("cardBlock");
  const confirmAd = async (e) => {
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "aproveAd",
        params: {
          adID: props.adBlock.ad[0].adID,
          userId: props.adBlock.ad[0].user_id,
          guest: auth.accessToken != undefined ? "registered" : "guest",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });

    await props.getAds();
    props.setindexStart(0);
    setClassName(className + "invisible");
  };
  const declineAd = async (e) => {
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "declineAd",
        params: {
          adID: props.adBlock.ad[0].adID,
          userId: props.adBlock.ad[0].user_id,
          guest: auth.accessToken != undefined ? "registered" : "guest",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });

    await props.getAds();
    props.setindexStart(0);
    setClassName(className + "invisible");
  };
  return (
    <section className={className}>
      <div>
        <header className="headerOnTheTop">
          {/* This div will contain data like how many days the add on the site */}
          <div>
            <h3>Some data</h3>
          </div>
          {/* This div will contain add to favorite */}
        </header>

        {/* This will hold the main assets image */}
        <AdImages
          key={uuidv4()}
          images={props.adBlock.adImages}
          numPicToDisplay="1"
        />
        {/** This will contain the Ad details */}
        <div className="adCardTitle">
          <h4>
            <AdUserPart key={uuidv4()} user={props.adBlock.user} />
            <AdPart
              key={uuidv4()}
              ad={props.adBlock.ad}
              className="adPartList"
            />
          </h4>
        </div>
      </div>
      <AdContentPart
        key={uuidv4()}
        adContent={props.adBlock.adContent}
        className="adContentPartList"
      />
      <button onClick={(e) => confirmAd(e)}>אשר מודעה</button>
      <button onClick={(e) => declineAd(e)}>פסול מודעה</button>
    </section>
  );
};

export default ConfirmAdBlock;
