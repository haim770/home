import React, { useEffect, useState } from "react";

import SearchAds from "./SearchAds.js";
import "../styles/AdsWithSearch.css";
import instance from "../api/AxiosInstance";
import Ads from "./pages/Ads.jsx";
import Try from "./try.js";
function AdsWithSearch(props) {
  const [indexStart, setindexStart] = useState(0); //index to start get ads from db
  const [indexEnd, setindexEnd] = useState(10); //index to end get ads from db
  const [lastSearch, setLastSearch] = useState("");
  const [listShow, setListShow] = useState("showList");
  const [fullShow, setFullShow] = useState("notShowFull");
  const [parameters, setParameters] = useState({});
  const [rentParams, setRentParams] = useState({});
  const [buyParams, setBuyParams] = useState({});
  const [searchAd, setSearchAd] = useState({
    data_type: "getAllAdContentAndAdAndUsersForArrOfAds",
    params: [],
  }); //search ads
  const getParameters = async () => {
    const result = await instance.request({
      data: {
        data_type: "getAllMasters",
      },
    });
    setParameters(result.data);
    console.log(result.data.length);
  };
  useEffect(() => {
    getParameters();
    if (parameters !== "") {
      for (let index = 0; index < parameters.length; index++) {
        if (parameters[index].category === "השכרה") {
          setRentParams({
            ...rentParams,
            [parameters[index].name]: "haim",
          });
        } else {
          setBuyParams({
            ...buyParams,
            [parameters[index].name]: "ahah",
          });
        }
      }
    }
  }, []);
  const rendercomp = () => {
    return (
      <section className="adsWithSearch">
        {/* <Try
          parameters={parameters}
          rentParams={rentParams}
          buyParams={buyParams}
          setRentParams={setRentParams}
          setBuyParams={setBuyParams}
        /> */}
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
          rentParams={rentParams}
          buyParams={buyParams}
          setRentParams={setRentParams}
          setBuyParams={setBuyParams}
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
