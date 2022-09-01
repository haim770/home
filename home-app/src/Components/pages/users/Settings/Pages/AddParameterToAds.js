import React, { useState } from "react";
import "./Styles/AddParameterMaster.css";
import useAuth from "../../../../../Auth/useAuth";
import toast, { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs && https://react-hot-toast.com/
import instance from "../../../../../api/AxiosInstance";
function AddParameterToAds(props) {
  //add parameter to ad content
  const { auth } = useAuth();
  const [paramName, setParamName] = useState(""); //hook for parameter name
  const [maxValue, setMaxVlue] = useState(""); //hook for parameter max value
  const [minValue, setMinValue] = useState(""); //hook fr parameter min value
  const [paramStyle, setParamStyle] = useState("input"); //hook for parameter style
  const [dataType, setDataType] = useState("INT"); //hook for parameter style
  const [required,setRequired]=useState("רשות");
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
    setRequired("רשות");
  };
  const submitParameter = async (e) => {
    //submit the param
    e.preventDefault();
    if (minValue > maxValue && maxValue != "") {
      alert("min is bigger then max");
      return;
    }
    if (paramStyle === "" || paramName.trim() === "") {
      alert("fill the fields");
      return;
    }
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
          required:required=="רשות"?"0":"1",
          guest: auth.accessToken != undefined ? "registered" : "guest",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result);
    console.log(result.data);
    if (result.data == "not authorized") {
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
          <span>שדה חובה</span>
          <select
            value={required}
            onChange={(e) => {
              //console.log(e.target.value);
              setRequired(e.target.value);
            }}
          >
            <option>חובה</option>
            <option>רשות</option>
          </select>
        </label>
        <label
          style={{ display: paramStyle === "checkBox" ? "none" : "block" }}
          className="labelParamAdd"
        >
          <span>הכנס טיפוס של תכונה</span>
          <select
            value={dataType}
            onChange={(e) => {
              //console.log(e.target.value);
              if (e.target.value === "VARCHAR") {
                setNumericParameterClass("notNumeric");
              } else {
                setNumericParameterClass("numeric");
              }
              setDataType(e.target.value);
              console.log(dataType);
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

        <p className="labelParamAdd">
          <button className="button-4" onClick={submitParameter}>
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
