import React, { useState } from "react";
import "./Styles/AddParameterMaster.css";
import useAuth from "../../../../../Auth/useAuth";
import instance from "../../../../../api/AxiosInstance";
import toast, { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs && https://react-hot-toast.com/

function EditParameterAds(props) {
  const { auth } = useAuth();
  const [paramName, setParamName] = useState(props.paramName); //hook for parameter name
  const [maxValue, setMaxVlue] = useState(
    props.max_value ? props.max_value : ""
  ); //hook for parameter max value
  const [minValue, setMinValue] = useState(
    props.min_value ? props.min_value : ""
  ); //hook fr parameter min value
  const [paramStyle, setParamStyle] = useState(props.paramStyle); //hook for parameter style
  const [dataType, setDataType] = useState(
    props.max_value || props.min_value ? "INT" : "VARCHAR"
  ); //hook for parameter style
  const [category, setCataegory] = useState(props.category);
  const [numericParameterClass, setNumericParameterClass] = useState(
    dataType === "INT" ? "numeric" : "not numeric"
  );
  const [isCheckBox, setIsCheckBox] = useState(false); //determine if checkbox
  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    if (e.target.name === "")
      if (e.target.name === "form_price") if (isNaN(e.target.value)) return;
    setStateName(e.target.value);
  };
  const returnStateToDefault = () => {
    setMaxVlue("");
    setMinValue("");
    setParamName("");
    setParamStyle("input");
    setDataType("השכרה");
  };
  const submitParameter = async (e) => {
    //add ad to the db, returns true/false
    e.preventDefault();
    if (minValue > maxValue) {
      alert("min is bigger then max");
      return;
    }
    if (paramStyle === "" || paramName.trim() === "") {
      alert("fill the fields");
      return;
    }
    const result = await instance.request({
      data: {
        data_type: "editParameterAds",
        params: {
          element_id: props.id,
          guest: "registered",
          paramName: paramName,
          paramStyle: paramStyle,
          minValue: minValue,
          maxValue: maxValue,
          paramType: dataType,
          category: category,
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result.data === "edit was done") {
      toast.dismiss(); // remove loading toast
      toast.success("  עריכה הצליחה");
      returnStateToDefault();
      props.setClassName("notShowSelected");
      props.setTableClassName("showTable");
      props.refreshTable();
    } else {
      toast.dismiss(); // remove loading toast
      toast.error("עריכה נכשלה");
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
          <span>סוג תצוגה של פרמטר</span>
          <select
            value={paramStyle}
            onChange={(e) => setParamStyle(e.target.value)}
          >
            <option>input</option>
            <option>checkBox</option>
          </select>
        </label>
        <label className="labelParamAdd">
          <span>קטגוריה</span>
          <select
            value={category}
            onChange={(e) => setCataegory(e.target.value)}
          >
            <option>השכרה</option>
            <option>קנייה</option>
          </select>
        </label>
        <label className="labelParamAdd">
          <span>הכנס שם פרמטר</span>
          <input
            type="text"
            name="paramName"
            id="paramName"
            required
            value={paramName}
            onChange={(e) => onChangeState(setParamName, e)}
          />
        </label>
        <label
          style={{ display: paramStyle === "checkBox" ? "none" : "block" }}
          className="labelParamAdd"
        >
          <span>הכנס טיפוס של תכונה</span>
          <select
            value={dataType}
            onChange={(e) => {
              console.log(e.target.value);
              if (e.target.value === "VARCHAR") {
                setNumericParameterClass("notNumeric");
              } else {
                setNumericParameterClass("numeric");
              }
              setDataType(e.target.value);
            }}
          >
            <option>INT</option>
            <option>DOUBLE</option>
            <option>VARCHAR</option>
          </select>
        </label>
        <label
          style={{ display: paramStyle === "checkBox" ? "none" : "" }}
          className={numericParameterClass + " labelParamAdd"}
        >
          <span>הכנס ערך מקסימום</span>
          <input
            type="text"
            name="maxValue"
            id="maxValue"
            required
            value={maxValue}
            onChange={(e) => onChangeState(setMaxVlue, e)}
          />
        </label>
        <label
          style={{ display: paramStyle === "checkBox" ? "none" : "" }}
          className={numericParameterClass + " labelParamAdd"}
        >
          <span>הכנס ערך מינימום</span>
          <input
            type="text"
            name="minValue"
            id="minValue"
            required
            value={minValue}
            onChange={(e) => onChangeState(setMinValue, e)}
          />
        </label>

        <p className="labelParamAdd">
          <button onClick={submitParameter}>ערוך פרמטר</button>
        </p>
      </form>
      <Toaster />
    </section>
  );
}
EditParameterAds.defaultProps = {
  paramName: "",
  min_value: "",
  maxValue: "",
  paramStyle: "input",
  category: "השכרה",
  dataType: "VARCHAR",
};
export default EditParameterAds;
