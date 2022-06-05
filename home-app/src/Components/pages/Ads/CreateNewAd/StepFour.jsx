import React, { useState } from "react";
import "./styles.css";
import { FiUploadCloud } from "react-icons/fi";
/**
 * After user fill the ads contacts, move next to upload pictures and publish the asset
 * @returns
 */
const StepFour = ({
  formData,
  setFormData,
  formDataImage,
  setFormDataImage,
}) => {
  const fileName = `${formData.enCity}_${formData.street_code}_${formData.appartmentNumber}`;
  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setFormDataImage((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const renderPhotos = (source) => {
    console.log("source: ", source);
    return source.map((photo) => {
      return (
          <img src={photo} alt={`${fileName}_${photo}`} key={photo} />
      );
    });
  };

  return (
    <div className="fileUploader">
      <input
        type="file"
        id="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <div className="label-holder">
        <label htmlFor="file" className="label">
          <FiUploadCloud />
        </label>
      </div>
      <div className="result">{renderPhotos(formDataImage)}</div>
    </div>
  );
};

export default StepFour;
