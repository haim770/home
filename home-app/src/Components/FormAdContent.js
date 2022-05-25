import React, { useState, useEffect } from "react";
import Button from "./Button";
import instance from "../api/AxiosInstance";
function FormAdContent(props) {
  const [masters, setMasters] = useState("");
  const [mastersComp, setMastersComp] = useState({});
  const [inputs, setInputs] = useState({});
  const getMasters = async () => {
    const result = await instance.request({
      data: {
        data_type: "getAllMasters",
      },
    });
    console.log(result.data);
    setMasters(result.data);
  };
  useEffect(() => {
    getMasters();
    let x = {};
  }, []);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const submitAd = async (e) => {
    console.log(inputs);
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "insertNewAd",
        params: inputs,
      },
    });
    console.log(result);
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
          value={inputs.name}
          onChange={(e) => handleChange}
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
          value={inputs.name}
          onChange={(e) => handleChange}
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
          value={inputs.name}
          onChange={(e) => handleChange}
        />
      </label>
    );
    code.push(
      <label>
        <span>enter entry </span>
        <input
          type="text"
          name="	entry"
          id="entry"
          required
          value={inputs.name}
          onChange={(e) => handleChange}
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
          value={inputs.name}
          onChange={(e) => handleChange}
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
          value={inputs.name}
          onChange={(e) => handleChange}
        />
      </label>
    );
    code.push(
      <label>
        <span>enter price </span>
        <input
          type="text"
          name="	price"
          id="	price"
          required
          value={inputs.name}
          onChange={(e) => handleChange}
        />
      </label>
    );
    code.push(
      <label>
        <span>enter rooms </span>
        <input
          type="text"
          name="	rooms"
          id="	rooms"
          required
          value={inputs.name}
          onChange={(e) => handleChange}
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
          value={inputs.name}
          onChange={(e) => handleChange}
        />
      </label>
    );
    code.push(
      <label>
        <span>enter adType </span>
        <select
          name="adType"
          value={inputs.name}
          onChange={(e) => handleChange}
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
            <span>enter {masters[index].name}</span>
            <input
              type="checkBox"
              name={masters[index].name}
              id={masters[index].name}
              required={masters[index].required}
              value={inputs.name}
              onChange={handleChange}
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
              value={inputs.name}
              onChange={handleChange}
            />
          </label>
        );
      }
    }
    return code;
  };

  return (
    <form>
      {masters ? console.log(masters[0].adID) : "k"}
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
