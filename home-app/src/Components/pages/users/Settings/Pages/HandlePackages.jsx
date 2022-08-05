import * as React from "react";
import { useLayoutEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Styles/collapsTableStyle.css";
import "./Styles/ManageReports.css";
import useAuth from "../../../../../Auth/useAuth";
import instance from "../../../../../api/AxiosInstance";
import HandleComplainOnAd from "./HandleComplainOnAd.js";

const columns = [
  { field: "id", headerName: "מס חבילה" },
  { field: "price", headerName: "מחיר" },
  { field: "is_active", headerName: "סטטוס" },
  { field: "title", headerName: "כותרת" },
  { field: "content", headerName: "תוכן תלונה" },
  { field: "create_time", headerName: " תאריך יצירה" },
  { field: "ad_value", headerName: "מס מודעות" },
  { field: "update_time", headerName: "תאריך עדכון" },
];

const HandlePackages = () => {
  const { auth } = useAuth();
  const [rows, setRows] = useState([]);
  const [tableClassName, setTableClassName] = useState("showTable");
  const [showSelected, setShowSelected] = useState("notShowSelected");
  const [selectedReport, setSelectedReport] = useState({});
  const [selectedAd, setSelectedAd] = useState({});
  const [searchPacks, setSearchPacks] = useState("getAllPacks");

  /**
   * Get Data from server
   */
  const getSelectedAd = async (row) => {
    let result = await instance.request({
      data: {
        data_type: "getAdByAdId",
        params: { adId: row.element_id },
        guest: "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    setSelectedAd(result.data);
  };
  const getPackages = async () => {
    //get all reports
    const result = await instance.request({
      data: {
        data_type: "getPackages",
        params: {
          guest: "registered",
          selector:
            searchPacks === "חבילות פעילות"
              ? "getActivePacks"
              : searchPacks === "חבילות לא פעילות"
              ? "getNotActivePacks"
              : "getAllPacks",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    // check if we got new data from server or any response
    if (result?.data) {
      if (result.data == "not authorized") {
        alert("not authorized");
        return;
      }

      console.log(result.data);

      setRows(result.data);
    }
    console.log(result.data);
    console.log(rows);
  };
  /**
   * This will make that first we get all contacts then we will display all other
   * data and view, so we will see all contacts when we open the contacts
   * window
   */
  useLayoutEffect(() => {
    getPackages();
  }, []);
  const serchReportsByParam = async (e) => {
    console.log(searchPacks);
    e.preventDefault();
    if (searchPacks == "") {
      alert("choose option");
      return;
    }
    getPackages();
    // check if we got new data from server or any response
  };
  return (
    <div className="tableContainer ">
      <nav>
        <label>
          <span>בחר איזה דוחות ברצונך לראות </span>
          <select
            value={searchPacks}
            onChange={(e) => {
              setSearchPacks(e.target.value);
            }}
          >
            <option></option>
            <option>חבילות פעילות</option>
            <option>חבילות לא פעילות</option>
            <option>כל החבילות</option>
          </select>
        </label>
        <button onClick={serchReportsByParam}>חפש חבילות</button>
      </nav>
      <div style={{ height: 700, width: "100%" }} className={tableClassName}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          checkboxSelection={false}
          onRowClick={async (e) => {
            setSelectedReport(e.row);
            setTableClassName("notShowTable");
            await getSelectedAd(e.row);
            setShowSelected("showSelected");
            console.log(e.row);
          }}
        />
      </div>
      {showSelected === "showSelected" ? (
        <HandleComplainOnAd
          className={showSelected}
          setClassName={setShowSelected}
          setTableClassName={setTableClassName}
          selectedReport={selectedReport}
          selectedAd={selectedAd}
          setSelectedAd={setSelectedAd}
          setSelectedReport={setSelectedReport}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default HandlePackages;
