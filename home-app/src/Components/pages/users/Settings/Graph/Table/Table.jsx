import { React, useEffect, useState } from "react";
import "./styles.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { DataGrid } from "@mui/x-data-grid";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import instance from "../../../../../../api/AxiosInstance";
import useAuth from "../../../../../../Auth/useAuth";
const List = () => {
  //list of cols for the table
  const columns = [
    { field: "id", headerName: "מזהה רכישה", flex: 1 },
    { field: "pack_id", headerName: "מזהה חבילה", flex: 1 },
    { field: "purchase_date", headerName: "תאריך רכישה", flex: 1 },
    {
      field: "value",
      headerName: "סכום",
      type: "number",
      flex: 1,
    },
  ];
  const { auth } = useAuth();
  const [rows, setRows] = useState([]);
  const getAllPurchases = async () => {
    //get all purchases in the site(manager ops)
    const result = await instance.request({
      data: {
        data_type: "getAllPurchases",
        params: {},
        guest: "registered",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    setRows(result.data.result);
  };
  const getAllPurchasesForUser = async () => {
    //get purchases of specific user(user part)
    const result = await instance.request({
      data: {
        data_type: "getAllPurchasesForUser",
        params: {},
        guest: "registered",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    setRows(result.data.result);
  };
  useEffect(() => {
    if (auth?.rule == "5150") {
      getAllPurchases();
    } else getAllPurchasesForUser();
  }, []);
  return (
    <div className="tableContainer">
      <div style={{ height: "40vh", width: "100%" }}>
        <DataGrid
          sx={{ fontSize: "1vw" }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
        />
      </div>
    </div>
  );
};

export default List;
