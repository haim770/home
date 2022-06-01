import React, { useState, useEffect, useLayoutEffect } from "react";
import Ad from "./Ad";
import SearchComp from "./SearchComp";
import "../styles/ListAds.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import instance from "../api/AxiosInstance";

function ListAds(props) {
  let obj = {};
  const [adClass, setAdClass] = useState("ad"); //className of ads
  const [searchAd, setSearchAd] = useState(""); //search ads by city
  const [ads, setAds] = useState(props.adsShow);
  const [loading, setLoading] = useState(false);
   const getAds = async () => {
     //setAds(result.data);
     //console.log(typeof ads);
     setAds(
       props.adsShow.map((item) => (
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
       ))
     );
     
     setLoading(true);
   };
   
  useEffect(() => {
    getAds();
  }, []);

  const makeListOfAds = () => {
    //make array from object we got from server and then iterating on it
    //to get Ad component for each one and display only ads that are applicable to the search
    let code = "";
    //filter the aray by the search and then map and create Ad comp
    const arr = Object.values(ads);
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
    if (ads&&loading) {
       //console.log(ads);
      return (
        <section>
          <ul className={props.className}>{ads}</ul>;
        </section>);
    } 
    else {
      return(
        <section>
       </section>);
       }
  };

  return renderEntireComp();
  
}

ListAds.defaultProps = {
};
export default ListAds;
