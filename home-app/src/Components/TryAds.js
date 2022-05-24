import React, { useState, useEffect, useMemo } from "react";
import instance from "../api/AxiosInstance";



const TryAds = (props) => {
  /*
  const [adsTop, setAdsTop] = useState(10);
  const [adsMin, setAdsMin] = useState(0);
  */
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);


  const getAds = async () => {
    const result = await instance.request({
      data: {
        data_type: "getAdsIdThatFeetSearch",
        params:{city:"haifa",
      air_conditioner:1,}
      },
    });
    console.log(result.data);
  };
  useEffect(() => {
    getAds();
  }, []);

  return (
    <>
      <div className="MuiContainer-root jss77">
        <div className="cardWrapper">kkdkd</div>
      </div>
    </>
  );
};
export default TryAds;
