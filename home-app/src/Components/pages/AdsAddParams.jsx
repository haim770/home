import React from 'react'
import { useState } from "react";
import "../../styles/Main.css";
import TestAxios from './TestAxios';
import { AxiosInstance } from 'axios';
import instance from './AxiosInstance';
function AdsAddParams() {
   const [inputs, setInputs] = useState({});
   const [returnInput, setReturnInput] = useState(0);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "SetNewParams",
        params: inputs,
      },
    });
        console.log(result);
    //<TestAxios data_type="SetNewParams" params={inputs} />;
  };

  return (
    // element_Id,ad_Id=0,category_name,master_id=1,min_value_id,
    // max_value_id,icon_id,free_text_id,required_id,name_id
    <div>
      {returnInput}
      <form onSubmit={handleSubmit} className="formStyle">
        <label>
          category_name:
          <input
            type="text"
            name="category_name"
            value={inputs.category_name || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          min_value_id:
          <input
            type="number"
            name="min_value_id"
            value={inputs.min_value_id || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          max_value_id:
          <input
            type="number"
            name="max_value_id"
            value={inputs.max_value_id || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          icon_id:
          <input
            type="text"
            name="icon_id"
            value={inputs.icon_id || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          free_text_id:
          <input
            type="text"
            name="free_text_id"
            value={inputs.free_text_id || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          required_id:
          <input
            type="checkbox"
            name="required_id"
            value={inputs.required_id || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          name_id:
          <input
            type="text"
            name="name_id"
            value={inputs.name_id || ""}
            onChange={handleChange}
          />
        </label>

        <input type="submit" />
      </form>
    </div>
  );
}

export default AdsAddParams