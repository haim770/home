import React, { useState, useEffect } from "react";
import instance from "./AxiosInstance";

import "../../styles/Main.css";

const Ads = () => {
  /*
  const [adsTop, setAdsTop] = useState(10);
  const [adsMin, setAdsMin] = useState(0);
  */
  const [ads, setAds] = useState({});
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
  const getAds = async () => {
    const result = await instance.request({
      data: {
        data_type: "TEST2",
        params: {},
      },
    });
    setAds(result);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    
  });
  useEffect(()=>{
    getAds();
  },[ads]);

  return (
    <>
      <p></p>
      {JSON.stringify(ads.data)}
      {/* we need to make and offset var to hold the next batch we want to load <TestAxios data_type="TEST2" params={currentOffset} />*/}

      {/*<TestAxios data_type="TEST2" params={[]} />*/}

    </>
  );
};
export default Ads;
