import React, { useState } from "react";
import "./styles.css";
import { FiUploadCloud } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
/**
 * After user fill the ads contacts, move next to upload pictures and publish the asset
 * @returns
 */
const StepFour = ({
  formData,
  setFormData,
  formDataImage,
  setFormDataImage,
  setFormDataImageUpload,
  formDataImageUpload,
}) => {
  const fileName = uuidv4();
  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    console.log(Array.from(e.target.files), "file");
    if (e.target.files) {
      setFormDataImageUpload(e.target.files);
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormDataImage((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const deleteImage = (e) => {
    const itemToRemove = e.target.getAttribute("id");
    setFormDataImage(formDataImage.filter((item) => item !== itemToRemove));
  };
  return (
    <div className="fileUploader">
      <input
        type="file"
        id="file"
        name="files"
        accept="image/*"
        multiple={true}
        onChange={handleImageChange}
      />
      <div className="label-holder">
        <label htmlFor="file" className="label">
          <FiUploadCloud />
        </label>
      </div>
      <div className="result">
        {formDataImage.map((photo) => {
          return (
            <>
              <div className="imageContainer">
                <button className="top-right" id={photo} onClick={deleteImage}>
                  X
                </button>
                <img src={photo} alt={`${fileName}_${photo}`} key={photo} />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default StepFour;
