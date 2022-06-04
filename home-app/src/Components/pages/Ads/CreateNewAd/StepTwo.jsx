import React , { useState } from 'react'
import { useEffect } from 'react';
import Select from 'react-select'
import instance from '../../../../api/AxiosInstance';
import useAuth from '../../../../Auth/useAuth';
import AsyncSelect from "react-select/async";

/**
 * After user choose rent or buy, move next to fill the ads detailes
 * @returns 
 */
const StepTwo = ({ formData, setFormData }) => {
  const { auth } = useAuth();
  const [options, setOptions] = useState([{}]);
  //getSelectData
  /**
   * Get Chat from server
   */
  const getCitys = async () => {
    const result = await instance.request({
      data: {
        data_type: "getSelectData",
        params: { selected: "city" },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });

    setOptions(...options, result.data.searchOption);

    //console.log(result.data.searchOption);
  };
  const optionss = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  useEffect(() => {
    getCitys();
    console.log("options", options);
  }, []);
  const handleChange = (event) => {
    console.log(event);
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleChangeCity = (event) => {
    const value = event.value;
    setFormData((values) => ({ ...values, city: value }));
    setSelectedOption(event);
  };

  const [selectedOption, setSelectedOption] = useState(
    { value: formData.city, label: formData.city } || null
  );

  /* 
      <Select
        name="city"
        value={selectedOption}
        onChange={handleChangeCity}
        options={options}
      />
  */
  return (
    <div className="stepTwo">
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedOption} // this won't work
        loadOptions={options}
        onInputChange={this.handleInputChange}
        onChange={handleChangeCity}
      />

      <input
        type="text"
        placeholder="עיר"
        className="rounded-input"
        name="city"
        value={formData.city || ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default StepTwo