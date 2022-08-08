import React, { useState, useEffect } from "react";
import "./Styles/AddParameterMaster.css";
import useAuth from "../../../../../Auth/useAuth";
import instance from "../../../../../api/AxiosInstance";
import toast, { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs && https://react-hot-toast.com/

function ManageSiteSettings(props) {
  const { auth } = useAuth();
  const [adValue, setAdValue] = useState(""); //hook for initial ad value per register
  const [editableParams, setEditableParams] = useState(false);
  const returnStateToDefault = () => {};
  const setAdValueHook = (e) => {
    if (isNaN(e.target.value)) return;
    if (e.target.value[e.target.value.length - 1] === ".") return;
    setAdValue(e.target.value); //int number inside
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
          ad_value: adValue,
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
        <label className="labelParamAdd" key={"adValueLable"}>
          <span>כמות מודעות נוכחית ברישום</span>
          <input
            type="text"
            name="adValue"
            value={adValue || ""}
            readOnly={!editableParams}
            onChange={setAdValueHook}
          />
          <button onClick={makeParamEditable}>
            {!editableParams
              ? "הפוך את הפרמטרים לזמינים לעריכה"
              : "סגור אפשרות עריכה"}
          </button>
        </label>
        <button onClick={submitChanges}>העלה שינויים לאתר</button>
        <button onClick={cancel}>בטל</button>
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
