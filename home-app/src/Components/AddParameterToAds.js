import React, { useState } from "react";
import Button from "./Button";
import Address from "./Address";
import Parameter from "./Parameter";
import "../styles/AddAdForm.css";
import Api from "../api/Api";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/AxiosInstance";
function AddParameterToAds(props) {
  const [paramName, setParamName] = useState(""); //hook for parameter name
  const [maxValue, setMaxVlue] = useState(""); //hook for parameter max value
  const [minValue, setMinValue] = useState(""); //hook for parameter min value
  const [paramStyle, setParamStyle] = useState(""); //hook for parameter style
  const [dataType, setDataType] = useState(""); //hook for parameter style
  const [category, setCataegory] = useState("");

  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    if (e.target.name === "form_price") if (isNaN(e.target.value)) return;
    setStateName(e.target.value);
  };
  const returnStateToDefault = () => {
    setMaxVlue("");
    setMinValue("");
    setParamName("");
    setParamStyle("");
    setDataType("");
  };
  const submitParameter = async (e) => {
    //add ad to the db, returns true/false
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
        <span>enter category</span>
        <select value={category} onChange={(e) => setCataegory(e.target.value)}>
          <option>all</option>
          <option>rent</option>
          <option>buy</option>
        </select>
      </label>
      <label>
        <span>enter name of parameter</span>
        <input
          type="text"
          name="paramName"
          id="paramName"
          required
          value={paramName}
          onChange={(e) => onChangeState(setParamName, e)}
        />
      </label>
      <label>
        <span>enter data type</span>
        <select value={dataType} onChange={(e) => setDataType(e.target.value)}>
          <option>INT</option>
          <option>DOUBLE</option>
          <option>VARCHAR</option>
        </select>
      </label>
      {/* <label {dataType ==="VARCHAR"?style={display:"none"}:style={display:"block"}}> */}
      <label>
        <span>enter parameter maximum</span>
        <input
          type="text"
          name="maxValue"
          id="maxValue"
          required
          value={maxValue}
          onChange={(e) => onChangeState(setMaxVlue, e)}
        />
      </label>
      <label>
        <span>enter minimum value</span>
        <input
          type="text"
          name="minValue"
          id="minValue"
          required
          value={minValue}
          onChange={(e) => onChangeState(setMinValue, e)}
        />
      </label>
      <label>
        <span>enter parameter style</span>
        <select
          value={paramStyle}
          onChange={(e) => setParamStyle(e.target.value)}
        >
          <option>input</option>
          <option>checkBox</option>
        </select>
      </label>

      <p>
        <Button onClick={submitParameter} />
      </p>
    </form>
  );
}
AddParameterToAds.defaultProps = {};
export default AddParameterToAds;
