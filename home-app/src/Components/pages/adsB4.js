import React, { useState, useEffect, useMemo } from "react";
import instance from "../../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";

import "../../styles/Main.css";
import "../../styles/Ads.css";
import AdsBlock from "./AdsBlock";
const Ads = (props) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastSearch, setLastSearch] = useState("");
  const [indexStart, setindexStart] = useState(0); //index to start get ads from db
  const [indexEnd, setindexEnd] = useState(10); //index to end get ads from db
  const [noMoreAdsForSearch, setNoMoreAdsForSearch] = useState(false); //control on weather we will scroll for more result changes to true if no more result are available

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
      setindexStart(indexStart + 10);
    }
  };
  const getAdsNoParams = async () => {};
  const getAds = async () => {
    setLoading(false);
    setNoMoreAdsForSearch(false);
    console.log(props.search);
    const result = await instance.request({
      data: {
        data_type: props.search.data_type,
        params: props.search.params,
        limitBy: { start: indexStart, end: indexEnd }, //the indexes
      },
    });
    console.log(result.data);
    if (result.data === false) {
      //console.log("empty");
      setAds("no ads feet");
      setNoMoreAdsForSearch(true);
    } else {
      if (typeof result.data === "string" || typeof result.data === "boolean") {
        setNoMoreAdsForSearch(true);
        if (
          !lastSearch ||
          JSON.stringify(props.search) !== JSON.stringify(lastSearch)
        ) {
          setAds("");
        } else
          setAds((prevAds) => {
            return new Set([...prevAds]);
          });
      } else {
        if (JSON.stringify(props.search) !== JSON.stringify(lastSearch)) {
          setAds(
            result.data.map((ad) => (
              <AdsBlock key={ad.adID + uuidv4()} adBlock={ad} />
            ))
          );
        } else {
          //console.log("append");
          setAds((prevAds) => {
            return new Set([
              ...prevAds,
              result.data.map((ad) => (
                <AdsBlock key={ad.adID + uuidv4()} adBlock={ad} />
              )),
            ]);
          });
        }
      }
      setLastSearch(props.search);
      setLoading(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    getAds();
  }, []);

  useEffect(() => {
    setNoMoreAdsForSearch(false);
    setindexStart(0);
    getAds();
  }, [props.search]);

  useEffect(() => {
    if (!noMoreAdsForSearch) {
      getAds();
    }
  }, [indexStart]);

  return (
    <div className="listAds">
      {loading && ads}
      {noMoreAdsForSearch ? <h2>no more ads</h2> : ""}
    </div>
  );
};
export default Ads;

// import React, { useState, useEffect, useMemo } from "react";
// import instance from "../../api/AxiosInstance";
// import { v4 as uuidv4 } from "uuid";

// import "../../styles/Main.css";
// import "../../styles/Ads.css";
// import AdsBlock from "./AdsBlock";
// import { useLayoutEffect } from "react";
// const Ads = (props) => {
//   const [ads, setAds] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [lastSearch, setLastSearch] = useState(false);
//   const [indexStart, setindexStart] = useState(0); //index to start get ads from db
//   const [indexEnd, setindexEnd] = useState(10); //index to end get ads from db
//   const [noMoreAdsForSearch, setNoMoreAdsForSearch] = useState(false); //control on weather we will scroll for more result changes to true if no more result are available
//   const [action, setAction] = useState(1); //1:2:3

//   // check when we scroll down to button
//   const handleScroll = (e) => {
//     // this is the inner height of the HTML page
//     const innerHeight = window.innerHeight;
//     // get the current Scroll hheight
//     const scrollPosition = e.target.documentElement.scrollTop;
//     // get full page scrolling height
//     const scrollHeight = e.target.documentElement.scrollHeight;

//     const currentHeight = Math.ceil(
//       e.target.documentElement.scrollTop + window.innerHeight
//     );
//     if (currentHeight + 1 >= scrollHeight) {
//       setLastSearch(false);
//       setindexStart((indexStart) => indexStart + 10);
//     }
//   };
//   const getAdsFirstTime = async () => {
//     setLastSearch(true);
//     setLoading(false);
//     const result = await instance.request({
//       data: {
//         data_type: props.search.data_type,
//         params: props.search.params,
//         limitBy: { start: 0, end: indexEnd }, //the indexes
//       },
//     });
//     if (result.data === false) {
//       //console.log("empty");
//       setNoMoreAdsForSearch(true);
//     } else {
//       setAds(
//         result.data.map((ad) => (
//           <AdsBlock key={ad.adID + uuidv4()} adBlock={ad} />
//         ))
//       );
//     }
//   };
//   const getAdsChangeSearch = async () => {
//     setLoading(false);
//     const result = await instance.request({
//       data: {
//         data_type: props.search.data_type,
//         params: props.search.params,
//         limitBy: { start: 0, end: indexEnd }, //the indexes
//       },
//     });
//     console.log(result.data);
//     if (result.data === false) {
//       //console.log("empty");
//       setNoMoreAdsForSearch(true);
//     } else {
//       setAds(
//         result.data.map((ad) => (
//           <AdsBlock key={ad.adID + uuidv4()} adBlock={ad} />
//         ))
//       );
//     }
//     setLoading(true);
//   };
//   const getAds = async () => {

//     setLoading(false);
//     setNoMoreAdsForSearch(false);
//     const result = await instance.request({
//       data: {
//         data_type: props.search.data_type,
//         params: props.search.params,
//         limitBy: { start: indexStart, end: indexEnd }, //the indexes
//       },
//     });
//     console.log(result.data);
//     if (
//       result.data === false ||
//       typeof result.data === "boolean" ||
//       typeof result.data === "string"
//     ) {

//       setNoMoreAdsForSearch(true);
//     } else {
//       setNoMoreAdsForSearch(true);
//       //console.log("append");
//       if (noMoreAdsForSearch) {
//         return;
//       }
//       setAds((prevAds) => {
//         return new Set([
//           ...prevAds,
//           result.data.map((ad) => (
//             <AdsBlock key={ad.adID + uuidv4()} adBlock={ad} />
//           )),
//         ]);
//       });
//     }
//     setLoading(true);
//   };
//   const getAds1 = async (num) => {
//     //num is the controller of action
//     if (num === 1) {
//       getAdsFirstTime();
//     }
//     if (num === 2) {
//       getAdsChangeSearch();
//     }
//     if (num === 3) {
//       getAds();
//     }
//   };
//   useLayoutEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     getAds1(action);
//   }, []);
//   useEffect(() => {
//     //search has been changed
//     setNoMoreAdsForSearch(false);
//     if (ads) {
//       setAction(2);
//     }
//     setindexStart(0);
//     setLastSearch(true);
//     getAds1(action);
//   }, [props.search]);
//   useEffect(() => {
//     if (!noMoreAdsForSearch) {
//       getAds();
//     }
//   });
//   return (
//     <div className="listAds">
//       {loading && ads}
//       {noMoreAdsForSearch ? <h2>no more ads</h2> : ""}
//     </div>
//   );
// };
// export default Ads;
