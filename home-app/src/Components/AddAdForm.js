import React, { useState } from "react";
import Button from "./Button";
import Address from "./Address";
import Parameter from "./Parameter";
import "../styles/AddAdForm.css";
import Api from "../api/Api";
import { v4 as uuidv4 } from "uuid";
function AddAdForm(props) {
  const [price, setPrice] = useState(""); //hook for the price state
  const [rooms, setRooms] = useState(2); //hook for the rooms state
  const [building_number, setbuilding_number] = useState(""); //hook for the rooms state
  const [city, setCity] = useState(""); //hook for the rooms state
  const [street, setStreet] = useState(""); //hook for the rooms state
  const [entry, setEntry] = useState("1"); //hook for the entry
  const [apartment, setApartment] = useState(""); //hook for the entry
  const [rentBuy, setRentBuy] = useState("buy"); //hook for the rent/buy

  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    if (e.target.name === "form_price") if (isNaN(e.target.value)) return;
    setStateName(e.target.value);
  };
  // const updateListAtState = (e) => {
  //   //update the list with the new ad
  //   e.preventDefault();
  //   const x = [
  //     ...props.listAds,
  //     [props.legnthOfArr + 1, city, street, numberHome, price, Date.now()],
  //   ];
  //   props.changeListAds(x);
  // };
  const returnStateToDefault = () => {
    setPrice(""); //hook for the price state
    setRooms(2); //hook for the rooms state
    setbuilding_number(""); //hook for the rooms state
    setCity(""); //hook for the rooms state
    setStreet(""); //hook for the rooms state
    setEntry("");
    setApartment("");
  };
  const makeObjOfAllFields = () => {
    //returns the ad from field states and save it amt return as object
    // let obj = [];
    // obj['type']='insertAd';
    // obj['adID'] = uuidv4();
    // obj['price'] = price;
    // obj['city'] = city;
    // obj['street'] = street;
    // obj['rooms'] = rooms;
    // obj['building_number'] = building_number;
    // obj['entry'] = entry;
    // obj['apartment'] = apartment;
    // obj['user_id'] = 1; //temp
    let obj = {
      data: "insertAd",
      adID: uuidv4(),
      price: price,
      city: city,
      street: street,
      rooms: rooms,
      building_number: building_number,
      entry: entry,
      apartment: apartment,
      user_id: 1,
    };
    return obj;
    // let jsonAd={'adID':uuidv4(),'city':city,'street':street,'rooms':rooms,'building_number':building_number,'entry':entry,'apartment':apartment,'user_id':1};
    // return jsonAd;
  };
  const submitAd = (e) => {
    const obj = makeObjOfAllFields();
    // console.log(obj);
    // let response = props.api.sendDataFromJsToPhp("insertAd", obj);
    let response = props.api.sendDataFromJsToPhp(obj);
    console.log(response);
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
        <span>enter entry</span>
        <input
          type="text"
          name="form_entry"
          id="entry"
          required
          value={entry}
          onChange={(e) => onChangeState(setEntry, e)}
        />
      </label>
      <label>
        <span>enter apartment</span>
        <input
          type="text"
          name="form_apartment"
          id="apartment"
          required
          value={apartment}
          onChange={(e) => onChangeState(setApartment, e)}
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
          name="form_city"
          id="city"
          required
          value={city}
          onChange={(e) => onChangeState(setCity, e)}
        />
      </label>
      <label>
        <span>enter number home</span>
        <input
          type="text"
          name="form_building_number"
          id="building_number"
          required
          value={building_number}
          onChange={(e) => onChangeState(setbuilding_number, e)}
        />
      </label>
      <Parameter />
      <button onClick={submitAd}> submit</button>
      <Address street={props.street} city={props.city} number={props.number} />
      <p>
        <Button onClick={submitAd} />
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
  userId: "1",
};
export default AddAdForm;
