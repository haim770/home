import React, { useState, useEffect, useMemo } from "react";
import instance from "../api/AxiosInstance";

const TryAds = (props) => {
  /*
  const [adsTop, setAdsTop] = useState(10);
  const [adsMin, setAdsMin] = useState(0);
  */
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adComp, setAdComp] = useState("");

  const getAds = async () => {
    const result = await instance.request({
      data: {
        data_type: "getAdsIdThatFeetSearch",
        params: { city: "haifa", air_conditioner: 1 },
      },
    });
    setAds(result.data);
  };
  useEffect(() => {
    getAds();
  }, []);
  const renderComp = () => {
    let code = [];
    let codeForOneAd = [];
    for (let index = 0; index < ads.length; index++) {
      codeForOneAd = [];
      console.log(ads[index].ad);
      for (const [key, value] of Object.entries(ads[index].ad[0])) {
        codeForOneAd.push(
          <div key={ads[index].ad[0].adID}>
            {key} {value}
          </div>
        );
        // console.log(`${key}: ${value}`);
      }
      for (const [key, value] of Object.entries(ads[index].adContent[0])) {
        codeForOneAd.push(
          <div key={ads[index].ad[0].adID}>
            {key} {value}
          </div>
        );
        // console.log(`${key}: ${value}`);
      }
      code.push(codeForOneAd);
    }

    // code=ads[0]+"d";
    //console.log(ads.ad[0].adID);
    return code;
  };
  return (
    <div>
      {ads !== "" ? renderComp() : "now"}
      <p>kdkdkd</p>
    </div>
  );
};
export default TryAds;
