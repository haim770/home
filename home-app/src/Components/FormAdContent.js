import React, { useState, useEffect } from "react";
import Button from "./Button";
import instance from "../api/AxiosInstance";
function FormAdContent(props) {
  const [masters, setMasters] = useState("");
  const [inputsAdContent, setInputsAdContent] = useState({});
  const [inputsAd, setInputsAd] = useState({ user_id: 1 });

  const getMasters = async () => {
    const result = await instance.request({
      data: {
        data_type: "getAllMasters",
      },
    });
    setMasters(result.data);
    console.log(result.data);
  };
  useEffect(() => {
    getMasters();
  }, []);
  const handleChangeAd = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputsAd((values) => ({ ...values, [name]: value }));
  };
  const handleChangeAdContent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputsAdContent((values) => ({ ...values, [name]: value }));
  };
  const submitAd = async (e) => {
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "insertNewAd",
        params: { ad: inputsAd, adContent: inputsAdContent },
      },
    });
    console.log(result.data);
  };
  const makeFieldsOfAdColumnsWeKnow = (code) => {
    code.push(
      <label>
        <span>enter city</span>
        <input
          type="text"
          name="city"
          id="city"
          required
          value={inputsAd.name}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label>
        <span>enter street</span>
        <input
          type="text"
          name="street"
          id="street"
          required
          value={inputsAd.name}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label>
        <span>enter building_number </span>
        <input
          type="text"
          name="building_number"
          id="building_number"
          required
          value={inputsAd.name}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label>
        <span>enter entry </span>
        <input
          type="text"
          name="entry"
          id="entry"
          required
          value={inputsAd.name}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label>
        <span>enter apartment </span>
        <input
          type="text"
          name="apartment"
          id="apartment"
          required
          value={inputsAd.name}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label>
        <span>enter zip code </span>
        <input
          type="text"
          name="zip_code"
          id="zip_code"
          required
          value={inputsAd.name}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label>
        <span>enter price </span>
        <input
          type="text"
          name="price"
          id="price"
          required
          value={inputsAd.name}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label>
        <span>enter rooms </span>
        <input
          type="text"
          name="rooms"
          id="rooms"
          required
          value={inputsAd.name}
          onChange={handleChangeAd}
        />
      </label>
    );
    code.push(
      <label>
        <span>enter adType </span>
        <select name="adType" value={inputsAd.name} id={"adType"}onChange={handleChangeAd}>
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
    console.log(masters.length);
    for (let index = 0; index < masters.length; index++) {
      if (masters[index].display_type === "checkBox") {
        code.push(
          <label key={masters[index].name + masters[index].adID}>
            <span>enter {masters[index].name}</span>
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
            <span>enter {masters[index].name}</span>
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

  return (
    <form>
      {masters ? makeFormOfAdContent() : "no masters yet"}
      <Button onClick={submitAd} content="submit ad" />
    </form>
  );
}
FormAdContent.defaultProps = {
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
export default FormAdContent;
