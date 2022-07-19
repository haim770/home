import React, { useState, useEffect, useMemo } from "react";
import instance from "../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../Auth/useAuth";

import "../styles/Main.css";
import "../styles/Ads.css";
import AdsBlock from "./pages/AdsBlock";
import AdFullForProps from "./AdFullForProps";
const FavoritesAds = (props) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noMoreAdsForSearch, setNoMoreAdsForSearch] = useState(false); //control on weather we will scroll for more result changes to true if no more result are available
  const [changed, setChanged] = useState(false);
  const [listShow, setListShow] = useState("showList");
  const [indexStart, setindexStart] = useState(0);
  const [endAds, setEndAds] = useState(10);
  const [fullShow, setFullShow] = useState("notShowFull");
  const [adFull, setAdFull] = useState({});
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
        data_type: "showFavoritesAds",
        limitBy: { end: endAds, start: indexStart }, //the indexes
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    if (result.data === false || result.data === "") {
      setNoMoreAdsForSearch(true);
    } else {
      //console.log("append");
      if (!noMoreAdsForSearch) {
        setAds((prevAds) => {
          return new Set([
            ...prevAds,
            result.data.map((ad) => (
              <AdsBlock
                key={ad.adID + uuidv4()}
                adBlock={ad}
                setAdFull={setAdFull}
                className={listShow}
                setFullShow={setFullShow}
                setListShow={setListShow}
              />
            )),
          ]);
        });
      }
    }
    setLoading(true);
  };
  const getAds = async () => {
    setLoading(false);
    setNoMoreAdsForSearch(false);
    const result = await instance.request({
      data: {
        data_type: "showFavoritesAds",
        limitBy: { start: 0, end: endAds }, //the indexes
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
      setAds((prevAds) => {
        return new Set([
          ...prevAds,
          result.data.map((ad) => (
            <AdsBlock
              key={ad.adID + uuidv4()}
              className={listShow}
              adBlock={ad}
              setAdFull={setAdFull}
              setFullShow={setFullShow}
              setListShow={setListShow}
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
    setAds([]);
    setNoMoreAdsForSearch(false);
    getAds();
  }, [props.search]);

  useEffect(() => {
    if (!noMoreAdsForSearch && props.indexStart !== 0) {
      getAdScroll();
    }
  }, [props.indexStart]);
  const getOutOfFullMode = (e) => {
    //when clicking outside the full ad it will close
    e.stopPropagation();
    e.preventDefault();

    if (fullShow === "showFull" && e.target.id === "containerForAd") {
      console.log(e.target.id === "cont");
      setFullShow("notShowFull");
      setListShow("showList");
    }
  };
  return (
    <section
      className="containerForAllAds"
      id="containerForAd"
      onClick={getOutOfFullMode}
    >
      <h1>תצוגת מודעות</h1>
      {loading && listShow === "showList" ? (
        <div className="listAds">
          {loading && listShow === "showList" && ads}
        </div>
      ) : (
        ""
      )}
      {fullShow === "showFull" && adFull != {} ? (
        <AdFullForProps
          className={fullShow}
          adBlock={adFull}
          setAdFull={setAdFull}
          setFullShow={setFullShow}
          setListShow={setListShow}
        />
      ) : (
        ""
      )}
      {noMoreAdsForSearch && listShow === "showList" ? (
        <h2>אין מודעות נוספות</h2>
      ) : (
        ""
      )}
    </section>
  );
};
export default FavoritesAds;
