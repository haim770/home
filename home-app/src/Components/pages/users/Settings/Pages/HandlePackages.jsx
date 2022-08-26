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
import CreatePackage from "../../../../CreatePackage";

const columns = [
  { field: "id", headerName: "מס חבילה", flex: 1 },
  { field: "price", headerName: "מחיר", flex: 1 },
  { field: "is_active", headerName: "חבילה פעילה", flex: 1 },
  { field: "title", headerName: "כותרת", flex: 1 },
  { field: "content", headerName: "תוכן ", flex: 1 },
  { field: "create_time", headerName: " תאריך יצירה", flex: 1 },
  { field: "ad_value", headerName: "מס מודעות", flex: 1 },
  { field: "update_time", headerName: "תאריך עדכון", flex: 1 },
  { field: "countPurchases", headerName: "מס רכישות של החבילה", flex: 1 },
  { field: "sumPurchases", headerName: "סכום שהורווח ממכירת חבילה", flex: 1 },
];

const HandlePackages = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const [rows, setRows] = useState([]);
  const [tableClassName, setTableClassName] = useState("showTable");
  const [showSelected, setShowSelected] = useState("notShowSelected");
  const [selectedPack, setSelectedPack] = useState({});
  const [searchPacks, setSearchPacks] = useState("getAllPacks");

  /**
   * Get Data from server
   */
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
      <nav className={tableClassName}>
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
        <button
          className="button-4"
          onClick={serchReportsByParam}
        >
          חפש חבילות
        </button>
        <button
          className="button-4"
          onClick={(e) => {
            setShowSelected("createPackage");
            setTableClassName("notShowTable");
          }}
        >
          צור חבילה
        </button>
      </nav>
      <div
        style={{ height: "800px", width: "100%" }}
        className={tableClassName}
      >
        <DataGrid
          rows={rows}
          sx={{ fontSize: "1vw" }}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          checkboxSelection={false}
          onRowClick={async (e) => {
            setSelectedPack(e.row);
            setTableClassName("notShowTable");
            setShowSelected("showSelected");
            console.log(e.row);
          }}
        />
      </div>
      {showSelected === "showSelected" ? (
        <EditPackage
          className={showSelected}
          setClassName={setShowSelected}
          setTableClassName={setTableClassName}
          price={selectedPack.price}
          title={selectedPack.title}
          setSearchPacks={setSelectedPack}
          id={selectedPack.id}
          adValue={selectedPack.ad_value}
          is_active={selectedPack.is_active}
          content={selectedPack.content}
        />
      ) : showSelected === "createPackage" ? (
        <CreatePackage
          className={showSelected}
          setClassName={setShowSelected}
          setTableClassName={setTableClassName}
          price={selectedPack.price}
          title={selectedPack.title}
          setSearchPacks={setSelectedPack}
          id={selectedPack.id}
          adValue={selectedPack.ad_value}
          is_active={selectedPack.is_active}
          content={selectedPack.content}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default HandlePackages;
