import React, { useEffect, useState } from "react";

import SearchAds from "./SearchAds.js";
import "../styles/AdsWithSearch.css";
import instance from "../api/AxiosInstance";
import Ads from "./pages/Ads.jsx";
function AdsWithSearch(props) {
  const [searchAd, setSearchAd] = useState({
    data_type: "getAllAdContentAndAdAndUsersForArrOfAds",
    params: [],
  }); //search ads
  const rendercomp = () => {
    return (
      <section className="adsWithSearch">
        <SearchAds
          api={props.api}
          className="search"
          setSearchParams={setSearchAd}
        />
        <Ads search={searchAd} />
      </section>
    );
  };
  return rendercomp();
}
AdsWithSearch.defaultProps = {
  content: "dd",
};
export default AdsWithSearch;
