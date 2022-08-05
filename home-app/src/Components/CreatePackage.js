import React, { useState } from "react";
import Button from "./Button";
import Address from "./Address";
import Parameter from "./Parameter";
import "../styles/createAd.css";
import Api from "../api/Api";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/AxiosInstance.jsx";
import useAuth from "../Auth/useAuth";
function CreatePackage(props) {
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
    console.log(result.data);
    setStatusOfCreation(result.data);
    returnStateToDefault();
  };
  return (
    <section>
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
          <Button onClick={submitPackage} content="צור חבילה" />
        </p>
      </form>
      {statusOfCreation === true ? (
        <h2>package was created</h2>
      ) : statusOfCreation === false ? (
        <h2>pack wasnt created maybe tiltle exists</h2>
      ) : (
        ""
      )}
    </section>
  );
}
CreatePackage.defaultProps = {};
export default CreatePackage;
