import React, { useState } from "react";
import Button from "./Button";
import Address from "./Address";
import Parameter from "./Parameter";
import "./AddAdForm.css";
import "./Ad.css";
function AddAdForm(props) {
  const [price, setPrice] = useState(""); //hook for the price state
  const [rooms, setRooms] = useState(2); //hook for the rooms state
  const [numberHome, setnumberHome] = useState(""); //hook for the rooms state
  const [city, setCity] = useState(""); //hook for the rooms state
  const [street, setStreet] = useState(""); //hook for the rooms state

  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    if (e.target.name === "form_price") if (isNaN(e.target.value)) return;
    setStateName(e.target.value);
  };
  const updateListAtState = (e) => {
    //update the list with the new ad
    e.preventDefault();
    const x = [
      ...props.listAds,
      [props.legnthOfArr + 1, city, street, numberHome, price, Date.now()],
    ];
    props.changeListAds(x);
  };
  const returnStateToDefault = () => {
    setPrice(""); //hook for the price state
    setRooms(2); //hook for the rooms state
    setnumberHome(""); //hook for the rooms state
    setCity(""); //hook for the rooms state
    setStreet(""); //hook for the rooms state
  };
  const submitAd = (e) => {
    updateListAtState(e);
    returnStateToDefault();
  };
  return (
    <form className={props.className}>
      <label>
        <span>enter price</span>
        <input
          type="text"
          name="form_price"
          id="price"
          required
          value={price}
          onChange={(e) => onChangeState(setPrice, e)}
        />
      </label>
      <label>
        <span>enter rooms</span>
        <select value={rooms} onChange={(e) => setRooms(e.target.value)}>
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
          name="form_street"
          id="street"
          required
          value={city}
          onChange={(e) => onChangeState(setCity, e)}
        />
      </label>
      <label>
        <span>enter number home</span>
        <input
          type="text"
          name="form_street"
          id="street"
          required
          value={numberHome}
          onChange={(e) => onChangeState(setnumberHome, e)}
        />
      </label>
      <Parameter />
      <Address street={props.street} city={props.city} number={props.number} />
      <p>
        <Button
          onClick={submitAd}
          listAds={props.listAds}
          setListAds={props.setListAds}
          changeListAds={props.changeListAds}
        />
      </p>
    </form>
  );
}
AddAdForm.defaultProps = {
  sellerName: "seller",
  price: "0",
  createTime: "00/00/00",
  adLink: "null",
  city: "haif",
  street: "ha",
  number: "45",
  rooms: "3",
};
export default AddAdForm;
