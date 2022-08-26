import React, { useState } from "react";
import "./Styles/AddParameterMaster.css";
import useAuth from "../../../../../Auth/useAuth";
import toast, { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs && https://react-hot-toast.com/
import instance from "../../../../../api/AxiosInstance";
function AddParameterToAds(props) {
  const { auth } = useAuth();
  const [reasonName, setReasonName] = useState(""); //hook for reason name
  const [minValue, setMinValue] = useState(""); //hook fr parameter min value
  const [paramStyle, setParamStyle] = useState("input"); //hook for parameter style
  const [dataType, setDataType] = useState("INT"); //hook for parameter style
  const [category, setCataegory] = useState("מודעה");
  const [numericParameterClass, setNumericParameterClass] =
    useState("not numeric");
  const [isCheckBox, setIsCheckBox] = useState(false); //determine if checkbox
  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    if (e.target.name === "")
      if (e.target.name === "form_price") if (isNaN(e.target.value)) return;
    setStateName(e.target.value);
  };
  const returnStateToDefault = () => {
    setMinValue("");
    setReasonName("");
    setParamStyle("input");
    setCataegory("מודעה");
    setDataType("השכרה");
  };
  const submitReason = async (e) => {
    //add ad to the db, returns true/false
    e.preventDefault();

    if (reasonName.trim() === "") {
      alert("fill the fields");
      return;
    }
    const result = await instance.request({
      data: {
        data_type: "addNewReportReason",
        params: {
          reasonName: reasonName,
          category: category == "מודעה" ? "ad" :category== "בלוג"?"blog":"user",
          guest: auth.accessToken != undefined ? "registered" : "guest",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result);
    console.log(result.data);
    if (result.data == "not authorized" || result.data == false) {
      toast.dismiss(); // remove loading toast
      toast.error("משהו השתבש");
    } else {
      props.refreshTable();
      props.setClassName("notShowSelected");
      props.setTableClassName("showTable");
      toast.dismiss(); // remove loading toast
      toast.success("   פרמטר נוסף");
      returnStateToDefault();
    }
  };
  const closeParam = (e) => {
    e.preventDefault();
    props.setClassName("notShowSelected");
    props.setTableClassName("showTable");
  };
  return (
    <section>
      <button onClick={closeParam}>x</button>
      <form className="formAddParameter">
        <label className="labelParamAdd">
          <span>קטגוריה</span>
          <select
            value={category}
            onChange={(e) => setCataegory(e.target.value)}
          >
            <option>מודעה</option>
            <option>בלוג</option>
            <option>משתמש</option>
          </select>
        </label>
        <label className="labelParamAdd">
          <span>הכנס שם סיבה</span>
          <input
            type="text"
            name="paramName"
            id="paramName"
            required
            value={reasonName}
            onChange={(e) => onChangeState(setReasonName, e)}
          />
        </label>
        <p className="labelParamAdd">
          <button className="button-4" onClick={submitReason}>
            הוספה
          </button>
        </p>
      </form>
      <Toaster />
    </section>
  );
}
AddParameterToAds.defaultProps = {};
export default AddParameterToAds;
