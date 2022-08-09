import * as React from "react";
import { useLayoutEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Styles/collapsTableStyle.css";
import "./Styles/ManageReports.css";
import useAuth from "../../../../../Auth/useAuth";
import instance from "../../../../../api/AxiosInstance";
import HandleComplainOnAd from "./HandleComplainOnAd.js";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import EditPackage from "../../../../EditPackage";
import AddParameterToAds from "../../Settings/Pages/AddParameterToAds";
import EditParameterAds from "./EditParameterAds";

const columns = [
  { field: "id", headerName: "מס פרמטר", flex: 1 },
  { field: "category", headerName: "קטגוריה", flex: 1 },
  { field: "min_value", headerName: "ערך מינימום", flex: 1 },
  { field: "max_value", headerName: "ערך מקסימום", flex: 1 },
  { field: "name", headerName: "שם פרמטר ", flex: 1 },
  { field: "display_type", headerName: " אפשרות תצוגה ", flex: 1 },
  { field: "typeOfVar", headerName: "סוג משתנה", flex: 1 },
];

const HandleAdParams = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const [rows, setRows] = useState([]);
  const [tableClassName, setTableClassName] = useState("showTable");
  const [showSelected, setShowSelected] = useState("notShowSelected");
  const [selectedParam, setSelectedParam] = useState({});
  const [searchParam, setSearchParam] = useState("getAllParams");

  /**
   * Get Data from server
   */
  const getMasters = async () => {
    //get all reports
    console.log(auth);
    const result = await instance.request({
      data: {
        data_type: "getMastersForAdsContentForTheTable",
        params: {
          guest: "registered",
          selector:
            searchParam === "פרמטרים השכרה"
              ? "getRentParams"
              : searchParam === "פרמטרים מכירה"
              ? "getBuyParams"
              : "getAllParams",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    // check if we got new data from server or any response
    console.log(result.data);
    if (result?.data) {
      if (result.data == "not authorized") {
        alert("not authorized");
        return;
      }

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
    getMasters();
  }, []);
  const serchParamssByParam = async (e) => {
    console.log(searchParam);
    e.preventDefault();
    if (searchParam == "") {
      alert("choose option");
      return;
    }
    getMasters();
    // check if we got new data from server or any response
  };
  return (
    <div className="tableContainer ">
      <nav className={tableClassName}>
        <label>
          <span>בחר איזה דוחות ברצונך לראות </span>
          <select
            value={searchParam}
            onChange={(e) => {
              setSearchParam(e.target.value);
            }}
          >
            <option></option>
            <option>פרמטרים השכרה</option>
            <option>פרמטרים מכירה</option>
            <option>כל הפרמטרים</option>
          </select>
        </label>
        <button onClick={serchParamssByParam}>חפש פרמטרים</button>
        <button
          onClick={(e) => {
            setShowSelected("createParam");
            setTableClassName("notShowTable");
          }}
        >
          צור פרמטר
        </button>
      </nav>
      <div style={{ height: 700, width: "100%" }} className={tableClassName}>
        <DataGrid
          rows={rows}
          sx={{ fontSize: "1.1vw" }}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          checkboxSelection={false}
          onRowClick={async (e) => {
            setSelectedParam(e.row);
            setTableClassName("notShowTable");
            setShowSelected("showSelected");
            console.log(e.row);
          }}
        />
      </div>
      {showSelected === "showSelected" ? (
        <EditParameterAds
          className={showSelected}
          setClassName={setShowSelected}
          setTableClassName={setTableClassName}
          min_value={selectedParam.min_value}
          max_value={selectedParam.max_value}
          setSelectedParam={setSelectedParam}
          id={selectedParam.id}
          paramStyle={selectedParam.display_type}
          paramName={selectedParam.name}
          category={selectedParam.category}
          refreshTable={getMasters}
        />
      ) : showSelected === "createParam" ? (
        <AddParameterToAds
          className={showSelected}
          setClassName={setShowSelected}
          setTableClassName={setTableClassName}
          setSearchPacks={setSelectedParam}
          refreshTable={getMasters}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default HandleAdParams;
