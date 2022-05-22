import React, { useState } from "react";
import Button from "./Button";
import Address from "./Address";
import Parameter from "./Parameter";
import "../styles/createAd.css";
import Api from "../api/Api";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/AxiosInstance.jsx";
function CreatePackage(props) {
  const [price, setPrice] = useState(""); //hook for parameter name
  const [title, setTitle] = useState(""); //hook for parameter max value
  const [content, setContent] = useState(""); //hook for parameter min value
  const [adValue, setAdValue] = useState(""); //hook for parameter style

  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    if (e.target.name === "price" || e.target.name === "adValue")
      if (isNaN(e.target.value)) return;
    setStateName(e.target.value);
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
        data_type: "addPackage",
        params: {
          price: price,
          content: content,
          title: title,
          ad_value: adValue,
        },
      },
    });
    console.log(result.data);
    returnStateToDefault();
  };
  return (
    <form className={"createPack"}>
      <label>
        <span>enter price for package</span>
        <input
          type="number"
          name="price"
          id="price"
          required
          value={price}
          onChange={(e) => onChangeState(setPrice, e)}
        />
      </label>
      <label>
        <span>enter title of the package</span>
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
        <span>enter ad value of package</span>
        <input
          type="number"
          name="adValue"
          id="adValue"
          required
          value={adValue}
          onChange={(e) => onChangeState(setAdValue, e)}
        />
      </label>
      <label>
        <span>enter content of package</span>
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
        <Button onClick={submitPackage} content="create pack" />
      </p>
    </form>
  );
}
CreatePackage.defaultProps = {};
export default CreatePackage;
