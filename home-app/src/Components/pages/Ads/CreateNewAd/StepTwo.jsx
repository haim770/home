import React from 'react'
import Select from 'react-select'
/**
 * After user choose rent or buy, move next to fill the ads detailes
 * @returns 
 */
const StepTwo = ({ formData, setFormData }) => {
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

  return (
    <div className="stepTwo">
      <Select options={options} onChange={handleChange} />
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