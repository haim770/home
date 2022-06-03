import React, { useState, useEffect, useMemo } from "react";
import instance from "../../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";

import "../../styles/Main.css";
import "../../styles/Ads.css";
import AdsBlock from "./AdsBlock";
const Ads = (props) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastSearch, setLastSearch] = useState("");
  const [indexStart, setindexStart] = useState(0); //index to start get ads from db
  const [indexEnd, setindexEnd] = useState(3); //index to end get ads from db
  const [noMoreAdsForSearch, setNoMoreAdsForSearch] = useState(false); //control on weather we will scroll for more result changes to true if no more result are available

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
      setindexStart(indexStart + 3);
    }
  };
  const getAds = async () => {
    setLoading(false);
    setNoMoreAdsForSearch(false);
    console.log(indexStart + "   " + indexEnd);
    const result = await instance.request({
      data: {
        data_type: props.search.data_type,
        params: props.search.params,
        limitBy: { start: indexStart, end: indexEnd }, //the indexes
      },
    });
    //console.log(result.data);
    if (result.data === false) {
      //console.log("empty");
      setAds("no ads feet");
      setNoMoreAdsForSearch(true);
    } else {
      if (typeof result.data === "string") {
        setNoMoreAdsForSearch(true);
        setAds((prevAds) => {
          return new Set([
            ...prevAds,
            <p key={uuidv4()} className="noMoreContentPar">
              no more ads
            </p>,
          ]);
        });
      } else {
        if (JSON.stringify(props.search) !== JSON.stringify(lastSearch)) {
          console.log("changed query");
          setAds(
            result.data.map((ad) => (
              <AdsBlock key={ad.adID + uuidv4()} adBlock={ad} />
            ))
          );
        } else {
          //console.log("append");
          setAds((prevAds) => {
            return new Set([
              ...prevAds,
              result.data.map((ad) => (
                <AdsBlock key={ad.adID + uuidv4()} adBlock={ad} />
              )),
            ]);
          });
        }
      }
      setLastSearch(props.search);
      setLoading(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    getAds();
  }, []);
  useEffect(() => {
    setNoMoreAdsForSearch(false);
    setindexStart(0);
    getAds();
  }, [props.search]);
  useEffect(() => {
    if (!noMoreAdsForSearch) getAds();
  }, [indexStart]);

  return <div className="listAds">{loading && ads}</div>;
};
export default Ads;
