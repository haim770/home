import React, { useEffect, useState } from "react";

import SearchAds from "./SearchAds.js";
import "../styles/AdsWithSearch.css";
import instance from "../api/AxiosInstance";
import Ads from "./pages/Ads.jsx";
function AdsWithSearch(props) {
  const [indexStart, setindexStart] = useState(0); //index to start get ads from db
  const [indexEnd, setindexEnd] = useState(10); //index to end get ads from db
  const [lastSearch, setLastSearch] = useState("");
  const [listShow, setListShow] = useState("showList");
  const [fullShow, setFullShow] = useState("notShowFull");
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
          setindexStart={setindexStart}
          indexStart={indexStart}
          indexEnd={indexEnd}
          setindexEnd={setindexEnd}
          setFullShow={setFullShow}
          setListShow={setListShow}
        />
        <Ads
          search={searchAd}
          setindexStart={setindexStart}
          indexStart={indexStart}
          indexEnd={indexEnd}
          setindexEnd={setindexEnd}
          setFullShow={setFullShow}
          setListShow={setListShow}
          listShow={listShow}
          fullShow={fullShow}
        />
      </section>
    );
  };
  return rendercomp();
}
AdsWithSearch.defaultProps = {
  content: "dd",
};
export default AdsWithSearch;
