import React, { useState, useEffect } from "react";
import "./Styles/AddParameterMaster.css";
import "./Styles/siteSettings.css";
import useAuth from "../../../../../Auth/useAuth";
import instance from "../../../../../api/AxiosInstance";
import toast, { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs && https://react-hot-toast.com/

function ManageSiteSettings(props) {
  const { auth } = useAuth();
  const [adValue, setAdValue] = useState(""); //hook for initial ad value per register
  const [editableParams, setEditableParams] = useState(false);
  const [expireDate, setExpireDate] = useState("");
  const [expectedProfit, setExpectedProfit] = useState("");
  const returnStateToDefault = () => {};
  const setDecimalParams = (e, setHook) => {
    if (isNaN(e.target.value)) return;
    if (e.target.value[e.target.value.length - 1] === ".") return;
    setHook(e.target.value); //int number inside
  };
  const makeParamEditable = (e) => {
    e.preventDefault();
    setEditableParams(!editableParams);
    console.log(editableParams);
  };
  const getAllSiteSettings = async () => {
    const result = await instance.request({
      data: {
        data_type: "getAllSiteSettings",
        params: {
          guest: "registered",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    if (result.data === "not authorized") {
      alert("not authorized");
      return;
    } else {
      setAdValue(result.data[0].adsGift);
      setExpireDate(result.data[0].expireDateAds);
      setExpectedProfit(result.data[0].expectedProfit);
    }
  };
  useEffect(() => {
    getAllSiteSettings();
  }, []);
  const cancel = (e) => {
    e.preventDefault();
    getAllSiteSettings();
    setEditableParams(false);
  };
  const submitChanges = async (e) => {
    //add ad to the db, returns true/false
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "updateSiteSettings",
        params: {
          guest: "registered",
          ad_value: adValue > 0 ? adValue : 5,
          expireDateAds: expireDate > 0 ? expireDate : 30,
          expectedProfit: expectedProfit >= 0 ? expectedProfit : 0,
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result.data === "update good") {
      toast.dismiss(); // remove loading toast
      toast.success("  עריכה הצליחה");
      getAllSiteSettings();
    } else {
      toast.dismiss(); // remove loading toast
      toast.error("עריכה נכשלה");
      getAllSiteSettings();
    }
  };
  return (
    <section>
      <form className="formAddParameter">
        <div>
          <label className="labelParamAdd" key={"adValueLable"}>
            <span>כמות מודעות נוכחית ברישום</span>
            <input
              type="text"
              name="adValue"
              value={adValue || ""}
              readOnly={!editableParams}
              onChange={(e) => setDecimalParams(e, setAdValue)}
            />
          </label>
          <label className="labelParamAdd" key="expireDateLable">
            <span>מס ימים עד פג תוקף של מודעה</span>
            <input
              type="text"
              name="expireDate"
              value={expireDate || ""}
              readOnly={!editableParams}
              onChange={(e) => setDecimalParams(e, setExpireDate)}
            />
          </label>
          <label className="labelParamAdd" key="expireDateLable">
            <span>תחזית רווח</span>
            <input
              type="text"
              name="expectedProfit"
              value={expectedProfit || ""}
              readOnly={!editableParams}
              onChange={(e) => setDecimalParams(e, setExpectedProfit)}
            />
          </label>
        </div>
        <div className="btnClassForSiteSettings">
          <button
            onClick={makeParamEditable}
            className="btnInsideTheSiteSettings"
          >
            {!editableParams
              ? "הפוך את הפרמטרים לזמינים לעריכה"
              : "סגור אפשרות עריכה"}
          </button>
          <button className="btnInsideTheSiteSettings" onClick={submitChanges}>
            העלה שינויים לאתר
          </button>
          <button className="btnInsideTheSiteSettings" onClick={cancel}>
            בטל שינויים
          </button>
        </div>
      </form>
      <Toaster />
    </section>
  );
}
ManageSiteSettings.defaultProps = {
  paramName: "",
  min_value: "",
  maxValue: "",
  paramStyle: "input",
  category: "השכרה",
  dataType: "VARCHAR",
};
export default ManageSiteSettings;
