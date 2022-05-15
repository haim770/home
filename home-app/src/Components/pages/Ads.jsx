import React, { useState, useEffect, useMemo } from "react";
import instance from "./AxiosInstance";

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
      console.log("Button");
    }
  };

  const chooseTypeOfFetchingByTheSearch = (result) => {
    if (JSON.stringify(props.search) === JSON.stringify(lastSearch)) {
    } else {
    }
  };
  const getAds = async () => {
    const result = await instance.request({
      data: {
        data_type: props.search.data_type,
        params: props.search.params,
      },
    });
    console.log(result.data);
    if (result.data === false) {
      console.log("empty");
      setAds("no ads feet");
    } else {
      if (JSON.stringify(props.search) !== JSON.stringify(lastSearch)) {
        console.log("changed query");
        setAds(
          result.data.map((ad) => (
            <div key={ad.adID} className="innerCardWrapper jss177">
              {<AdsBlock adBlock={ad} />}
            </div>
          ))
        );
      } else {
        console.log("append");
        setAds(
          ...ads,
          result.data.map((ad) => (
            <div key={ad.adID} className="innerCardWrapper jss177">
              {<AdsBlock adBlock={ad} />}
            </div>
          ))
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

  return (
    <>
      <div className="MuiContainer-root jss77">
        <div className="cardWrapper">{loading && ads}</div>
      </div>
    </>
  );
};
export default Ads;
