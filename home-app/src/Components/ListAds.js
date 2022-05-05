import React, { useState, useEffect, useLayoutEffect } from "react";
import Ad from "./Ad";
import SearchComp from "./SearchComp";
import "../styles/ListAds.css";

function ListAds(props) {
  let obj = {};
  const [adClass, setAdClass] = useState("ad"); //className of ads
  const [searchAd, setSearchAd] = useState(""); //search ads by city
  const [adsAll, setAdsAll] = useState(props.allAds); //the all ads that are visible now hook
  useLayoutEffect(() => {
    setAdsAll(props.api.postToGetData({ data: "ads" }));
  }, [adsAll]);
  const changeSearchAd = (e) => {
    //control the search input
    setSearchAd(e.target.value);
  };
  const makeListOfAds = () => {
    //make array from object we got from server and then iterating on it
    //to get Ad component for each one and display only ads that are applicable to the search
    let code = "";
    //filter the aray by the search and then map and create Ad comp
    const arr = Object.values(adsAll);
    if (arr) {
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
            price={item["price"]}
            createTime={item["create_time"]}
            adLink={item["ad_link"]}
            air_conditioner={item["air_conditioner"]}
            apartment={item["apartment"]}
            entry={item["entry"]}
          />
        ));
    }
    return code;
  };

  const renderEntireComp = () => {
    //just becuse we want a clean return of comp func
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
