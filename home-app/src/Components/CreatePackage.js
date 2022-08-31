import React, { useState } from "react";
import Button from "./Button";
import Address from "./Address";
import Parameter from "./Parameter";
import "../styles/createAd.css";
import Api from "../api/Api";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/AxiosInstance.jsx";
import toast, { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs && https://react-hot-toast.com/
import useAuth from "../Auth/useAuth";
function CreatePackage(props) {
  //comp for create package
  const [price, setPrice] = useState(""); //hook for parameter name
  const [title, setTitle] = useState(""); //hook for parameter max value
  const [content, setContent] = useState(""); //hook for parameter min value
  const [adValue, setAdValue] = useState(""); //hook for parameter style
  const [statusOfCreation, setStatusOfCreation] = useState(""); //the status of created pack
  const { auth } = useAuth();
  const onChangeState = (setStateName, event) => {
    //func that recieves setstate and the event and change value of state to the value of input
    if (event.target.name === "price" || event.target.name === "adValue")
      if (isNaN(event.target.value) || event.target.value === "e") return;
    setStateName(event.target.value);
  };
  const returnStateToDefault = () => {
    //default the fields
    setContent("");
    setTitle("");
    setPrice("");
    setAdValue("");
  };
  const closePack = (e) => {
    //get back to table show
    e.preventDefault();
    props.setClassName("notShowSelected");
    props.setTableClassName("showTable");
  };
  const submitPackage = async (e) => {
    //add pack to the db, returns true/false
    e.preventDefault();
    if (price == "0" || price < 0 || price == 0 || isNaN(price)) {
      alert("מחיר לא יכול להיות 0 ומטה");
      return;
    }
    const result = await instance.request({
      data: {
        data_type: "insertPack",
        params: {
          price: price,
          content: content,
          title: title,
          ad_value: adValue,
          guest: auth.accessToken != undefined ? "registered" : "guest",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    if (result.data) {
      toast.dismiss();
      toast.success("חבילה נוספה בהצלחה");
    } else {
      toast.dismiss(); // remove loading toast
      toast.error("אוי לא, משהו השתבש בדרך   !");
    }
    console.log(result.data);
    setStatusOfCreation(result.data);
    returnStateToDefault();
  };
  return (
    <section>
      <button onClick={closePack}>x</button>
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
        <p>
          <button onClick={submitPackage} className="button-4">
            {props.typeOfForm === "create" ? "צור חבילה" : "ערוך חבילה"}
          </button>
          {/* <Button onClick={submitPackage} content="צור חבילה" /> */}
        </p>
      </form>
    </section>
  );
}
CreatePackage.defaultProps = {
  price: "",
  content: "",
  typeOfForm: "create", //will contain the id for the pack in edit  mode
  adValue: "",
  title: "",
};
export default CreatePackage;
