import * as React from "react";
import { useLayoutEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridToolbarExport } from "@mui/x-data-grid";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./Styles/collapsTableStyle.css";
import useAuth from "../../../../../Auth/useAuth";
import instance from "../../../../../api/AxiosInstance";

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

  return {
    uuid,
    userEmail,
    userName,
    userRole,
    userLastSeen,
    price,
    adss,
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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row" align="right">
          {row.uuid}
        </TableCell>
        <TableCell align="right">{row.userEmail}</TableCell>
        <TableCell align="right">{row.userName}</TableCell>
        <TableCell align="right">{row.userRole}</TableCell>
        <TableCell align="right">{row.userLastSeen}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="medium"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      {/* This section will handle the open menu*/}
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            borderTop: "unset",
          },
        }}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                align="right"
              >
                מודעות
              </Typography>
              <Table size="medium" aria-label="ads">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">מזהה מודעה</TableCell>
                    <TableCell align="right">זמן יצירה</TableCell>
                    <TableCell align="right">תוקף</TableCell>
                    <TableCell align="right">פעיל?</TableCell>
                    <TableCell align="right">מספר צפיות</TableCell>
                    <TableCell align="right">סטאטוס מודעה</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.adss.map((adsRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" align="right">
                        {adsRow.adID}
                      </TableCell>
                      <TableCell align="right">{adsRow.create_time}</TableCell>
                      <TableCell align="right">{adsRow.expire_date}</TableCell>
                      <TableCell align="right">{adsRow.active}</TableCell>
                      <TableCell align="right">{adsRow.watch}</TableCell>
                      <TableCell align="right">
                        {adsRow.approval_status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {/* This section will handle the open menu*/}
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            borderTop: "unset",
          },
        }}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                align="right"
              >
                רכישות
              </Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {/* This section will handle the open menu*/}
    </React.Fragment>
  );
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {
  const [isLoading, setIsLoading] = useState(true);
    //const [rows, setRows] = useState([]);
    const { auth } = useAuth();
    /**
     * Get Chat from server
     */
    const getUsers = async () => {
      const result = await instance.request({
        data: {
          data_type: "getSettingsUsers",
          params: {},
        },
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      // check if we got new data from server or any response
      // if (result?.data) {
      //   //console.log(result.data.result);
      //   setRows(
      //     Object.values(result.data.result).map((objM, index) =>
      //       createData(
      //         objM["0"].uuid,
      //         objM["0"].mail,
      //         `${objM["0"].first_name} ${objM["0"].last_name}`,
      //         objM["0"].rule,
      //         objM["0"].last_seen,
      //         1,
      //         objM.ads,
      //         objM.purchase
      //       )
      //     )
      //   );
      // }
      setIsLoading(false);
    };
    /**
     * This will make that first we get all contacts then we will display all other
     * data and view, so we will see all contacts when we open the contacts
     * window
     */
    useLayoutEffect(() => {
      getUsers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <div className="tableContainer" style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        autoHeight={false}
        autoPageSize={true}
        loading={isLoading}
        components={{ Toolbar: GridToolbarExport }}
      />
    </div>
  );
}
// export default function CollapsibleTable() {
//   const [rows, setRows] = useState([]);
//   const { auth } = useAuth();
//   /**
//    * Get Chat from server
//    */
//   const getUsers = async () => {
//     const result = await instance.request({
//       data: {
//         data_type: "getSettingsUsers",
//         params: {},
//       },
//       headers: {
//         Authorization: `Bearer ${auth.accessToken}`,
//       },
//     });
//     // check if we got new data from server or any response
//     if (result?.data) {
//       //console.log(result.data.result);
//       setRows(
//         Object.values(result.data.result).map((objM, index) =>
//           createData(
//             objM["0"].uuid,
//             objM["0"].mail,
//             `${objM["0"].first_name} ${objM["0"].last_name}`,
//             objM["0"].rule,
//             objM["0"].last_seen,
//             1,
//             objM.ads,
//             objM.purchase
//           )
//         )
//       );
//     }
//   };
//   /**
//    * This will make that first we get all contacts then we will display all other
//    * data and view, so we will see all contacts when we open the contacts
//    * window
//    */
//   useLayoutEffect(() => {
//     getUsers();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   return (
//     <div className="tableContainer">
//       <TableContainer component={Paper}>
//         <Table aria-label="collapsible table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="right">מזהה משתמש</TableCell>
//               <TableCell align="right">שם משתמש</TableCell>
//               <TableCell align="right">שם</TableCell>
//               <TableCell align="right">הרשאות</TableCell>
//               <TableCell align="right">נראה לאחרונה</TableCell>
//               <TableCell align="right">פעולות</TableCell>
//               <TableCell />
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <Row key={row.uuid} row={row} />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }
