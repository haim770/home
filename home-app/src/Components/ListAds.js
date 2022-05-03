import React, { useState, useEffect } from "react";
import Ad from "./Ad";
import Api from "../api/Api.js";
import SearchComp from "./SearchComp";
import "../styles/ListAds.css";

function ListAds(props) {
  const [adClass, setAdClass] = useState("ad");
  const [searchAd, setSearchAd] = useState(""); //search ads by city
  const [adsAll, setAdsAll] = useState(props.api.postToGetData("ads"));
  console.log(adsAll);
  const changeSearchAd = (e) => {
    setSearchAd(e.target.value);
  };
  const makeListOfAds = () => {
    let code = "";
    //filter the aray by the search and then map and create Ad comp
    const arr = Object.values(adsAll);
    console.log(arr.length);
    console.log(arr);

    code = arr
      .filter((ad) => ad["city"].includes(searchAd))
      .map((item) => (
        <Ad
          className={adClass}
          key={item["adID"]}
          id={item["adID"]}
          city={item["city"]}
          street={item["street"]}
          number={item["building_number"]}
          price="didnt set up ad content yet"
          createTime={item["create_time"]}
          adLink={item["ad_link"]}
        />
      ));

    return code;
  };
  const changeObjToArray = (obj) => {};
  const renderEntireComp = () => {
    let code = "";
    if (adsAll) {
      code = (
        <section>
          <SearchComp searchValue={searchAd} searchChange={changeSearchAd} />
          <ul className={props.className}>{makeListOfAds()}</ul>;
        </section>
      );
    } else {
      code = <section></section>;
    }
    return code;
  };
  return renderEntireComp();
}

ListAds.defaultProps = {
  adsArr: [
    [1, "haifa", "hatichon", "1", 1000, "01/04/1111", "haim.co.il"],
    [2, "afula", "lidors street", "5", 101200, "01/04/2001", "lidor.co.il"],
  ],
};
export default ListAds;
