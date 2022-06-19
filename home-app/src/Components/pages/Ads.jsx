import React, { useState, useEffect, useMemo } from "react";
import instance from "../../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";

import "../../styles/Main.css";
import "../../styles/Ads.css";
import AdsBlock from "./AdsBlock";
import AdFullForProps from "../AdFullForProps";
const Ads = (props) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastSearch, setLastSearch] = useState("");
  const [noMoreAdsForSearch, setNoMoreAdsForSearch] = useState(false); //control on weather we will scroll for more result changes to true if no more result are available
  const [changed, setChanged] = useState(false);
  const [listShow, setListShow] = useState("showList");
  const [fullShow, setFullShow] = useState("notShowFull");
  const [adFull, setAdFull] = useState({});

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
      props.setindexStart(props.indexStart + 10);
    }
  };
  const getAdScroll = async () => {
    setLoading(false);
    const result = await instance.request({
      data: {
        data_type: props.search.data_type,
        params: props.search.params,
        limitBy: { start: props.indexStart, end: props.indexEnd }, //the indexes
      },
    });
    if (result.data === false || result.data === "") {
      setNoMoreAdsForSearch(true);
    } else {
      //console.log("append");
      if (!noMoreAdsForSearch)
        setAds((prevAds) => {
          return new Set([
            ...prevAds,
            result.data.map((ad) => (
              <AdsBlock key={ad.adID + uuidv4()} adBlock={ad} />
            )),
          ]);
        });
    }
    setLoading(true);
  };
  const getAds = async () => {
    setLoading(false);
    setNoMoreAdsForSearch(false);
    const result = await instance.request({
      data: {
        data_type: props.search.data_type,
        params: props.search.params,
        limitBy: { start: 0, end: props.indexEnd }, //the indexes
      },
    });
    //console.log(result.data);
    if (result.data === false || result.data === "") {
      setNoMoreAdsForSearch(true);
      return;
    } else {
      if (JSON.stringify(props.search) !== JSON.stringify(lastSearch)) {
        setAds(
          result.data.map((ad) => (
            <AdsBlock
              key={ad.adID + uuidv4()}
              className={listShow}
              adBlock={ad}
              setAdFull={setAdFull}
              setFullShow={setFullShow}
              setListShow={setListShow}
            />
          ))
        );
      } else {
        //console.log("append");
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
      setLastSearch(props.search.params);
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
    getAds();
  }, [props.search]);

  useEffect(() => {
    if (!noMoreAdsForSearch && props.indexStart !== 0) {
      getAdScroll();
    }
  }, [props.indexStart]);

  return (
    <section className="containerForAllAds">
      {console.log(adFull)}
      <h1>all the wanted ads</h1>
      <div className="listAds">{loading && listShow === "showList" && ads}</div>
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
      {noMoreAdsForSearch ? <h2>no more ads</h2> : ""}
    </section>
  );
};
export default Ads;
