import React, { useState } from "react";
import Button from "./Button";
import Address from "./Address";
import Parameter from "./Parameter";
import "../styles/createAd.css";
import Api from "../api/Api";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/AxiosInstance.jsx";
import useAuth from "../Auth/useAuth";
import toast, { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs && https://react-hot-toast.com/
function EditPackage(props) {
  const [price, setPrice] = useState(props.price); //hook for parameter name
  const [title, setTitle] = useState(props.title); //hook for parameter max value
  const [content, setContent] = useState(props.content); //hook for parameter min value
  const [adValue, setAdValue] = useState(props.adValue); //hook for parameter style
  const [statusOfCreation, setStatusOfCreation] = useState(""); //the status of created pack
  const [is_active, setIs_active] = useState(props.is_active);
  const [id, setId] = useState(props.id);
  const { auth } = useAuth();
  const onChangeState = (setStateName, event) => {
    //func that recieves setstate and the event and change value of state to the value of input
    if (event.target.name === "price" || event.target.name === "adValue")
      if (isNaN(event.target.value) || event.target.value === "e") return;
    setStateName(event.target.value);
  };
  const returnStateToDefault = () => {
    setContent("");
    setTitle("");
    setPrice("");
    setAdValue("");
  };

  const submitPackage = async (e) => {
    //add ad to the db, returns true/false
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "editPack",
        params: {
          price: price,
          content: content,
          title: title,
          ad_value: adValue,
          id: id,
          is_active: is_active === "כן" ? "1" : "0",
          guest: auth.accessToken != undefined ? "registered" : "guest",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result.data) {
      toast.dismiss();
      toast.success("עריכה בוצעה בהצלחה");
    } else {
      toast.dismiss(); // remove loading toast
      toast.error("אוי לא, משהו השתבש בדרך   !");
    }
    setStatusOfCreation(result.data);
    returnStateToDefault();
  };
  const closePack = (e) => {
    e.preventDefault();
    props.setClassName("notShowSelected");
    props.setTableClassName("showTable");
  };
  return (
    <section className={props.className}>
      <button style={{ maxWidth: "5rem" }} onClick={closePack}>
        x
      </button>
      <form className={"createPack"}>
        <label>
          <span>מחיר חבילה</span>
          <input
            type="text"
            pattern="[0-9]"
            name="price"
            id="price"
            required
            value={price}
            onChange={(e) => onChangeState(setPrice, e)}
          />
        </label>
        <label>
          <span>כותרת חבילה</span>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={(e) => onChangeState(setTitle, e)}
          />
        </label>
        <label>
          <span>מספר מודעות בחבילה</span>
          <input
            type="text"
            pattern="[0-9]"
            name="adValue"
            id="adValue"
            required
            value={adValue}
            onChange={(e) => onChangeState(setAdValue, e)}
          />
        </label>
        <label>
          <span>תיאור חבילה</span>
          <textarea
            rows="4"
            cols="50"
            value={content}
            onChange={(e) => onChangeState(setContent, e)}
            name="content"
          >
            Enter text here...
          </textarea>
        </label>
        <label>
          <span>חבילה פעילה?</span>
          <select
            value={is_active}
            onChange={(e) => {
              setIs_active(e.target.value);
            }}
          >
            <option></option>
            <option>כן</option>
            <option>לא</option>
          </select>
        </label>
        <p>
          <button onClick={submitPackage}>
            {props.typeOfForm === "create" ? "צור חבילה" : "ערוך חבילה"}
          </button>
        </p>
      </form>
      <Toaster />
    </section>
  );
}
EditPackage.defaultProps = {
  price: "",
  content: "",
  typeOfForm: "edit", //will contain the id for the pack in edit  mode
  adValue: "",
  title: "",
  is_active: "yes",
};
export default EditPackage;
