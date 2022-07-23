import React from 'react'
import { DataGrid } from "@mui/x-data-grid";


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
  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        checkboxSelection={false}
      />
    </div>
  );
}

export default PurchaseHistory