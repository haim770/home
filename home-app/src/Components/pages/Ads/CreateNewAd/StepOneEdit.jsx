import React from "react";
import "./styles.css";

/**
 * First step, check if user go enoght ads to publish.
 * If user got enoght ads to publish, disply rent of buy choose option, otherwise show pack purchase
 * @returns Step one
 */
const StepOneEdit = ({ formData, setFormData }) => {
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="stepOneWrapper">
      <h2>קנייה או השכרה?</h2>
      <div className="stepOne">
        <div>
          <input
            type="radio"
            id="control_01"
            name="assetOption"
            value="buy"
            onChange={handleChange}
            checked={"buy" === formData.assetOption}
          />
          <label htmlFor="control_01">
            <h3>קנייה</h3>
            <p>הגיע הזמן לקנות</p>
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="control_02"
            name="assetOption"
            value="rent"
            onChange={handleChange}
            checked={"rent" === formData.assetOption}
          />
          <label htmlFor="control_02">
            <h3>השכרה</h3>
            <p>צריך לגור היכן שהוא.</p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default StepOneEdit;
