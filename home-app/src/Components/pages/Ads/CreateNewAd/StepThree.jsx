import React from 'react'

/**
 * After user fill the ads data, move next to fill the ads contacts detailes
 * @returns 
 */
const StepThree = ({ formData, setFormData }) => {

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setFormData((values) => ({ ...values, [name]: value }));
    };
  return (
    <input
      type="text"
      placeholder="עיר"
      className="rounded-input"
      name="city"
      value={formData.city || ""}
      onChange={handleChange}
    />
  );
};

export default StepThree