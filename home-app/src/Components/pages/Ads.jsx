import React, { useState, useEffect, useMemo } from "react";
import instance from "../../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";

import "../../styles/Main.css";
import "../../styles/Ads.css";
import AdsBlock from "./AdsBlock";
const Ads = (props) => {
  /*
  const [adsTop, setAdsTop] = useState(10);
  const [adsMin, setAdsMin] = useState(0);
  */
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastSearch, setLastSearch] = useState("");

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
      //console.log("Button");
    }
  };
  const getAds = async () => {
    const result = await instance.request({
      data: {
        data_type: props.search.data_type,
        params: props.search.params,
      },
    });
    //console.log(result.data);
    if (result.data === false) {
      //console.log("empty");
      setAds("no ads feet");
    } else {
      if (JSON.stringify(props.search) !== JSON.stringify(lastSearch)) {
        //console.log("changed query");
        setAds(
          result.data.map((ad) => <AdsBlock key={ad.adID+uuidv4()} adBlock={ad} />)
        );
      } else {
        //console.log("append");
        setAds(
          ...ads,
          result.data.map((ad) => <AdsBlock key={ad.adID} adBlock={ad} />)
        );
      }
    }
    setLastSearch(props.search);
    setLoading(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    getAds();
  }, [props.search]);
 
  return <div className="listAds">{loading && ads}</div>;
};
export default Ads;
