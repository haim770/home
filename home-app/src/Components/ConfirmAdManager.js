import React, { useState, useEffect, useMemo } from "react";
import instance from "../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../Auth/useAuth";

import "../styles/Main.css";
import "../styles/Ads.css";
import ConfirmAdBlock from "./ConfirmAdBlock";
const ConfirmAdManager = (props) => {
  //comp for list of ads waiting for confirmationn
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [indexStart, setindexStart] = useState(0); //index to start get ads from db
  const [indexEnd, setindexEnd] = useState(10); //index to end get ads from db
  const [noMoreAdsForSearch, setNoMoreAdsForSearch] = useState(false); //control on weather we will scroll for more result changes to true if no more result are available
  const { auth } = useAuth();
  // check when we scroll down to button
  const handleScroll = (e) => {
    // this is the inner height of the HTML page
    const innerHeight = window.innerHeight;
    // get the current Scroll hheight
    const scrollPosition = e.target.documentElement.scrollTop;
    // get full page scrolling height
    const scrollHeight = e.target.documentElement.scrollHeight;

    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      setindexStart(indexStart + 10);
    }
  };
  const getAdScroll = async () => {
    setLoading(false);
    const result = await instance.request({
      data: {
        data_type: "getAllWaitingAdsForAproval",
        params: {
          guest: auth.accessToken != undefined ? "registered" : "guest",
        },
        limitBy: {
          start: indexStart,
          end: indexEnd,
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result.data === false || result.data === "") {
      setNoMoreAdsForSearch(true);
    } else {
      //console.log("append");
      if (!noMoreAdsForSearch)
        setAds((prevAds) => {
          return new Set([
            ...prevAds,
            result.data.map((ad) => (
              <ConfirmAdBlock
                key={ad.adID + uuidv4()}
                adBlock={ad}
                getAds={getAds}
              />
            )),
          ]);
        });
    }
    setLoading(true);
  };
  const getAds = async () => {
    //get ads wait for approval
    setAds([]);
    setLoading(false);
    setNoMoreAdsForSearch(false);
    const result = await instance.request({
      data: {
        data_type: "getAllWaitingAdsForAproval",
        params: {
          guest: auth.accessToken != undefined ? "registered" : "guest",
        },
        limitBy: { start: 0, end: indexEnd }, //the indexes
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result.data === false || result.data === "") {
      setNoMoreAdsForSearch(true);
      return;
    } else {
      //console.log("append");
      setAds((prevAds) => {
        return new Set([
          result.data.map((ad) => (
            <ConfirmAdBlock
              key={ad.adID + uuidv4()}
              adBlock={ad}
              getAds={getAds}
              setindexStart={setindexStart}
            />
          )),
        ]);
      });
    }
    setLoading(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    getAds();
  }, []);

  useEffect(() => {
    if (!noMoreAdsForSearch && indexStart !== 0) {
      getAdScroll();
    }
  }, [indexStart]);

  return (
    <section className="containerForAllAds">
      <h1>all the wanted ads</h1>
      <div className="listAds">{loading && ads}</div>
      {noMoreAdsForSearch ? <h2>no more ads</h2> : ""}
    </section>
  );
};
export default ConfirmAdManager;
