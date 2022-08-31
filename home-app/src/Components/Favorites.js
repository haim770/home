import React, { useState, useEffect, useMemo } from "react";
import instance from "../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";

import "../styles/Main.css";
import "../styles/Ads.css";
import AdsBlock from "./pages/AdsBlock";
const Ads = (props) => {
  //display favorites for user connected
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noMoreAdsForSearch, setNoMoreAdsForSearch] = useState(false); //control on weather we will scroll for more result changes to true if no more result are available
  const [changed, setChanged] = useState(false);

  const getAds = async () => {
    //get all favorites of the user
    setLoading(false);
    setNoMoreAdsForSearch(false);
    const result = await instance.request({
      data: {
        data_type: "getFavoritesForUserId",
      },
    });
    console.log(result.data);
    if (result.data === false || result.data === "") {
      setNoMoreAdsForSearch(true);
      return;
    } else {
      setAds(
        result.data.map((ad) => (
          <AdsBlock key={ad.adID + uuidv4()} adBlock={ad} isFavorite={true} />
        ))
      );
    }
    setLoading(true);
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  // });

  useEffect(() => {
    getAds();
  }, []);

  return (
    <section className="containerForAllAds">
      <h1>כל המועדפים</h1>
      <div className="listAds">{loading && ads}</div>
      {noMoreAdsForSearch ? <h2>אין מועדפים</h2> : ""}
    </section>
  );
};
export default Ads;
