import React, { useState } from "react";
import Button from "./Button";
import "../styles/searchAds.css";
function SearchAds(props) {
  const [minPrice, setMinPrice] = useState(""); //hook for the price state
  const [maxPrice, setMaxPrice] = useState("100000000"); //hook for the price state
  const [rooms, setRooms] = useState(0); //hook for the rooms state
  const [city, setCity] = useState(""); //hook for the rooms state
  const [street, setStreet] = useState(""); //hook for the rooms state

  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    if (
      e.target.name === "form_min_price" ||
      e.target.name === "form_max_price"
    )
      if (isNaN(e.target.value)) return;
    setStateName(e.target.value);
  };
  const returnStateToDefault = () => {
    setMinPrice("0");
    setMaxPrice("100000000"); //hook for the price state
    setRooms(2); //hook for the rooms state
    setCity(""); //hook for the rooms state
    setStreet(""); //hook for the rooms state
  };
  const makeObjOfAllFields = () => {
    //returns the ad from field states and save it amt return as object
    let obj = {
      data_type: "getAllAdContentAndAdAndUsersForArrOfAds",
      params: {
        // minPrice: minPrice,
        // Maxprice: maxPrice,
        city: city,
        street: street,
        rooms: rooms,
      },
    };
    return obj;
  };
  const searchAdByParams = (e) => {
    //add ad to the db, returns true/false
    e.preventDefault();
    const obj = makeObjOfAllFields();
    //const res = props.api.postToGetData(obj);
    props.setSearchParams(obj);
    returnStateToDefault();
  };
  return (
    <form className={props.className}>
      <label>
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
      <label>
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
      <label>
        <span>enter rooms</span>
        <select value={rooms} onChange={(e) => setRooms(e.target.value)}>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
      </label>
      <label>
        <span>enter street</span>
        <input
          type="text"
          name="form_street"
          id="street"
          required
          value={street}
          onChange={(e) => onChangeState(setStreet, e)}
        />
      </label>
      <label>
        <span>enter city</span>
        <input
          type="text"
          name="form_city"
          id="city"
          required
          value={city}
          onChange={(e) => onChangeState(setCity, e)}
        />
      </label>

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
