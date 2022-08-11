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
  const [inputsAdContentBuy, setInputsAdContentBuy] = useState({});
  const [inputAdConentRent, setInputAdConentRent] = useState({});
  const [mastersName, setMastersName] = useState([]);
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
    minArea: "",
    maxArea: "",
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
    console.log(result.data.searchOption);
    if (searchMethod === "city") setOptions(result.data.searchOption);
    else setStreetOptions(result.data.searchOption);
  };
  const handleChangeCity = (event) => {
    const value = event.label;
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
    if (name === "adType") {
      setAdContentClass("notVisible");
      setNotDisplayBuy("notDisplayBuy");
      setNotDisplayRent("notDisplayRent");
    }
    if (
      name === "price" ||
      name === "minRooms" ||
      name === "maxRooms" ||
      name === "building_number" ||
      name === "maxArea" ||
      name === "minArea"
    ) {
      if (isNaN(value)) return;
    }
    setInputsAd({ ...inputsAd, [name]: value });
  };
  const handleChangeAdContentBuyCheckBox = (event) => {
    const name = event.target.name;
    setInputsAdContentBuy({
      ...inputsAdContentBuy,
      [name]: event.target.checked,
    });
  };
  const handleChangeAdContentBuy = (e) => {
    let num = e.target.value.replace(/\D/g, "");
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.min || e.target.max) {
      if (isNaN(e.target.value) === true) {
        //value is not a number
        setInputsAdContentBuy({ ...inputsAdContentBuy, [name]: num });
        document.getElementById(e.target.name).value = num;
        return;
      } else {
        if (e.target.max) {
          if (parseInt(e.target.value) > parseInt(e.target.max)) {
            //we are passing the max value
            setInputsAdContentBuy({
              ...inputsAdContentBuy,
              [name]: e.target.max,
            });
            document.getElementById(e.target.name).value = e.target.max; //we put max value inside if user inserted bigger
            alert("מקסימום לשדה " + e.target.name + " הוא " + e.target.max);

            return;
          } else {
            setInputsAdContentBuy({
              ...inputsAdContentBuy,
              [name]: e.target.value,
            });
            return;
          }
        } else {
          setInputsAdContentBuy({
            ...inputsAdContentBuy,
            [name]: e.target.value,
          });
        }
      }
    } else {
      //not having min/max
      setInputsAdContentBuy({ ...inputsAdContentBuy, [name]: e.target.value });
    }
  };
  const handleChangeAdContentRentCheckBox = (event) => {
    const name = event.target.name;
    setInputAdConentRent({
      ...inputAdConentRent,
      [name]: event.target.checked,
    });
  };
  const handleOnFocusLost = (e, typeOfParam) => {
    //func gets rent/buy and the event and check if smaller then min
    if (e.target.min) {
      if (parseInt(e.target.value) < e.target.min) {
        console.log(
          "ערך מינימום לשדה " + e.target.name + " הוא " + e.target.min
        );
        if (typeOfParam === "rent")
          setInputAdConentRent({ ...inputAdConentRent, [e.target.name]: "" });
        else {
          setInputsAdContentBuy({ ...inputsAdContentBuy, [e.target.name]: "" });
        }
      }
    }
  };
  const handleChangeAdRentContent = (e) => {
    let num = e.target.value.replace(/\D/g, "");
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.min || e.target.max) {
      if (isNaN(e.target.value) === true) {
        //value is not a number
        setInputAdConentRent({ ...inputAdConentRent, [name]: num });
        document.getElementById(e.target.name).value = num;
        return;
      } else {
        if (e.target.max) {
          if (parseInt(e.target.value) > parseInt(e.target.max)) {
            //we are passing the max value
            setInputAdConentRent({
              ...inputAdConentRent,
              [name]: e.target.max,
            });
            document.getElementById(e.target.name).value = e.target.max; //we put max value inside if user inserted bigger
            console.log(
              "מקסימום לשדה " + e.target.name + " הוא " + e.target.max
            );
            return;
          } else {
            setInputAdConentRent({
              ...inputAdConentRent,
              [name]: e.target.value,
            });
            return;
          }
        } else {
          setInputAdConentRent({
            ...inputAdConentRent,
            [name]: e.target.value,
          });
        }
      }
    } else {
      //not having min/max
      setInputAdConentRent({ ...inputAdConentRent, [name]: e.target.value });
    }
  };
  const getMasters = async () => {
    const result = await instance.request({
      data: {
        data_type: "getAllMasters",
      },
    });
    setMasters(result.data);
  };
  useLayoutEffect(() => {
    getMasters();
    if (masters !== "") {
      for (let index = 0; index < masters.length; index++) {
        if (masters[index].category === "השכרה") {
          setInputAdConentRent({
            ...inputAdConentRent,
            [masters[index].name]: "",
          });
        } else {
          setInputsAdContentBuy({
            ...inputsAdContentBuy,
            [masters[index].name]: "",
          });
        }
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
      <label key="minArea">
        <span> מינימום שטח בית</span>
        <input
          type="text"
          name="minArea"
          id="minArea"
          value={inputsAd.minArea}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label key="maxArea">
        <span> מינימום שטח בית</span>
        <input
          type="text"
          name="maxArea"
          id="maxArea"
          value={inputsAd.maxArea}
          onChange={handleChangeAd}
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
      mastersName.push(masters[index].name);

      if (
        masters[index].min_value !== null ||
        masters[index].max_value !== null
      ) {
        if (
          masters[index].min_value !== null &&
          masters[index].max_value !== null
        ) {
          if (masters[index].category === "השכרה") {
            code.push(
              <label key={masters[index].element_id} className={notdisplayRent}>
                <span>{masters[index].name}</span>
                <input
                  type="text"
                  name={masters[index].name}
                  min={masters[index].min_value}
                  max={masters[index].max_value}
                  id={masters[index].name}
                  required={masters[index].required}
                  value={inputAdConentRent[masters[index].name]}
                  onBlur={(e) => handleOnFocusLost(e, "rent")}
                  onChange={handleChangeAdRentContent}
                />
              </label>
            );
          } else {
            code.push(
              <label key={masters[index].element_id} className={notdisplayBuy}>
                <span>{masters[index].name}</span>
                <input
                  type="text"
                  name={masters[index].name}
                  id={masters[index].name}
                  min={masters[index].min_value}
                  max={masters[index].max_value}
                  required={masters[index].required}
                  value={inputsAdContentBuy[masters[index].name]}
                  onBlur={(e) => handleOnFocusLost(e, "buy")}
                  onChange={handleChangeAdContentBuy}
                />
              </label>
            );
          }
        } else {
          if (masters[index].min_value !== null) {
            if (masters[index].category === "השכרה") {
              code.push(
                <label
                  key={masters[index].element_id}
                  className={notdisplayRent}
                >
                  <span>{masters[index].name}</span>
                  <input
                    type="text"
                    name={masters[index].name}
                    min={masters[index].min_value}
                    id={masters[index].name}
                    required={masters[index].required}
                    value={inputAdConentRent[masters[index].name]}
                    onBlur={(e) => handleOnFocusLost(e, "rent")}
                    onChange={handleChangeAdRentContent}
                  />
                </label>
              );
            } else {
              code.push(
                <label
                  key={masters[index].element_id}
                  className={notdisplayBuy}
                >
                  <span>{masters[index].name}</span>
                  <input
                    type="text"
                    name={masters[index].name}
                    id={masters[index].name}
                    min={masters[index].min_value}
                    required={masters[index].required}
                    value={inputsAdContentBuy[masters[index].name]}
                    onBlur={(e) => handleOnFocusLost(e, "buy")}
                    onChange={handleChangeAdContentBuy}
                  />
                </label>
              );
            }
          } else {
            if (masters[index].category === "השכרה") {
              code.push(
                <label
                  key={masters[index].element_id}
                  className={notdisplayRent}
                >
                  <span>{masters[index].name}</span>
                  <input
                    type="text"
                    name={masters[index].name}
                    max={masters[index].max_value}
                    id={masters[index].name}
                    required={masters[index].required}
                    value={inputAdConentRent[masters[index].name]}
                    onBlur={(e) => handleOnFocusLost(e, "rent")}
                    onChange={handleChangeAdRentContent}
                  />
                </label>
              );
            } else {
              code.push(
                <label
                  key={masters[index].element_id}
                  className={notdisplayBuy}
                >
                  <span>{masters[index].name}</span>
                  <input
                    type="text"
                    name={masters[index].name}
                    id={masters[index].name}
                    max={masters[index].max_value}
                    required={masters[index].required}
                    value={inputsAdContentBuy[masters[index].name]}
                    onBlur={(e) => handleOnFocusLost(e, "buy")}
                    onChange={handleChangeAdContentBuy}
                  />
                </label>
              );
            }
          }
        }
      } else {
        if (masters[index].display_type === "checkBox") {
          if (masters[index].category === "השכרה") {
            code.push(
              <label key={masters[index].element_id} className={notdisplayRent}>
                <span>{masters[index].name}</span>
                <input
                  type="checkBox"
                  name={masters[index].name}
                  id={masters[index].name}
                  required={masters[index].required}
                  value={inputAdConentRent.name}
                  onChange={handleChangeAdContentRentCheckBox}
                  // checked={inputsAdContent.name?false:true}
                />
              </label>
            );
          } else {
            code.push(
              <label key={masters[index].element_id} className={notdisplayBuy}>
                <span>{masters[index].name}</span>
                <input
                  type="checkBox"
                  name={masters[index].name}
                  id={masters[index].name}
                  required={masters[index].required}
                  value={inputsAdContentBuy.name}
                  onChange={handleChangeAdContentBuyCheckBox}
                />
              </label>
            );
          }
        } else {
          //for text
          if (masters[index].category === "השכרה") {
            code.push(
              <label key={masters[index].element_id} className={notdisplayRent}>
                <span>{masters[index].name}</span>
                <input
                  type="text"
                  name={masters[index].name}
                  id={masters[index].name}
                  value={inputAdConentRent.name}
                  onChange={handleChangeAdRentContent}
                />
              </label>
            );
          } else {
            code.push(
              <label key={masters[index].element_id} className={notdisplayBuy}>
                <span>{masters[index].free_text}</span>
                <input
                  type="text"
                  name={masters[index].name}
                  id={masters[index].name}
                  value={inputsAdContentBuy.name}
                  onChange={handleChangeAdContentBuy}
                />
              </label>
            );
          }
        }
      }
    }
    return code;
  };
  const makeSearchFromScratch = () => {
    // returnStateToDefault();
    // setInputAdConentRent({});
    // setInputsAdContentBuy({});
  };
  const returnStateToDefault = () => {
    setInputsAd({
      user_id: "",
      city: "",
      area: "",
      street: "",
      adType: "השכרה",
      maxRooms: "",
      minRooms: "",
      apartment: "",
      zip_code: "",
      price: "",
      building_number: "",
      entry: "",
      minArea: "",
      maxArea: "",
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
    if (inputsAd.adType === "השכרה") {
      for (const [key, value] of Object.entries(inputAdConentRent)) {
        obj[key] = value;
      }
    } else {
      for (const [key, value] of Object.entries(inputsAdContentBuy)) {
        obj[key] = value;
      }
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
          name="form_min_price"
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
          name="form_max_price"
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
        <button onClick={makeSearchFromScratch}>אפס חיפוש</button>
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
