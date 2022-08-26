import * as React from "react";
import { useLayoutEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Styles/collapsTableStyle.css";
import "./Styles/ManageReports.css";
import useAuth from "../../../../../Auth/useAuth";
import instance from "../../../../../api/AxiosInstance";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import AddReportReason from "../../Settings/Pages/AddReportReason";
import EditReportReasons from "./EditReportReasons.jsx";

const columns = [
  { field: "id", headerName: "מס סיבה", flex: 1 },
  { field: "element_type", headerName: "קטגוריה", flex: 1 },
  { field: "reason_name", headerName: "סיבת דיווח", flex: 1 },
  { field: "create_time", headerName: "נוצר בתאריך", flex: 1 },
  { field: "active", headerName: "פעיל ", flex: 1 },
];

const HandleReportReasons = () => {
  const { auth } = useAuth();
  const [rows, setRows] = useState([]);
  const [tableClassName, setTableClassName] = useState("showTable");
  const [showSelected, setShowSelected] = useState("notShowSelected");
  const [selectedReason, setSelectedReason] = useState({});

  /**
   * Get Data from server
   */
  const getMasters = async () => {
    //get all reports
    console.log(auth);
    const result = await instance.request({
      data: {
        data_type: "getAllReportReasons",
        params: {
          guest: "registered",
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
  return (
    <div className="tableContainer ">
      <nav className={tableClassName}>
        <button
          className="button-4"
          onClick={(e) => {
            setShowSelected("createReason");
            setTableClassName("notShowTable");
          }}
        >
          צור סיבת דיווח
        </button>
      </nav>
      <div style={{ height: 700, width: "100%" }} className={tableClassName}>
        <DataGrid
          rows={rows}
          sx={{ fontSize: "1vw" }}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          checkboxSelection={false}
          onRowClick={async (e) => {
            setSelectedReason(e.row);
            setTableClassName("notShowTable");
            setShowSelected("showSelected");
            console.log(e.row);
          }}
        />
      </div>
      {showSelected === "showSelected" ? (
        <EditReportReasons
          className={showSelected}
          setClassName={setShowSelected}
          setTableClassName={setTableClassName}
          selectedReason={selectedReason}
          setSelectedReason={setSelectedReason}
          refreshTable={getMasters}
        />
      ) : showSelected === "createReason" ? (
        <AddReportReason
          className={showSelected}
          setClassName={setShowSelected}
          setTableClassName={setTableClassName}
          setSearchPacks={setSelectedReason}
          refreshTable={getMasters}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default HandleReportReasons;
