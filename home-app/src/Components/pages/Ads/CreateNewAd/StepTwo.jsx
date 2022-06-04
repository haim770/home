import React , { useState } from 'react'
import Select from 'react-select'
/**
 * After user choose rent or buy, move next to fill the ads detailes
 * @returns 
 */
const StepTwo = ({ formData, setFormData }) => {
  const handleChange = (event) => {
    console.log(event);
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleChangeCity = (event) => {
      const value = event.value;
      setFormData((values) => ({ ...values, "city": value }));
      setSelectedOption(event);
    };
  const [selectedOption, setSelectedOption] = useState({value: formData.city, label: formData.city} || null);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className="stepTwo">
      <Select
        name="city"
        value={selectedOption}
        onChange={handleChangeCity}
        options={options}
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