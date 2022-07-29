import React, { useState, useEffect, useMemo } from "react";
import instance from "../../../../../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";
import Report from "../../../../Report.js";
import "../../../../../styles/Main.css";
import "../../../../../styles/Ads.css";
import AdsBlock from "../../../AdsBlock";
import AdFullForProps from "../../../../AdFullForProps";
import useAuth from "../../../../../Auth/useAuth";
const UserAds = (props) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastSearch, setLastSearch] = useState("getAllOfMyAds");
  const [noMoreAdsForSearch, setNoMoreAdsForSearch] = useState(false); //control on weather we will scroll for more result changes to true if no more result are available
  const [changed, setChanged] = useState(false);
  const [listShow, setListShow] = useState("showList");
  const [fullShow, setFullShow] = useState("notShowFull");
  const [showReport, setReportShow] = useState("notShowReport");
  const [adForTheReport, setAdForTheReport] = useState({});
  const [indexStart, setIndexStart] = useState("0");
  const [indexEnd, setIndexEnd] = useState("10");
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
      setIndexStart(indexStart + 10);
    }
  };
  const getAdScroll = async () => {
    setLoading(false);
    const result = await instance.request({
      data: {
        data_type: lastSearch,
        params: {},
        guest: auth.accessToken != undefined ? "registered" : "guest",
        limitBy: { start: indexStart, end: indexEnd }, //the indexes
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
                showReport={showReport}
                setReportShow={setReportShow}
                adForTheReport={adForTheReport}
                setAdForTheReport={setAdForTheReport}
                auth={auth}
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
        data_type: lastSearch,
        params: {},
        guest: auth.accessToken != undefined ? "registered" : "guest",
        limitBy: { start: 0, end: indexEnd }, //the indexes
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result.data === false || result.data === "" || result.data == []) {
      setNoMoreAdsForSearch(true);
      return;
    } else {
      setAds(
        result.data.map((ad) => (
          <AdsBlock
            key={ad.adID + uuidv4()}
            className={listShow}
            adBlock={ad}
            setAdFull={setAdFull}
            setFullShow={setFullShow}
            setListShow={setListShow}
            showReport={showReport}
            setReportShow={setReportShow}
            adForTheReport={adForTheReport}
            setAdForTheReport={setAdForTheReport}
            auth={auth}
          />
        ))
      );
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
  }, [lastSearch]);

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
      <Report
        className={showReport}
        setClassName={setReportShow}
        adBlock={adForTheReport}
        setAdForTheReport={setAdForTheReport}
        elementType="ad"
      />
      <h1>תצוגת מודעות</h1>
      <div>
        <label>
          <span>סנן מודעות </span>
          <select
            value={lastSearch}
            onChange={(e) => {
              setLastSearch(
                e.target.value === "כל המודעות שלי"
                  ? "getAllOfMyAds"
                  : e.target.value === "המודעות הפעילות שלי"
                  ? "getAllOfMyActiveAds"
                  : e.target.value === "המודעות הלא פעילות שלי"
                  ? "getAllOfMyNotActiveAds"
                  : ""
              );
            }}
          >
            <option></option>
            <option>כל המודעות שלי</option>
            <option>המודעות הפעילות שלי</option>
            <option>המודעות הלא פעילות שלי</option>
          </select>
        </label>
      </div>
      {loading && listShow === "showList" ? (
        <div className="listAds">
          {loading && listShow === "showList" && ads}
        </div>
      ) : (
        ""
      )}
      {props.fullShow === "showFull" && adFull != {} ? (
        <AdFullForProps
          className={fullShow}
          adBlock={adFull}
          setAdFull={setAdFull}
          setFullShow={setFullShow}
          setListShow={setListShow}
          // showReport={showReport}
          // setReportShow={setReportShow}
          // adForTheReport={adForTheReport}
          // setAdForTheReport={setAdForTheReport}
          auth={auth}
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
export default UserAds;
