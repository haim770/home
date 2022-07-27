import * as React from "react";
import { useLayoutEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Styles/collapsTableStyle.css";
import useAuth from "../../../../../Auth/useAuth";
import instance from "../../../../../api/AxiosInstance";

const columns = [
  { field: "id", headerName: "מס סידורי", width: 180 },
  { field: "report_id", headerName: "מס דוח ", width: 180 },
  { field: "element_id", headerName: "מספר אלמנט", width: 180 },
  { field: "userId", headerName: "תאריך תלונה", width: 130 },
  { field: "create_time", headerName: "סטטוס תלונה", width: 130 },
  { field: "active", headerName: "סטטוס תלונה", width: 130 },
  { field: "content", headerName: "סטטוס תלונה", width: 130 },
  { field: "title", headerName: "סטטוס תלונה", width: 130 },
  { field: "manage_feedback", headerName: "סטטוס תלונה", width: 130 },
  { field: "report_reason ", headerName: "סטטוס תלונה", width: 130 },
  { field: "element_type", headerName: "סטטוס תלונה", width: 130 },
];

const ManageReports = () => {
  const { auth } = useAuth();
  const [rows, setRows] = useState([]);

  /**
   * Get Data from server
   */
  const getAllReports = async () => {
    //get all reports
    const result = await instance.request({
      data: {
        data_type: "getAllReports",
        params: { guest: "registered" },
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
    getAllReports();
  }, []);

  return (
    <div className="tableContainer">
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          checkboxSelection={false}
        />
      </div>
    </div>
  );
};

export default ManageReports;
