import * as React from "react";
import { useLayoutEffect , useState} from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./Styles/collapsTableStyle.css"
import useAuth from "../../../../../Auth/useAuth";
import instance from "../../../../../api/AxiosInstance";
import usePopupAd from "../useContextReducer/PopupAdsContext";
import PopupModal from "./PopupModal";


function createData(uuid, userEmail, userName, userRole, userLastSeen, price,ads,purchase ) {
let adss;
let purchases;
  if(ads) adss = ads;
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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const {popAd} = usePopupAd();

 function handleClick(adID) {
  console.log(typeof popAd);
   //popAd(adID);
 }

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
                        <div
                          onClick={function () {
                            handleClick(adsRow.adID);
                          }}
                        >
                          {adsRow.adID}
                        </div>
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
                    <TableCell align="right">מזהה רכישה</TableCell>
                    <TableCell align="right">מזהה חבילה</TableCell>
                    <TableCell align="right">תאריך רכישה</TableCell>
                    <TableCell align="right">סכום (₪)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.purchases.map((purchaseRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" align="right">
                        {purchaseRow.purchase_id}
                      </TableCell>
                      <TableCell align="right">
                        {purchaseRow.packageId}
                      </TableCell>
                      <TableCell align="right">
                        {purchaseRow.purchase_time}
                      </TableCell>
                      <TableCell align="right">{purchaseRow.price}</TableCell>
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

export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const { modalOpen } = usePopupAd();
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
    if (result?.data) {
      setTotalRows(Object.values(result.data.result).length);
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
            objM.purchase,
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
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="tableContainer">
      {modalOpen && <PopupModal />}
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="right">מזהה משתמש</TableCell>
              <TableCell align="right">שם משתמש</TableCell>
              <TableCell align="right">שם</TableCell>
              <TableCell align="right">הרשאות</TableCell>
              <TableCell align="right">נראה לאחרונה</TableCell>
              <TableCell align="right">פעולות</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.uuid} row={row} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={totalRows}
                rowsPerPage={5}
                page={page}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>{" "}
    </div>
  );
}
