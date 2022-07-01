import React, { useState, useEffect, useLayoutEffect } from "react";
import Button from "./Button";
import "../styles/searchAds.css";
import instance from "../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";

function SearchAds(props) {
  const [adContentClass, setAdContentClass] = useState("notVisible");
  const [minPrice, setMinPrice] = useState(""); //hook for the price state
  const [maxPrice, setMaxPrice] = useState(""); //hook for the price state
  const [masters, setMasters] = useState("");
  const [inputsAdContent, setInputsAdContent] = useState({});
  const [notdisplayRent, setNotDisplayRent] = useState("notDisplayRent");
  const [notdisplayBuy, setNotDisplayBuy] = useState("notDisplayBuy");
  const [inputsAd, setInputsAd] = useState({
    user_id: "",
    city: "",
    street: "",
    adType: "השכרה",
    maxRooms: "",
    minRooms: "",
    apartment: "",
    zip_code: "",
    price: "",
    building_number: "",
    entry: "",
  });

  //////////////////////////////////////////

  //

  /**
   * useState for city option
   */
  const [options, setOptions] = useState([{}]);
  const [selectedOption, setSelectedOption] = useState(
    { value: inputsAd.city, label: inputsAd.city } || null
  );

  /**
   * useState for street option
   */
  const [streetOptions, setStreetOptions] = useState([{}]);
  const [streetSelectedOption, setStreetSelectedOption] = useState(
    { value: inputsAd.street, label: inputsAd.street } || null
  );
  /**
   * search method, city or street
   */
  const [searchMethod, setSearchMethod] = useState("city");
  const showExtraParams = (e) => {
    e.preventDefault();
    if (adContentClass === "notVisible") {
      setAdContentClass("paramVisible");
      if (inputsAd.adType === "השכרה") {
        setNotDisplayRent("displayRent");
      } else {
        setNotDisplayBuy("displayBuy");
      }
    } else {
      setAdContentClass("notVisible");
      setNotDisplayBuy("notDisplayBuy");
      setNotDisplayRent("notDisplayRent");
    }
  };
  useLayoutEffect(() => {
    if (selectedOption === null) {
      setSearchMethod("city");
    } else {
      setStreetSelectedOption(null);
      setSearchMethod("street");
    }
    getSearchOprions();
  }, [selectedOption]);

  const getSearchOprions = async () => {
    const result = await instance.request({
      data: {
        data_type: "getSelectData",
        params: {
          selected: searchMethod,
          cityName: inputsAd.city || "",
        },
      },
    });
    console.log(result.data);
    if (searchMethod === "city") setOptions(result.data.searchOption);
    else setStreetOptions(result.data.searchOption);
  };
  const handleChangeCity = (event) => {
    const value = event.label;
    const enCity = event.value;
    setInputsAd((values) => ({ ...values, city: value }));
    setSelectedOption(event);
  };
  const handleChangeStreet = (event) => {
    const value = event.label;
    setInputsAd((values) => ({ ...values, street: value }));
    setStreetSelectedOption(event);
  };
  const handleChangeAd = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "price" || name === "rooms" || name === "building_number") {
      if (isNaN(value)) return;
    }
    setInputsAd({ ...inputsAd, [name]: value });
  };
  const handleChangeAdContentCheckBox = (event) => {
    const name = event.target.name;
    setInputsAdContent({ ...inputsAdContent, [name]: event.target.checked });
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
      <label key="adType">
        <span>סוג מודעה</span>
        <select
          id="adType"
          name="adType"
          value={inputsAd.adType}
          onChange={handleChangeAd}
        >
          <option>השכרה</option>
          <option>קנייה</option>
        </select>
      </label>
    );
    code.push(
      <label key="city">
        <span>עיר</span>
        <Select
          className="selectStyle"
          name="city"
          value={selectedOption}
          onChange={handleChangeCity}
          options={options}
          autoFocus={true}
          aria-label="שם עיר"
          captureMenuScroll={true} // When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent
        />
      </label>
    );
    code.push(
      <label key="street">
        <span>רחוב</span>
        <Select
          className="selectStyle"
          name="street"
          value={streetSelectedOption}
          onChange={handleChangeStreet}
          options={streetOptions}
          aria-label="שם רחוב"
          captureMenuScroll={true} // When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent
        />
      </label>
    );
    code.push(
      <label key="minRooms">
        <span> מינימום חדרים </span>
        <input
          type="text"
          name="minRooms"
          id="minRooms"
          required
          value={inputsAd.minRooms}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label key="maxRooms">
        <span> חדרים מקסימום</span>
        <input
          type="text"
          name="maxRooms"
          id="maxRooms"
          required
          value={inputsAd.maxRooms}
          onChange={handleChangeAd}
        />
      </label>
    );
  };
  const makeFormOfAdContent = () => {
    //form of the adcontent masters we have
    let code = [];
    makeFieldsOfAdColumnsWeKnow(code);
    for (let index = 0; index < masters.length; index++) {
      if (masters[index].display_type === "checkBox") {
        if (masters[index].category === "השכרה") {
          code.push(
            <label
              key={masters[index].name + masters[index].adID}
              className={notdisplayRent}
            >
              <span>{masters[index].free_text}</span>
              <input
                type="checkBox"
                name={masters[index].name}
                id={masters[index].name}
                required={masters[index].required}
                value={inputsAdContent.name}
                onChange={handleChangeAdContentCheckBox}
                // checked={inputsAdContent.name?false:true}
              />
            </label>
          );
        } else {
          code.push(
            <label
              key={masters[index].name + masters[index].adID}
              className={notdisplayBuy}
            >
              <span>{masters[index].free_text}</span>
              <input
                type="checkBox"
                name={masters[index].name}
                id={masters[index].name}
                required={masters[index].required}
                value={inputsAdContent.name}
                onChange={handleChangeAdContentCheckBox}
                // checked={inputsAdContent.name?false:true}
              />
            </label>
          );
        }
      } else {
        //for text
        if (masters[index].category === "השכרה") {
          code.push(
            <label
              key={masters[index].name + masters[index].adID}
              className={notdisplayRent}
            >
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
        } else {
          code.push(
            <label
              key={masters[index].name + masters[index].adID}
              className={notdisplayBuy}
            >
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
    }
    return code;
  };
  const returnStateToDefault = () => {
    setInputsAd({
      user_id: "",
      city: "",
      street: "",
      adType: "השכרה",
      maxRooms: "",
      minRooms: "",
      apartment: "",
      zip_code: "",
      price: "",
      building_number: "",
      entry: "",
    });
    setMinPrice("");
    setMaxPrice(""); //hook for the price state
  };
  const makeObjOfAllFields = () => {
    //returns the ad from field states and save it amt return as object

    let obj = {};
    for (const [key, value] of Object.entries(inputsAd)) {
      obj[key] = value;
    }
    for (const [key, value] of Object.entries(inputsAdContent)) {
      obj[key] = value;
    }
    obj["minPrice"] = minPrice;
    obj["maxPrice"] = maxPrice;
    obj = {
      data_type: "getAllAdContentAndAdAndUsersForArrOfAds",
      params: obj,
    };
    return obj;
  };
  const searchAdByParams = (e) => {
    //add ad to the db, returns true/false
    e.preventDefault();
    props.setListShow("showList");
    props.setFullShow("notShowFull");
    props.setindexStart(0);
    props.setindexEnd(10);
    const obj = makeObjOfAllFields();
    props.setSearchParams(obj);
  };
  return (
    <form className={props.className}>
      <label key="minPrice">
        <span>מחיר מינימום</span>
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
        <span>מחיר מקסימום</span>
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
      <button className="moreParams" onClick={showExtraParams}>
        {adContentClass === "notVisible"
          ? "הראה פרמטרים נוספים"
          : "הסתר פרמטרים נוספים"}
      </button>
      <p>
        <button onClick={searchAdByParams}>חפש</button>
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
