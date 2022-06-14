import React, { useState, useEffect, useMemo } from "react";
import instance from "../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";

import "../styles/Main.css";
import "../styles/Ads.css";
import AdsBlock from "./pages/AdsBlock";
const Ads = (props) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noMoreAdsForSearch, setNoMoreAdsForSearch] = useState(false); //control on weather we will scroll for more result changes to true if no more result are available
  const [changed, setChanged] = useState(false);

  // check when we scroll down to button
  // const handleScroll = (e) => {
  //   // this is the inner height of the HTML page
  //   const innerHeight = window.innerHeight;
  //   // get the current Scroll hheight
  //   const scrollPosition = e.target.documentElement.scrollTop;
  //   // get full page scrolling height
  //   const scrollHeight = e.target.documentElement.scrollHeight;

  //   const currentHeight = Math.ceil(
  //     e.target.documentElement.scrollTop + window.innerHeight
  //   );
  //   if (currentHeight + 1 >= scrollHeight) {
  //     setindexStart(indexStart + 10);
  //   }
  // };
  const getAds = async () => {
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
          <AdsBlock key={ad.adID + uuidv4()} adBlock={ad} />
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
      <h1>all the wanted ads</h1>
      <div className="listAds">{loading && ads}</div>
      {noMoreAdsForSearch ? <h2>no more ads</h2> : ""}
    </section>
  );
};
export default Ads;
