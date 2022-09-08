import React, { useState, useEffect, useMemo } from "react";
import instance from "../../../../../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";
import "../../../../../styles/Main.css";
import "../../../../../styles/Ads.css";
import AdsBlock from "../../../AdsBlock";
import useAuth from "../../../../../Auth/useAuth";
import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "id", headerName: "מס סידורי", flex: 1 },
  { field: "city", headerName: "עיר", flex: 1 },
  { field: "adType", headerName: "סוג מודעה", flex: 1 },
  { field: "avg", headerName: " מחיר ממוצע", flex: 2 },
  { field: "rooms", headerName: "חדרים", flex: 1 },
  { field: "countTransactions", headerName: "מונה מודעות", flex: 1 },
];
const AdsInformation = (props) => {
  //show info about ads
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [tableClassName, setTableClassName] = useState("showTable");
  const [end, setEnd] = useState(10);
  const [showDate, setShowDate] = useState(false);
  const [btnForDate, setBtnForDate] = useState("בחר תאריך");
  const [selectedDate, setSelectedDate] = useState("");
  const [priceQuery, setPriceQuery] = useState(false);
  const [rows, setRows] = useState([]);
  const [typeOfReport, setTyperOfReport] = useState("בחר דוח ");
  const [noMoreAdsForSearch, setNoMoreAdsForSearch] = useState(false); //control on weather we will scroll for more result changes to true if no more result are available
  const [changed, setChanged] = useState(false);
  const { auth } = useAuth();
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
      setStart(start + 10);
    }
  };
  const getAdScroll = async () => {
    console.log(start);
    setLoading(false);
    const result = await instance.request({
      data: {
        data_type: typeOfReport,
        params: { start: start, end: end },
        guest: auth.accessToken != undefined ? "registered" : "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result.data === false || result.data === "" || result.data == []) {
      setNoMoreAdsForSearch(true);
    } else {
      //console.log("append");
      if (!noMoreAdsForSearch) {
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
    setLoading(true);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
  useEffect(() => {
    if (!noMoreAdsForSearch && start !== 0) {
      getAdScroll();
    }
  }, [start]);
  const getAdsCityPrice = async (e) => {
    //ads prices by city

    const result = await instance.request({
      data: {
        data_type: "pricesPerCity",
        params: {},
        guest: auth.accessToken != undefined ? "registered" : "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    setRows(result.data);
  };
  const getAds = async (param) => {
    //get ads by the report we want
    setTyperOfReport(param);
    setLoading(false);
    setStart(0);
    setNoMoreAdsForSearch(false);
    const result = await instance.request({
      data: {
        data_type: param,
        params: { start: start, end: end, date: selectedDate },
        guest: auth.accessToken != undefined ? "registered" : "guest",
      },
      guest: auth.accessToken != undefined ? "registered" : "guest",
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result.data === false || result.data === "" || result.data == []) {
      setNoMoreAdsForSearch(true);
      return;
    } else {
      setAds(
        result.data.map((ad) => (
          <AdsBlock key={ad.adID + uuidv4()} adBlock={ad} isFavorite={true} />
        ))
      );
    }
    setLoading(true);
  };

  useEffect(() => {}, []);

  return (
    <article>
      <nav style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <button
            className="button-4"
            style={{ margin: "2rem" }}
            onClick={(e) => {
              e.preventDefault();
              setShowDate(false);
              setPriceQuery(false);
              setBtnForDate(" בחר תאריך");
              getAds("getClosedAds");
            }}
          >
            מודעות שנסגרו
          </button>
        </div>
        <div>
          <button
            className="button-4"
            style={{ margin: "2rem" }}
            onClick={(e) => {
              e.preventDefault();
              setShowDate(false);
              setPriceQuery(false);
              setBtnForDate(" בחר תאריך");
              getAds("getOpenAds");
            }}
          >
            מודעות פתוחות
          </button>
        </div>
        <div>
          <button
            className="button-4"
            style={{ margin: "2rem" }}
            onClick={(e) => {
              e.preventDefault();
              setPriceQuery(false);
              getAds("getAdsFromToday");
            }}
          >
            מודעות היום
          </button>
        </div>
        <div>
          <button
            className="button-4"
            style={{ margin: "2rem" }}
            onClick={(e) => {
              e.preventDefault();
              setPriceQuery(true);
              getAds("getAdsCloseToday");
            }}
          >
            מודעות פגות תוקף היום
          </button>
        </div>
        <div>
          <button
            className="button-4"
            style={{ margin: "2rem" }}
            onClick={(e) => {
              e.preventDefault();
              setPriceQuery(true);
              getAdsCityPrice(e);
            }}
          >
            מחיר למודעות בערים
          </button>
        </div>
      </nav>
      {priceQuery == false ? (
        <section className="containerForAllAds">
          <h1>
            {typeOfReport == "getAdsFromToday"
              ? "מודעות שפורסמו היום"
              : typeOfReport == "getClosedAds"
              ? "מודעות שנסגרו"
              : typeOfReport == "getOpenAds"
              ? "מודעות פתוחות "
              : typeOfReport == "getAdsCloseToday"
              ? "מודעות פגות תוקף היום"
              : "מחיר לפי ערים"}
          </h1>
          <div className="listAds">{loading && ads}</div>
          {noMoreAdsForSearch ? <h2>אין יותר נתונים</h2> : ""}
        </section>
      ) : (
        <section>
          <div
            style={{ height: 700, width: "100%" }}
            className={tableClassName}
          >
            <DataGrid
              autoPageSize
              rows={rows}
              columns={columns}
              rowsPerPageOptions={[15]}
              checkboxSelection={false}
              onRowClick={async (e) => {
                e.preventDefault();
              }}
            />
          </div>
        </section>
      )}
    </article>
  );
};
export default AdsInformation;
