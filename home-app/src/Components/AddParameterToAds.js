import React, { useState } from "react";
import Button from "./Button";
import Address from "./Address";
import Parameter from "./Parameter";
import "../styles/AddParameterMaster.css";
import Api from "../api/Api";
import useAuth from "../Auth/useAuth";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/AxiosInstance";
import { display } from "@mui/system";
function AddParameterToAds(props) {
  const { setAuth } = useAuth();
  const [paramName, setParamName] = useState(""); //hook for parameter name
  const [maxValue, setMaxVlue] = useState(""); //hook for parameter max value
  const [minValue, setMinValue] = useState(""); //hook for parameter min value
  const [paramStyle, setParamStyle] = useState("input"); //hook for parameter style
  const [dataType, setDataType] = useState(""); //hook for parameter style
  const [category, setCataegory] = useState("השכרה");
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
    setMaxVlue("");
    setMinValue("");
    setParamName("");
    setParamStyle("input");
    setDataType("השכרה");
  };
  const submitParameter = async (e) => {
    //add ad to the db, returns true/false
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "addNewMasterToAdContentTable",
        params: {
          paramName: paramName,
          paramStyle: paramStyle,
          minValue: minValue,
          maxValue: maxValue,
          paramType: dataType,
          category: category,
        },
      },
    });
    console.log(result.data);
    returnStateToDefault();
  };
  return (
    <form className={props.className}>
      <label>
        <span>סוג תצוגה של פרמטר</span>
        <select
          value={paramStyle}
          onChange={(e) => setParamStyle(e.target.value)}
        >
          <option>input</option>
          <option>checkBox</option>
        </select>
      </label>
      <label>
        <span>קטגוריה</span>
        <select value={category} onChange={(e) => setCataegory(e.target.value)}>
          <option>השכרה</option>
          <option>קנייה</option>
        </select>
      </label>
      <label>
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
      <label style={{ display: paramStyle === "checkBox" ? "none" : "block" }}>
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
        className={numericParameterClass}
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
        className={numericParameterClass}
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

      <p>
        <Button onClick={submitParameter} content="הוספה" />
      </p>
    </form>
  );
}
AddParameterToAds.defaultProps = {};
export default AddParameterToAds;
