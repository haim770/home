import React, { useState } from "react";
import "./Styles/AddParameterMaster.css";
import useAuth from "../../../../../Auth/useAuth";
import instance from "../../../../../api/AxiosInstance";
import toast, { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs && https://react-hot-toast.com/

function EditReportReasons(props) {
  const { auth } = useAuth();
  const [reasonName, setReasonName] = useState(
    props.selectedReason.reason_name
  ); //hook for parameter name
  const [category, setCataegory] = useState(
    props.selectedReason.element_type == "ad" ? "מודעה" : "בלוג"
  );
  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    setStateName(e.target.value);
  };
  const returnStateToDefault = () => {
    setCataegory("מודעה");
    setReasonName("");
  };
  const toggleReportReasons = async (e) => {
    //delete reason
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "toggleReportReasons",
        params: {
          active: props.selectedReason.active,
          reasonId: props.selectedReason.id,
          guest: "registered",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result?.data == true && props.selectedReason.active == 1) {
      toast.dismiss(); // remove loading toast
      toast.error("עריכה נכשלה");
      returnStateToDefault();
      props.setClassName("notShowSelected");
      props.setTableClassName("showTable");
    } else {
      toast.dismiss(); // remove loading toast
      toast.success("  עריכה הצליחה");
      returnStateToDefault();
      props.setClassName("notShowSelected");
      props.setTableClassName("showTable");
      props.refreshTable();
    }
  };
  const editReason = async (e) => {
    //add ad to the db, returns true/false
    e.preventDefault();
    if (reasonName.trim() === "") {
      alert("fill the fields");
      return;
    }
    const result = await instance.request({
      data: {
        data_type: "editReportReason",
        params: {
          reasonId: props.selectedReason.id,
          guest: "registered",
          category: category == "מודעה" ? "ad" : "blog",
          reasonName: reasonName,
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result.data) {
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
          <span>קטגוריה</span>
          <select
            value={category}
            onChange={(e) => setCataegory(e.target.value)}
          >
            <option>מודעה</option>
            <option>בלוג</option>
          </select>
        </label>
        <label className="labelParamAdd">
          <span>הכנס שם סיבה</span>
          <input
            type="text"
            name="reasonName"
            id="reasonName"
            required
            value={reasonName}
            onChange={(e) => onChangeState(setReasonName, e)}
          />
        </label>
        <p className="labelParamAdd">
          <button onClick={editReason}>ערוך סיבה</button>
          <button onClick={toggleReportReasons}>
            {props.selectedReason.active == 1 ? "מחק סיבה" : "שחזר סיבה"}
          </button>
        </p>
      </form>
      <Toaster />
    </section>
  );
}
EditReportReasons.defaultProps = {};
export default EditReportReasons;
