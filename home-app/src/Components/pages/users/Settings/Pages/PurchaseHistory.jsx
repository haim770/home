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

function createData(
  uuid,
  userEmail,
  userName,
  userRole,
  userLastSeen,
  price,
  ads,
  purchase
) {
  let adss;
  let purchases;
  if (ads) adss = ads;
  else
    adss = [
      {
        adId: "",
        active: "",
        approval_status: "",
        create_time: "",
        expire_date: "",
        watch: "",
        user_id: "",
      },
    ];
  if (purchase) purchases = purchase;
  else
    purchases = [
      {
        purchase_id: "",
        packageId: "",
        userId: "",
        purchase_time: "",
        price: "",
      },
    ];
  return {
    uuid,
    userEmail,
    userName,
    userRole,
    userLastSeen,
    price,
    adss,
    purchases,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

const rows = [
  { id: 1, pack_id: "Snow", purchase_date: "Jon", value: 35 },
  { id: 2, pack_id: "Lannister", purchase_date: "Cersei", value: 42 },
  { id: 3, pack_id: "Lannister", purchase_date: "Jaime", value: 45 },
  { id: 4, pack_id: "Stark", purchase_date: "Arya", value: 16 },
  { id: 5, pack_id: "Targaryen", purchase_date: "Daenerys", value: null },
  { id: 6, pack_id: "Melisandre", purchase_date: null, value: 150 },
  { id: 7, pack_id: "Clifford", purchase_date: "Ferrara", value: 44 },
  { id: 8, pack_id: "Frances", purchase_date: "Rossini", value: 36 },
  { id: 9, pack_id: "Roxie", purchase_date: "Harvey", value: 65 },
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
      setRows(
        Object.values(result.data.result).map((objM, index) =>
          createData(
            objM["0"].uuid,
            objM["0"].mail,
            `${objM["0"].first_name} ${objM["0"].last_name}`,
            objM["0"].rule,
            objM["0"].last_seen,
            1,
            objM.ads,
            objM.purchase
          )
        )
      );
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
