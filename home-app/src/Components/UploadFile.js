import { React, useState, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import instance from "../api/AxiosInstance";
import "../styles/Package1.css";
import axios from "axios";
const UploadFile = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = async () => {
    //console.log(selectedFile);
    let dataForm = new FormData();
    dataForm.append("potato", selectedFile[0]);

    axios({
      method: "post",
      url: "http://localhost:80/home/home-app/apiFile.php",
      data: dataForm,
      headers: { encType: "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        //console.log(response.data);
      })
      .catch(function (response) {
        //handle error
        //console.log(response);
      });
  };
  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      {isFilePicked ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <button onClick={handleSubmission} className="button-4">
        Submit
      </button>
    </div>
  );
};

export default UploadFile;
