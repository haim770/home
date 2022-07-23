import * as React from "react";
import { useLayoutEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Styles/collapsTableStyle.css";
import useAuth from "../../../../../Auth/useAuth";
import instance from "../../../../../api/AxiosInstance";

const columns = [
  { field: "id", headerName: "מזהה רכישה", width: 180 },
  { field: "pack_id", headerName: "מזהה חבילה", width: 180 },
  { field: "purchase_date", headerName: "תאריך רכישה", width: 130 },
  {
    field: "value",
    headerName: "סכום",
    type: "number",
    width: 130,
  },
];

const PurchaseHistory = () => {
  const { auth } = useAuth();
  const [rows, setRows] = useState([]);

  /**
   * Get Data from server
   */
  const getUserPurchase = async () => {
    const result = await instance.request({
      data: {
        data_type: "getSettingsUserPurchase",
        params: {},
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    // check if we got new data from server or any response
    if (result?.data) {
      setRows(result.data.result);
    }
  };
  /**
   * This will make that first we get all contacts then we will display all other
   * data and view, so we will see all contacts when we open the contacts
   * window
   */
  useLayoutEffect(() => {
    getUserPurchase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default PurchaseHistory;
