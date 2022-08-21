import React, { useState, useEffect, useMemo } from "react";
import instance from "../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../Auth/useAuth";

import "../styles/Main.css";
import "../styles/Ads.css";
import AdsBlock from "./pages/AdsBlock";
import AdFullForProps from "./AdFullForProps";
const HistoryAds = (props) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noMoreAdsForSearch, setNoMoreAdsForSearch] = useState(false); //control on weather we will scroll for more result changes to true if no more result are available
  const [listShow, setListShow] = useState("showList");
  const [fullShow, setFullShow] = useState("notShowFull");
  const [adFull, setAdFull] = useState({});
  const { auth } = useAuth();

  const getAds = async () => {
    setLoading(false);
    setNoMoreAdsForSearch(false);
    const result = await instance.request({
      data: {
        data_type: "showHistory",
        guest: auth.accessToken != undefined ? "registered" : "guest",
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
    setAds([]);
    setNoMoreAdsForSearch(false);
    getAds();
  }, []);

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
      <h1>תצוגת היסטוריה</h1>
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
        <h2>אין היסטוריה</h2>
      ) : (
        ""
      )}
    </section>
  );
};
export default HistoryAds;
