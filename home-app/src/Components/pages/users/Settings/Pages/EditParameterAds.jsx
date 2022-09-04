import React, { useState } from "react";
import "./Styles/AddParameterMaster.css";
import useAuth from "../../../../../Auth/useAuth";
import instance from "../../../../../api/AxiosInstance";
import toast, { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs && https://react-hot-toast.com/

function EditParameterAds(props) {
  //edit ad content param
  const { auth } = useAuth();
  const [paramName, setParamName] = useState(props.paramName); //hook for parameter name
  const [maxValue, setMaxVlue] = useState(
    props.max_value ? props.max_value : ""
  ); //hook for parameter max value
  const [minValue, setMinValue] = useState(
    props.min_value ? props.min_value : ""
  ); //hook fr parameter min value
  console.log(props);
  const [paramStyle, setParamStyle] = useState(props.paramStyle); //hook for parameter style
  const [dataType, setDataType] = useState(
    props.max_value || props.min_value ? "מספר" : "טקסט"
  ); //hook for parameter style
  const [category, setCataegory] = useState(props.category);
  const [required, setRequired] = useState(
    props.required == "1" ? "חובה" : "רשות"
  );
  console.log(dataType + "    data");
  const [numericParameterClass, setNumericParameterClass] = useState(
    dataType == "מספר" ? "numeric" : "not numeric"
  );
  const [isCheckBox, setIsCheckBox] = useState(false); //determine if checkbox
  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    if (e.target.name === "minValue" || e.target.name === "maxValue") {
      if (isNaN(e.target.value)) return;
      if (
        (e.target.name === "minValue" &&
          minValue[0] == "0" &&
          e.target.value.length > 0) ||
        (e.target.name === "maxValue" &&
          maxValue[0] == "0" &&
          e.target.value.length > 0)
      ) {
        return;
      }
    }
    setStateName(e.target.value);
  };
  const returnStateToDefault = () => {
    setMaxVlue("");
    setMinValue("");
    setParamName("");
    setParamStyle("input");
    setDataType("מספר");
    setRequired("רשות");
  };
  const deleteParameter = async (e) => {
    //delete param
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "deleteParameter",
        params: {
          element_id: props.id,
          guest: "registered",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result.data === "delete was done") {
      toast.dismiss(); // remove loading toast
      toast.success("  מחיקה הצליחה");
      returnStateToDefault();
      props.setClassName("notShowSelected");
      props.setTableClassName("showTable");
      props.refreshTable();
    } else {
      toast.dismiss(); // remove loading toast
      toast.error("מחיקה נכשלה");
    }
  };
  const submitParameter = async (e) => {
    //edit param in db
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
        data_type: "editParameterAds",
        params: {
          element_id: props.id,
          guest: "registered",
          paramName: paramName,
          paramStyle: paramStyle,
          minValue: dataType == "טקסט" ? "" : minValue,
          maxValue: dataType == "טקסט" ? "" : maxValue,
          paramType: dataType,
          category: category,
          required: required == "רשות" ? "0" : "1",
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
      <button className="button-4" onClick={closeParam}>
        x
      </button>
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
              console.log(e.target.value);
              if (e.target.value === "טקסט") {
                setNumericParameterClass("notNumeric");
              } else {
                setNumericParameterClass("numeric");
              }
              setDataType(e.target.value);
            }}
          >
            <option>מספר</option>
            <option>טקסט</option>
          </select>
        </label>
        <label
          style={{
            display:
              paramStyle === "checkBox" || dataType == "טקסט" ? "none" : "",
          }}
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
          style={{
            display:
              paramStyle === "checkBox" || dataType == "טקסט" ? "none" : "",
          }}
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
            ערוך פרמטר
          </button>
          <button className="button-4" onClick={deleteParameter}>
            מחק פרמטר
          </button>
        </p>
      </form>
      <Toaster />
    </section>
  );
}
EditParameterAds.defaultProps = {
  paramName: "",
  min_value: "",
  max_הalue: "",
  paramStyle: "input",
  category: "השכרה",
};
export default EditParameterAds;
