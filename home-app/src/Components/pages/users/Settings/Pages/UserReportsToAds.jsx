import * as React from "react";
import { useLayoutEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Styles/collapsTableStyle.css";
import "./Styles/ManageReports.css";
import useAuth from "../../../../../Auth/useAuth";
import instance from "../../../../../api/AxiosInstance";
import HandleComplainOnAd from "./HandleComplainOnAd.js";
import AdFullForPropsWithReport from "../../../../AdFullForPropsWithReport.js";

const columns = [
  { field: "id", headerName: "מס סידורי" },
  { field: "reportId", headerName: "מספר דוח" },
  { field: "adId", headerName: "משתמש מודעה" },
  { field: "createTime", headerName: "תאריך" },
  { field: "seen", headerName: "נראה " },
];

const UserReportsToAds = () => {
  const { auth } = useAuth();
  const [rows, setRows] = useState([]);
  const [tableClassName, setTableClassName] = useState("showTable");
  const [showSelected, setShowSelected] = useState("notShowSelected");
  const [selectedMsg, setSelectedMsg] = useState({});
  const [selectedReport, setSelectedReport] = useState({});
  const [reportFeedback, setReportFeedback] = useState({});
  const [selectedAd, setSelectedAd] = useState({});
  const [searchReports, setSearchReports] = useState("כל ההודעות");

  /**
   * Get Data from server
   */
  const getSelectedAdWithReportFeedback = async (row) => {
    setSelectedMsg(row);
    let result = await instance.request({
      data: {
        data_type: "getSelectedAdWithReportFeedback",
        params: { guest: "guest", adId: row.adId, reportId: row.reportId },
        guest: "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    setSelectedAd(result.data);
  };
  const getAllReportsForUser = async (row) => {
    let result = await instance.request({
      data: {
        data_type: "getAllReportsOnAdsForUserId",
        params: { guest: "registered" },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    setRows(result.data);
  };
  /**
   * This will make that first we get all contacts then we will display all other
   * data and view, so we will see all contacts when we open the contacts
   * window
   */
  useLayoutEffect(() => {
    getAllReportsForUser();
  }, []);
  const serchReportsByParam = async (e) => {
    e.preventDefault();
    if (searchReports == "") {
      alert("choose option");
      return;
    }
    console.log(searchReports);
    const result = await instance.request({
      data: {
        data_type: "getReportsOnAdsForUserIdByParam",
        params: {
          guest: "registered",
          seenStatus:
            searchReports === "הודעות שנקראו"
              ? "1"
              : searchReports === "הודעות חדשות"
              ? "0"
              : "all",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    // check if we got new data from server or any response
    console.log(result.data);
    if (result?.data == false) {
      setRows([]);
    }
    if (result?.data) {
      if (result.data == "not authorized") {
        alert("not authorized");
        return;
      }

      if (result.data == false) {
        setRows({});
      }
      console.log(result.data);
      setRows(result.data);
    }
  };
  return (
    <div className="tableContainer ">
      <nav>
        <label>
          <span>בחר איזה דוחות ברצונך לראות </span>
          <select
            value={searchReports}
            onChange={(e) => {
              setSearchReports(e.target.value);
            }}
          >
            <option></option>
            <option>הודעות חדשות </option>
            <option>כל ההודעות</option>
            <option>הודעות שנקראו</option>
          </select>
        </label>
        <button onClick={serchReportsByParam}>חפש דוחות</button>
      </nav>
      <div style={{ height: 700, width: "100%" }} className={tableClassName}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          checkboxSelection={false}
          onRowClick={async (e) => {
            setSelectedReport(e.row);
            setTableClassName("notShowTable");
            await getSelectedAdWithReportFeedback(e.row);
            setShowSelected("showSelected");
          }}
        />
      </div>
      {showSelected === "showSelected" ? (
        <AdFullForPropsWithReport
          className={showSelected}
          setClassName={setShowSelected}
          setTableClassName={setTableClassName}
          report={selectedAd.report}
          adBlock={selectedAd.ad}
          setSelectedAd={setSelectedAd}
          msg={selectedMsg}
          setSelectedReport={setSelectedReport}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default UserReportsToAds;
