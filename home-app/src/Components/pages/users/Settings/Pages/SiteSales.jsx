import * as React from "react";
import { useLayoutEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Styles/collapsTableStyle.css";
import useAuth from "../../../../../Auth/useAuth";
import instance from "../../../../../api/AxiosInstance";
import { NavLink, Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "מזהה רכישה", flex: 1 },
  { field: "pack_id", headerName: "מזהה חבילה", flex: 1 },
  { field: "user", headerName: "משתמש", flex: 1 },
  { field: "purchase_date", headerName: "תאריך רכישה", flex: 1 },
  {
    field: "value",
    headerName: "סכום",
    type: "number",
    flex: 1,
  },
];

const SiteSales = () => {
  //all site purchases
  const { auth } = useAuth();
  const [rows, setRows] = useState([]);
  const [countSales, setCountSales] = useState("");
  const [sumSales, setSumSales] = useState("");
  const [userWithMostBuy, setUserWithMostBuy] = useState("");
  const [packMost, setPackMost] = useState("");

  /**
   * Get Data from server
   */
  const getUserPurchase = async () => {
    //get all purchases for the manager to see
    const result = await instance.request({
      data: {
        data_type: "getAllPurchases",
        params: {},
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    // check if we got new data from server or any response
    console.log(result.data);
    if (result?.data) {
      if (result.data == false) {
        setRows([]);
      }
      setRows(result.data.result);
      setSumSales(result.data.sum);
      setCountSales(result.data.count);
      setUserWithMostBuy(result.data.userMost);
      setPackMost(result.data.packMost);
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
    <article>
      <section style={{ dispay: "flex" }}>
        <h1>נתונים כלליים</h1>
        <ul>
          <li>משתמש שרכש הכי הרבה הוא : {userWithMostBuy}</li>
          <li>סכום כל הרכישות {sumSales}</li>
          <li>מונה רכישות {countSales}</li>
          <li>
            {" "}
            חבילה הכי פופולרית{" "}
            <Link to={{ pathname: "/packages/" + packMost }}> {packMost}</Link>
          </li>
        </ul>
      </section>
      <section className="tableContainer">
        <div style={{ height: "100vh", maxHeight: "2000px", width: "100%" }}>
          <DataGrid
            sx={{ fontSize: "1vw" }}
            rows={rows}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[15]}
            checkboxSelection={false}
          />
        </div>
      </section>
    </article>
  );
};

export default SiteSales;
