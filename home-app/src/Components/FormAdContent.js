import React, { useState, useEffect } from "react";
import Button from "./Button";
import instance from "../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
function FormAdContent(props) {
  const [masters, setMasters] = useState("");
  const [adUploadStatus, setAdUploadStatus] = useState([]);
  const [inputsAdContent, setInputsAdContent] = useState({});
  const [inputsAd, setInputsAd] = useState({
    user_id: 1,
    city: "",
    street: "",
    adType: "rent",
    rooms: "",
    apartment: "",
    zip_code: "",
    price: "",
    building_number: "",
    entry: "",
  });
  const [images, setImages] = useState("");

  const getMasters = async () => {
    const result = await instance.request({
      data: {
        data_type: "getAllMasters",
      },
    });
    setMasters(result.data);
  };
  useEffect(() => {
    getMasters();
  }, []);
  const handleChangeImages = (event) => {
    setImages(event.target.files[0]);
  };
  const handleChangeAd = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "price" || name === "rooms" || name === "building_number") {
      if (isNaN(value)) return;
    }
    setInputsAd({ ...inputsAd, [name]: value });
  };
  const handleChangeAdContent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputsAdContent({ ...inputsAdContent, [name]: value });
  };
  const checkIfRequiredFieldsFull = () => {
    //check if all required fields has value
    if (
      inputsAd.user_id === "" ||
      inputsAd.price === "" ||
      inputsAd.city === "" ||
      inputsAd.street === ""
    ) {
      setAdUploadStatus(<h2>forgot to fill some required inputs</h2>);
      return false;
    }
    return true;
  };
  const submitAd = async (e) => {
    e.preventDefault();
    if (!checkIfRequiredFieldsFull()) {
      console.log("no input good");
      return;
    }

    const formData = new FormData();
    formData.append("data", "addAdComplete");
    formData.append("ad", JSON.stringify(inputsAd));
    formData.append("adContent", JSON.stringify(inputsAdContent));
    formData.append("images", images);
    let response = "";
    try {
      response = await axios({
        method: "post",
        url: "http://localhost:80/home/home-app/insertNewAdIncludePic.php",
        data: formData,
        headers: { "Content-Type": "multipart/form-data",
         Authorization: `Bearer ${auth.accessToken}`,},
        
      });
    } catch (error) {
      console.log(error);
    }
    if (response.data) {
      setAdUploadStatus(<p>ad was uplaoded</p>);
    }
  };
  const makeFieldsOfAdColumnsWeKnow = (code) => {
    code.push(
      <label>
        <span>עיר</span>
        <input
          type="text"
          name="city"
          id="city"
          required
          value={inputsAd.city}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label>
        <span>רחוב</span>
        <input
          type="text"
          name="street"
          id="street"
          required
          value={inputsAd.street}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label>
        <span>מס בניין </span>
        <input
          type="text"
          name="building_number"
          id="building_number"
          required
          value={inputsAd.building_number}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label>
        <span>כניסה </span>
        <input
          type="text"
          name="entry"
          id="entry"
          required
          value={inputsAd.entry}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label>
        <span>דירה </span>
        <input
          type="text"
          name="apartment"
          id="apartment"
          required
          value={inputsAd.apartment}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label>
        <span>זיפ קוד </span>
        <input
          type="text"
          name="zip_code"
          id="zip_code"
          required
          value={inputsAd.zip_code}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label>
        <span>מחיר </span>
        <input
          type="text"
          name="price"
          id="price"
          required
          value={inputsAd.price}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label>
        <span> חדרים </span>
        <input
          type="text"
          name="rooms"
          id="rooms"
          required
          value={inputsAd.rooms}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label>
        <span>סוג מודעה(קנייה/השכרה) </span>
        <select
          id="adType"
          name="adType"
          value={inputsAd.adType}
          onChange={handleChangeAd}
        >
          <option>rent</option>
          <option>buy</option>
        </select>
      </label>
    );
  };
  const makeFormOfAdContent = () => {
    //form of the adcontent masters we have
    let code = [];
    makeFieldsOfAdColumnsWeKnow(code);
    for (let index = 0; index < masters.length; index++) {
      if (masters[index].display_type === "checkBox") {
        code.push(
          <label key={masters[index].name + masters[index].adID}>
            <span>{masters[index].free_text}</span>
            <input
              type="checkBox"
              name={masters[index].name}
              id={masters[index].name}
              required={masters[index].required}
              value={inputsAdContent.name}
              onChange={handleChangeAdContent}
            />
          </label>
        );
      } else {
        //for text
        code.push(
          <label key={masters[index].name + masters[index].adID}>
            <span>{masters[index].free_text}</span>
            <input
              type="text"
              name={masters[index].name}
              id={masters[index].name}
              required
              value={inputsAdContent.name}
              onChange={handleChangeAdContent}
            />
          </label>
        );
      }
    }
    code.push(
      <label>
        <span>insert pics</span>
        <input type="file" onChange={handleChangeImages} />
      </label>
    );
    return code;
  };

  return (
    <form>
      {masters ? makeFormOfAdContent() : "no masters yet"}
      <Button onClick={submitAd} content="submit ad" />
      {adUploadStatus ? adUploadStatus : ""}
    </form>
  );
}
FormAdContent.defaultProps = {};
export default FormAdContent;
