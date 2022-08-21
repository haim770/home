import * as React from "react";
import { useLayoutEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Styles/collapsTableStyle.css";
import "./Styles/ManageReports.css";
import useAuth from "../../../../../Auth/useAuth";
import instance from "../../../../../api/AxiosInstance";
import HandleComplainOnAd from "./HandleComplainOnAd.js";
import HandleComplainOnBlog from "./HandleComplainOnBlog.jsx";
const columns = [
  { field: "id", headerName: "מס תלונה" },
  { field: "element_id", headerName: "מספר אלמנט" },
  { field: "userId", headerName: "משתמש שהתלונן" },
  { field: "create_time", headerName: "תאריך" },
  { field: "active", headerName: "סטטוס תלונה" },
  { field: "content", headerName: "תוכן תלונה" },
  { field: "title", headerName: "כותרת תלונה" },
  { field: "manage_feedback", headerName: "תגובת מנהל לתלונה" },
  { field: "report_reason", headerName: "סיבת תלונה" },
  { field: "element_type", headerName: "סוג אלמנט" },
];

const ManageReports = () => {
  const { auth } = useAuth();
  const [rows, setRows] = useState([]);
  const [tableClassName, setTableClassName] = useState("showTable");
  const [showSelected, setShowSelected] = useState("notShowSelected");
  const [selectedReport, setSelectedReport] = useState({});
  const [selectedAd, setSelectedAd] = useState({});
  const [searchReports, setSearchReports] = useState("getAllReports");

  /**
   * Get Data from server
   */
  const getSelectedAd = async (row) => {
    if (row.element_type == "ad") {
      let result = await instance.request({
        data: {
          data_type: "getAdByAdId",
          params: { adId: row.element_id },
          guest: "guest",
        },
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      if (result.data == "") {
        return;
      }
      if (result?.data) {
        console.log(result.data);
        setSelectedAd(result.data);
        return;
      }
    } else {
      if (row.element_type == "blog") {
        let result = await instance.request({
          data: {
            data_type: "getBlogById",
            params: { blogId: row.element_id },
            guest: "guest",
          },
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        if (result.data == "") {
          return;
        }
        console.log(result.data);
        setSelectedAd(result.data);
      }
    }
  };
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
  const serchReportsByParam = async (e) => {
    e.preventDefault();
    if (searchReports == "") {
      alert("choose option");
      return;
    }
    const data_type =
      searchReports === "דוחות שטופלו בעבר"
        ? "getReportsThatAreNotActive"
        : searchReports === "דוחות חדשים"
        ? "getNewReports"
        : "getAllReports";
    const result = await instance.request({
      data: {
        data_type: data_type,
        params: { guest: "registered" },
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
            <option>דוחות חדשים</option>
            <option>כל הדוחות</option>
            <option>דוחות שטופלו בעבר</option>
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
            await getSelectedAd(e.row);
            setShowSelected("showSelected");
            console.log(e.row);
          }}
        />
      </div>
      {console.log(selectedReport)}
      {showSelected === "showSelected" &&
      selectedReport.element_type == "ad" ? (
        <HandleComplainOnAd
          className={showSelected}
          setClassName={setShowSelected}
          setTableClassName={setTableClassName}
          selectedReport={selectedReport}
          selectedAd={selectedAd}
          setSelectedAd={setSelectedAd}
          setSelectedReport={setSelectedReport}
          getAllReports={getAllReports}
        />
      ) : showSelected == "showSelected" &&
        selectedReport.element_type == "blog" ? (
          <HandleComplainOnBlog
            className={showSelected}
            setClassName={setShowSelected}
            setTableClassName={setTableClassName}
            selectedReport={selectedReport}
            selectedBlog={selectedAd}
            setSelectedBlog={setSelectedAd}
            setSelectedReport={setSelectedReport}
            getAllReports={getAllReports}
          />
      ) : (
        ""
      )}
    </div>
  );
};

export default ManageReports;
