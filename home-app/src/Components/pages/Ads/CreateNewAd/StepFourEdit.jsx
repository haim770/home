import React, { useState, useEffect } from "react";
import "./styles.css";
import instance from "../../../../api/AxiosInstance";
import { FiUploadCloud } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import ImgCaruaselForEditAd from "../../../ImgCaruaselForEditAd";
/**
 * After user fill the ads contacts, move next to upload pictures and publish the asset
 * @returns
 */
const StepFourEdit = ({
  formData,
  setFormData,
  formDataImage,
  setFormDataImage,
  setFormDataImageUpload,
  formDataImageUpload,
  adBlock,
  formDataImageOld,
  setPicsForDelete,
  picsForDelete,
}) => {
  const fileName = uuidv4();
  const [oldPhotoNotDisplay, setOldPhotoNotDisplay] =
    useState("notDisplayPhoto");
  const [oldPhotoDisplay, setOldPhotoDisplay] = useState("displayPhoto");
  const [displayImgCarusell, setDisplayImgCarusell] = useState(true);
  const handleImageChange = (e) => {
    if (e.target.files) {
      setFormDataImageUpload([...formDataImageUpload, e.target.files]);
      //setFormDataImageUpload(e.target.files);
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
    setFormDataImageUpload(
      formDataImage.filter((item) => item !== itemToRemove)
    );
  };
  // useEffect(() => {
  //   if(adBlock.adImages){
  //     console.log("d");
  //     adBlock.adImages.forEach(element => {
  //       setFormDataImage()
  //     });
  //     setFormDataImage()
  //   }
  //   console.log(adBlock);
  // }, []);
  return (
    <div>
      <div>
        <div>
          {formDataImageOld != false && formDataImageOld != [] ? (
            <div style={{ display: displayImgCarusell ? "flex" : "none" }}>
              {console.log("formDataImageOld" + formDataImageOld)}
              <ImgCaruaselForEditAd
                displayImgCarusell={displayImgCarusell}
                setDisplayImgCarusell={setDisplayImgCarusell}
                images={formDataImageOld}
                picsForDelete={picsForDelete}
                setPicsForDelete={setPicsForDelete}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
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
                  <button
                    className="top-right"
                    id={photo}
                    onClick={deleteImage}
                  >
                    X
                  </button>
                  <img src={photo} alt={`${fileName}_${photo}`} key={photo} />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepFourEdit;
