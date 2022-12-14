import React, { useState, useEffect, useMemo } from "react";
import instance from "../api/AxiosInstance";
import Package1 from "./Package1.js";
import "../styles/PackageDisplay.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const PackageDisplay = (props) => {
  //display all packs
  /*
  const [adsTop, setAdsTop] = useState(10);
  const [adsMin, setAdsMin] = useState(0);
  */

  const [packages, setPackages] = useState([]);
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

  const getPackages = async () => {
    //get all packs
    const result = await instance.request({
      data: {
        data_type: "getAllPackages",
      },
    });
    //console.log(result.data);
    if (result.data === false) {
      setPackages("no packages");
    } else {
      setPackages(
        result.data.map((pack) => <Package1 pack={pack} key={pack.packageId} />)
      );
    }
    setLoading(true);
  };

  useEffect(() => {
    getPackages();
  }, []);

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AdgO-pnLLUhoSXJgNejKhsq0C6tvbiDga5MhbBihFzu4ReNQTMotssi3LDOEYXrBWuC8MUs_fHYImfCI",
      }}
    >
      <div className="PackageDisplay">{packages}</div>
    </PayPalScriptProvider>
  );
};
export default PackageDisplay;
