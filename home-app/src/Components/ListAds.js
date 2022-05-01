import React, { useState } from "react";
import Ad from "./Ad";
import SearchComp from "./SearchComp";
import "../styles/ListAds.css";

function ListAds(props) {
  const [adClass, setAdClass] = useState("ad");
  const [searchAd, setSearchAd] = useState(""); //search ads by city
  const changeSearchAd = (e) => {
    setSearchAd(e.target.value);
  };
  const makeListOfAds = () => {
    let code = "";
    console.log(props.adsArr[1][0]);
    //filter the aray by the search and then map and create Ad comp
    code = props.adsArr
      .filter((ad) => ad[1].includes(searchAd))
      .map((item) => (
        <Ad
          className={adClass}
          key={item[0]}
          id={item[0]}
          city={item[1]}
          street={item[2]}
          number={item[3]}
          price={item[4]}
          createTime={item[5]}
          adLink={item[6]}
        />
      ));

    return code;
  };
  return (
    <section>
      <SearchComp searchValue={searchAd} searchChange={changeSearchAd} />
      <ul className={props.className}>{makeListOfAds()}</ul>
    </section>
  );
}

ListAds.defaultProps = {
  adsArr: [
    [1, "haifa", "hatichon", "1", 1000, "01/04/1111", "haim.co.il"],
    [2, "afula", "lidors street", "5", 101200, "01/04/2001", "lidor.co.il"],
  ],
};
export default ListAds;
