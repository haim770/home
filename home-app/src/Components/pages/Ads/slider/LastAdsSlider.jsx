import React, { useState, useEffect } from "react";
import instance from "../../../../api/AxiosInstance";
import AdsBlock from "../../AdsBlock";
import Cookies from "universal-cookie";
import { v4 as uuidv4 } from "uuid";

const LastAdsSlider = () => {
  const [cookie, setCookie] = useState("");
  const [ads, setAds] = useState([]);

  const handleLogin = () => {
    const cookies = new Cookies();
    const myCookie = cookies.get("viewCookie");
    if (!(myCookie === undefined)) {
      setCookie(myCookie);
    }
  };

  
  const handleEnterSite = async () => {
    try {
      const response = await instance.request({
        data: {
          data_type: "getSomeAds",
          params: { cookie },
        },
      });
        setAds(
          response.data.map((ad) => (
            <AdsBlock key={ad.adID + uuidv4()} adBlock={ad} />
          ))
        );
    } catch (err) {
      if (!err?.response) {
        console.log("No Server Response");
      } else {
        console.log("Login Failed");
      }
    }
  };

  useEffect(() => {
    handleEnterSite();
  }, []);


  // <AdsBlock key={ad.adID + uuidv4()} adBlock={ad} />
  return ads;
};

export default LastAdsSlider;
