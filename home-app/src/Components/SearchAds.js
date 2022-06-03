import React, { useState, useEffect } from "react";
import Button from "./Button";
import "../styles/searchAds.css";
import instance from "../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";
function SearchAds(props) {
  const [minPrice, setMinPrice] = useState(""); //hook for the price state
  const [maxPrice, setMaxPrice] = useState("100000000"); //hook for the price state
  const [masters, setMasters] = useState("");
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
    if (masters !== "") {
      for (let index = 0; index < masters.length; index++) {
        setInputsAdContent({
          ...inputsAdContent,
          [masters[index].name]: false,
        });
        setInputsAdContent({
          ...inputsAdContent,
          [masters[index].name]: "",
        });
      }
    }
  }, []);
  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    if (
      e.target.name === "form_min_price" ||
      e.target.name === "form_max_price"
    )
      if (isNaN(e.target.value)) return;
    setStateName(e.target.value);
  };
  const makeFieldsOfAdColumnsWeKnow = (code) => {
    code.push(
      <label key="city">
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
      <label key="street">
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
      <label key="numBuilding">
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
      <label key="entry">
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
      <label key="apartment">
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
      <label key="zip_code">
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
      <label key="rooms">
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
      <label key="adType">
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
    return code;
  };
  const returnStateToDefault = () => {
    setInputsAd({
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
    setMinPrice("0");
    setMaxPrice("100000000"); //hook for the price state
  };
  const makeObjOfAllFields = () => {
    //returns the ad from field states and save it amt return as object
    let obj = {
      data_type: "getAllAdContentAndAdAndUsersForArrOfAds",
      params: {
        adInput: inputsAd,
        inputsAdContent: inputsAdContent,
        minPrice: minPrice,
        maxPrice: maxPrice,
      },
    };
    return obj;
  };
  const searchAdByParams = (e) => {
    //add ad to the db, returns true/false
    e.preventDefault();
    const obj = makeObjOfAllFields();
    props.setSearchParams(obj);
    returnStateToDefault();
  };
  return (
    <form className={props.className}>
      <label key="minPrice">
        <span>enter min price</span>
        <input
          type="text"
          name="form_max_price"
          id="price"
          required
          value={minPrice}
          onChange={(e) => onChangeState(setMinPrice, e)}
        />
      </label>
      <label key="maxPrice">
        <span>enter max price</span>
        <input
          type="text"
          name="form_min_price"
          id="price"
          required
          value={maxPrice}
          onChange={(e) => onChangeState(setMaxPrice, e)}
        />
      </label>
      {masters ? makeFormOfAdContent() : ""}
      <p>
        <Button onClick={searchAdByParams} />
      </p>
    </form>
  );
}
SearchAds.defaultProps = {
  sellerName: "",
  price: "",
  createTime: "",
  adLink: "",
  city: "",
  street: "",
  number: "",
  rooms: "",
  userId: "",
};
export default SearchAds;
